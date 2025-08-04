# Tab to Newsletter Chrome Extension

## Description

Tired of having dozens of tabs open? This Chrome extension transforms your browsing session into a concise and organized newsletter. It leverages the power of the Gemini API's **URL Context** feature to intelligently summarize the content of all your open tabs into a readable newsletter format with just one click.

## Features

*   **One-Click Tab Summarization:** Generate a newsletter from all your open tabs instantly.
*   **AI-Powered Summaries:** Utilizes the Gemini API to extract and summarize content from web pages.
*   **Intelligent Content Aggregation:** The `url_context` tool allows the Gemini API to fetch and process content directly from URLs.
*   **Customizable Newsletter Format:** Receive summaries in a clean, newsletter-style output.
*   **Secure API Key Handling:** Your Gemini API key is stored securely using Chrome's storage API, accessible via an options page.

## Getting Started

### Prerequisites

*   **Google Chrome:** The extension is designed for Google Chrome.
*   **Gemini API Key:** You'll need an API key from Google AI Studio. You can get one here: [Google AI Studio API Keys](https://aistudio.google.com/app/apikey)

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone <your-github-repo-url>
    cd tab-to-newsletter-extension
    ```

2.  **Load the Extension in Chrome:**
    *   Open Google Chrome and navigate to `chrome://extensions`.
    *   Enable **Developer mode** by toggling the switch in the top-right corner.
    *   Click the **"Load unpacked"** button.
    *   Select the directory where you cloned the extension's files (the folder containing `manifest.json`).

3.  **Set Your Gemini API Key:**
    *   After loading, you should see the "Tab to Newsletter" extension icon in your Chrome toolbar.
    *   Right-click the extension icon and select **"Options"**.
    *   Alternatively, go to `chrome://extensions`, find the extension, click **"Details"**, then **"Extension options"**.
    *   Paste your Gemini API key into the provided input field and click **"Save Key"**.

### Usage

1.  Open the tabs you want to include in your newsletter.
2.  Click the "Tab to Newsletter" extension icon in your Chrome toolbar.
3.  Click the **"Generate Newsletter"** button in the popup.
4.  The extension will fetch the content from your open tabs, send it to the Gemini API for summarization, and display the resulting newsletter in the popup.

## Project Structure

```
tab-newsletter-extension/
├── manifest.json         # Defines the extension's metadata, permissions, and entry points.
├── background.js         # Handles API calls, tab querying, and message listening.
├── popup.html            # The UI that appears when the extension icon is clicked.
├── popup.js              # JavaScript for the popup UI, handles button clicks and displaying results.
├── options.html          # UI for the extension's options page (for API key input).
├── options.js            # JavaScript for the options page, handles saving/loading API keys.
├── style.css             # Styles for the popup and options pages.
└── images/
    └── icon128.png       # The extension's icon.
```

## Development Notes

*   **API Key Security:** The Gemini API key is stored locally using `chrome.storage.local` for security. It is crucial **not** to hardcode API keys directly into the source code.
*   **Gemini API Model:** This extension uses the `gemini-1.5-flash` model, which supports the `url_context` tool. Ensure your API key is provisioned for models that support this feature.
*   **Error Handling:** Basic error handling is included to inform the user if the API key is missing or if there are issues with the API call.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue if you find a bug or have a feature request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details. (You'll want to create a `LICENSE.md` file with the MIT license text.)
