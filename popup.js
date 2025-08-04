document.addEventListener('DOMContentLoaded', function() {
  const generateBtn = document.getElementById('generate-btn');
  const newsletterContent = document.getElementById('newsletter-content');

  generateBtn.addEventListener('click', function() {
    newsletterContent.innerHTML = '<p>Getting tabs and preparing request...</p>';
    
    // Send message to the background script to start the process
    chrome.runtime.sendMessage({ action: "generateNewsletter" }, function(response) {
      if (chrome.runtime.lastError) {
        // Handle potential errors like the service worker being inactive
        newsletterContent.innerHTML = `<p>An error occurred: ${chrome.runtime.lastError.message}</p>`;
        return;
      }
      
      if (response) {
        if (response.error) {
          // Display specific errors from the background script
          newsletterContent.innerHTML = `<p style="color: red;">Error: ${response.error}</p>`;
          // If the error is about the API key, provide a link to the options page.
          if (response.error.includes("API key")) {
            const optionsUrl = chrome.runtime.getURL('options.html');
            newsletterContent.innerHTML += `<p>Please <a href="${optionsUrl}" target="_blank">set your key in the options</a>.</p>`;
          }
        } else if (response.newsletter) {
          // The Gemini API often returns Markdown. This helps render it.
          // For a production app, you would use a library like `marked.js` to safely convert Markdown to HTML.
          // For now, we'll just display the text.
          newsletterContent.innerText = response.newsletter; 
        }
      } else {
        newsletterContent.innerHTML = '<p>Failed to get a response. Please try again.</p>';
      }
    });
  });
});