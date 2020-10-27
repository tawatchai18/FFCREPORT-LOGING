import React from 'react'
import { Helmet } from 'react-helmet'
import ForgotPassword from 'components/system/Auth/ForgotPassword'

class EditeUpdateMarker extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="edite/update marker" />
        <ForgotPassword />
      </div>
    )
  }
}

export default EditeUpdateMarker
