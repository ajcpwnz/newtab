import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setBG} from 'store/settings'
import AttachmentLayer from 'components/AttachmentLayer/AttachmentLayer'
import Settings from 'components/Settings/Settings'

import './App.scss'

class App extends Component {
  render() {
    return (
      <div className="App" style={{ backgroundColor: this.props.mainBG }}>
        <div className="inner">
          <Settings />
          <AttachmentLayer />
        </div>
      </div>
    )
  }
}

const _store = ({ settings: { mainBG } }) => ({ mainBG })
export default connect(_store, { setBG })(App)
