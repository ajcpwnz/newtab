/* eslint-disable */
chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.create({ url: 'chrome://newtab' })
})
