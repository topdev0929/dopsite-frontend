import React from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import jwt from 'jwt-decode'

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  isAdminProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      const user = localStorage.getItem('access_token') && jwt(localStorage.getItem('access_token'))

      if (isAuthProtected && !localStorage.getItem("access_token")) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
      // // pass only site super admin
      if (isAdminProtected && user.role_id !== 1) {
        return (
          <Redirect
            to={{ pathname: "/dashboard", state: { from: props.location } }}
          />
        )
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      )
    }}
  />
)

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Authmiddleware;
