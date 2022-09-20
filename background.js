// background.js

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("counter", ({ counter }) => {
    console.log("old counter:", counter);
    typeof counter == "number" && counter >= 0
      ? chrome.storage.sync.set({ counter: counter })
      : chrome.storage.sync.set({ counter: 0 });
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log(changeInfo, tab);

  if (changeInfo.status == "complete" && tab.active) {
    chrome.storage.sync.get("counter", ({ counter }) => {
      typeof counter == "number" && counter >= 0
        ? chrome.storage.sync.set({ counter: counter + 1 })
        : chrome.storage.sync.set({ counter: 0 });

      chrome.action.setBadgeText({ text: `${counter + 1}` });
      console.log(`# Global counter: ${counter + 1}`);
    });
  }
});
