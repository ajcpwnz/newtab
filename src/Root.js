import React from 'react'
import { store } from 'store/index'
import { Provider } from 'react-redux'
import App from 'components/App'
import Persistor from 'components/Persistor/Persistor'

const Root = () => (
  <Provider store={store}>
    <Persistor persist={['attachments']}>
      <App />
    </Persistor>
  </Provider >
)
export default Root

