document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.getElementById('save');
  const apiKeyInput = document.getElementById('apiKey');
  const statusDiv = document.getElementById('status');

  // Load any saved API key when the options page opens
  chrome.storage.local.get(['geminiApiKey'], (result) => {
    if (result.geminiApiKey) {
      apiKeyInput.value = result.geminiApiKey;
    }
  });

  saveButton.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    if (apiKey) {
      chrome.storage.local.set({ geminiApiKey: apiKey }, () => {
        statusDiv.textContent = 'API Key saved!';
        setTimeout(() => { statusDiv.textContent = ''; }, 2000);
      });
    } else {
      statusDiv.textContent = 'Please enter a valid API key.';
    }
  });
});