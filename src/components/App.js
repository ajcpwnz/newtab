import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setBG } from 'store/settings'
import AttachmentLayer from 'components/AttachmentLayer/AttachmentLayer'
import Settings from 'components/Settings/Settings'
import axios from 'axios'
import Terminal from 'components/Terminal/Terminal'
window.axios = axios
import './App.scss'

class App extends Component {
  render() {
    return (
      <div className="App" style={{ backgroundColor: this.props.mainBG }}>
        <Terminal />
        <div className="inner">
          <Settings />
          <AttachmentLayer />
        </div>
      </div>
    )
  }
}

const _store = ({ settings: { mainBG } }) => ({ mainBG })
export default connect(
  _store,
  { setBG }
)(App)
