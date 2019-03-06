/* global chrome */

const syncChromeStorage = (key) => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, (result) => resolve(result))
  })
}


export default {
  state: {},
  setValue(key, value) {
    this.state[key] = value
    // running in browser
    if (chrome && chrome.storage) {
      chrome.storage.sync.set({ [key]: value })
    } else {
      localStorage.setItem(key, value)
    }
  },
  async getValue(key) {
    if (chrome && chrome.storage) {
      const result = await syncChromeStorage(key)
      return result[key] || this.state[key]
    } else {
      return localStorage.getItem(key) || this.state[key]
    }
  }
}
