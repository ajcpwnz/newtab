/* eslint-disable */
chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.create({ url: 'chrome://newtab' })
})

const enterPip = () => {
  if (document.pictureInPictureEnabled) {
    chrome.tabs.executeScript({ file: 'script.js', allFrames: true });
  }
}

const commands = {
  enter_pip: enterPip
}

const handlers = {
  PIP_CONTROL: enterPip
}

chrome.contextMenus.create({
  id: 'PIP_CONTROL',
  title: "Picture in picture 🎾",
  contexts: ['page']
});

chrome.commands.onCommand.addListener((c) => {
  // enterPip()
});

chrome.contextMenus.onClicked.addListener(({ menuItemId }) => {
  const handler = handlers[menuItemId]
  if (handler) handler()
});