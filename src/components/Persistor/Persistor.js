import React, { Component } from 'react' // eslint-disable-line
import storage from 'utils/storage'
import { restoreStore } from 'store/__shared'
import { connect } from 'react-redux'

class Persistor extends Component {
  componentDidMount() {
    const { persist } = this.props
    persist.map(async key => {
      const data = await storage.getValue(`serialized__${key}`)
      if (data) {
        const parsedData = JSON.parse(data)
        this.props.restoreStore(key, parsedData)
      }
    })
  }

  render() {
    return this.props.children
  }
}

export default connect(null, { restoreStore })(Persistor)
