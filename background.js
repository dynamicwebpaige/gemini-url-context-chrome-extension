chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "generateNewsletter") {
    // Use an async function to handle promises cleanly
    const generate = async () => {
      try {
        // 1. Get the API Key from storage
        const data = await chrome.storage.local.get(['geminiApiKey']);
        const apiKey = data.geminiApiKey;

        if (!apiKey) {
          sendResponse({ error: "Gemini API key is not set." });
          return;
        }

        // 2. Get all open tabs
        const tabs = await chrome.tabs.query({});
        const urls = tabs
          .map(tab => tab.url)
          .filter(url => url && (url.startsWith('http://') || url.startsWith('https://')));

        if (urls.length === 0) {
          sendResponse({ error: "No valid tabs found to summarize." });
          return;
        }

        // 3. Construct the CORRECT API request with the correct model name
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

        // --- REVISED PROMPT ---
        // Explicitly tell the model to fetch content from the URLs and then summarize.
        const promptText = `Please fetch the content from the following URLs and then create a concise, engaging newsletter summarizing the key information. Group similar items and give the newsletter a catchy title.

Provided URLs:
${urls.join('\n')}

Please ensure you use the provided URLs to gather the information for the newsletter.`;
        // --- END REVISED PROMPT ---

        const requestBody = {
          "contents": [{
            "parts": [{
              "text": promptText
            }]
          }],
          "tools": [{
            "url_context": {}
          }]
        };

        // 4. Make the API call
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          const errorBody = await response.json();
          const errorMessage = errorBody.error?.message || 'An unknown API error occurred.';
          throw new Error(`API Error: ${errorMessage}`);
        }
        
        const responseData = await response.json();
        
        // 5. Send the result back to the popup
        if (responseData.candidates && responseData.candidates[0] && responseData.candidates[0].content && responseData.candidates[0].content.parts[0]) {
            const newsletter = responseData.candidates[0].content.parts[0].text;
            sendResponse({ newsletter: newsletter });
        } else {
            const finishReason = responseData.candidates?.[0]?.finishReason;
            if (finishReason) {
              throw new Error(`API call finished without content. Reason: ${finishReason}`);
            } else {
              throw new Error("Invalid response structure from API.");
            }
        }

      } catch (error) {
        console.error('Extension Error:', error);
        sendResponse({ error: error.message });
      }
    };

    generate();
    return true; // Required for async sendResponse
  }
});