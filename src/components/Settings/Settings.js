import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import storage from 'utils/storage'
import { setBG } from 'store/settings'
import { ChromePicker } from 'react-color'
import interact from 'components/interact.svg'
import enhanceWithClickOutside from 'react-click-outside'

import './Settings.scss'

class Settings extends Component {
  state = { show: false }

  async componentDidMount() {
    const bg = await storage.getValue('bg')
    this.props.setBG(bg)
  }

  setColor = ({ hex: newColor }) => {
    this.props.setBG(newColor)
    storage.setValue('bg', newColor)
  }

  handleClickOutside() {
    this.setState({ show: false })
  }

  render() {
    const { show } = this.state
    const { mainBG } = this.props
    return (
      <div className="settings">
        <span
          className="interact"
          onClick={() => this.setState({ show: !show })}
        >
          <img src={interact} alt="Icon - interact" />
        </span>
        <div className={cx('bar', { _show: show })}>
          <div className="inner">
            <div className="colorPicker">
              <ChromePicker
                color={mainBG}
                type="color"
                onChangeComplete={this.setColor}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const _store = ({ settings: { mainBG } }) => ({ mainBG })
export default connect(
  _store,
  { setBG }
)(enhanceWithClickOutside(Settings))
