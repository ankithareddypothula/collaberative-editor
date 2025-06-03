let currentTab = null;
let startTime = Date.now();

chrome.tabs.onActivated.addListener(activeInfo => {
    updateTime();
    chrome.tabs.get(activeInfo.tabId, tab => {
        currentTab = tab;
        startTime = Date.now();
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.status === "complete") {
        updateTime();
        currentTab = tab;
        startTime = Date.now();
    }
});

function updateTime() {
    if (!currentTab || !currentTab.url || currentTab.url.startsWith('chrome')) return;
    const url = new URL(currentTab.url);
    const domain = url.hostname;
    const timeSpent = (Date.now() - startTime) / 1000;

    chrome.storage.local.get([domain], result => {
        const previous = result[domain] || 0;
        chrome.storage.local.set({ [domain]: previous + timeSpent });
    });
}