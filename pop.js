document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = new URL(tabs[0].url);
    const domain = url.hostname;

    chrome.storage.local.get([domain], (result) => {
      const timeSpent = result[domain] || 0;
      document.getElementById('output').textContent =
       ' Time spent on ${domain}: ${Math.round(timeSpent / 1000)} seconds';
    });
  });
});