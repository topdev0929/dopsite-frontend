import React, { useState } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap"
import { useSelector } from "react-redux"
import { withTranslation } from "react-i18next"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

const ProfileMenu = props => {
  const [menu, setMenu] = useState(false)
  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user,
  }))
  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item d-flex justify-content-center align-items-center"
          id="page-header-user-dropdown"
          tag="button"
        >
          <div className='d-xl-inline-block d-flex justify-content-end'>
            <span className="d-none d-xl-inline-block ms-2 me-1"><b>{currentUser?.firstname} {currentUser?.lastname}</b></span><br />
            <span className="d-none d-xl-inline-block ms-2 me-1">{currentUser?.email}</span>
          </div>
          {currentUser?.logo ? (
            <img
              className="rounded-circle header-profile-user"
              src={`https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${currentUser.logo}`}
              alt="Header Avatar"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <span
              className="rounded-circle header-profile-user"
              style={{ background: 'rgb(192, 51, 4)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', textTransform: 'uppercase' }}
            >
              {currentUser?.firstname[0]}{currentUser?.lastname[0]}
            </span>
          )}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <Link to="/setting" className="dropdown-item">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}{" "}
          </Link>
          <Link to="/" className="dropdown-item">
            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
            {props.t("Lock screen")}
          </Link>
          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
