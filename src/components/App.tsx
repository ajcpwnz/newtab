import React from 'react'
import { connect } from 'react-redux'
import { setBG } from 'store/settings'
import AttachmentLayer from 'components/AttachmentLayer/AttachmentLayer'
import Settings from 'components/Settings/Settings'
import Terminal from 'components/Terminal/Terminal'
import { AppState } from 'store/index'

const App = ({ mainBG }: { mainBG: string }) => {
  return (
    <div className="App" style={{ backgroundColor: mainBG }}>
      <Terminal/>
      <div className="inner">
        <AttachmentLayer/>
        <Settings/>
      </div>
    </div>
  )
}

const _store = ({ settings: { mainBG } }: AppState) => ({ mainBG })
export default connect(
  _store,
  { setBG }
)(App)
