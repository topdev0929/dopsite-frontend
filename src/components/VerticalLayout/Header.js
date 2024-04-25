import PropTypes from 'prop-types'
import React, { useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

//import drawer
import ReactDrawer from 'react-drawer';
import 'react-drawer/lib/react-drawer.css';

//Import Icons
import FeatherIcon from "feather-icons-react";

// Reactstrap
// import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"

// Import menuDropdown
// import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown"
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown"
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"
import RightSidebar from "../CommonForBoth/RightSidebar"
import LightDark from "../CommonForBoth/Menus/LightDark";

// import images
import logoSvg from "../../assets/images/logo-sm.png"
import logoFullSvg from "../../assets/images/logo-sm-full.png"
// import github from "../../assets/images/brands/github.png"
// import bitbucket from "../../assets/images/brands/bitbucket.png"
// import dribbble from "../../assets/images/brands/dribbble.png"
// import dropbox from "../../assets/images/brands/dropbox.png"
// import mail_chimp from "../../assets/images/brands/mail_chimp.png"
// import slack from "../../assets/images/brands/slack.png"

//i18n
import { withTranslation } from "react-i18next"

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
  changelayoutMode
} from "../../store/actions"

const Header = props => {
  const { onChangeLayoutMode } = props;
  // const [search, setsearch] = useState(false)
  // const [socialDrp, setsocialDrp] = useState(false)
  const [isClick, setClick] = useState(true);
  const [position, setPosition] = useState();
  const [open, setOpen] = useState(false);
  /**
   * Rightsidebar drawer
   */
  const toggleTopDrawer = () => {
    setPosition('right');
    setOpen(!open)
  }

  const onDrawerClose = () => {
    setOpen(false);
  }

  /*** Sidebar menu icon and default menu set */
  function tToggle() {
    var body = document.body;
    setClick(!isClick);
    if (isClick === true) {
      body.classList.add("sidebar-enable");
      document.body.setAttribute('data-sidebar-size', 'sm');
    } else {
      body.classList.remove("sidebar-enable");
      document.body.setAttribute('data-sidebar-size', 'lg');
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/dashboard" className="logo logo-dark">
                <span className="logo-sm">
                  <img height='24' src={logoSvg} alt="" />
                </span>
                <span className="logo-lg">
                  <img style={{ width: 140, height: 'auto' }} src={logoFullSvg} alt="" height="24" />
                </span>
              </Link>

              <Link to="/dashboard" className="logo logo-light">
                <span className="logo-sm">
                  <img height='24' src={logoSvg} alt="" />
                </span>
                <span className="logo-lg">
                  <img style={{ width: 140, height: 'auto' }} src={logoFullSvg} alt="" height="24" />
                </span>
              </Link>
            </div>

            <button
              onClick={() => {
                tToggle()
              }}
              type="button" className="btn btn-sm px-3 font-size-16 header-item" id="vertical-menu-btn">
              <i className="fa fa-fw fa-bars"></i>
            </button>

            {/* <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input type="text" className="form-control" placeholder="Search..." />
                <button className="btn btn-primary" type="button"><i className="bx bx-search-alt align-middle"></i></button>
              </div>
            </form> */}
            {/* <form className="app-search d-none d-lg-block" style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginTop: 5 }}>
              <div className="position-relative">Dashboard</div>
            </form> */}
          </div>

          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ms-2">
              <button type="button" className="btn header-item" id="page-header-search-dropdown"
                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <FeatherIcon
                  icon="search"
                  className="icon-lg"
                />
              </button>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-search-dropdown">

                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search ..." aria-label="Search Result" />

                      <button className="btn btn-primary" type="submit"><i className="mdi mdi-magnify"></i></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
          <div className="d-flex">
            {/* <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                onClick={() => {
                  setsearch(!search)
                }}
                type="button"
                className="btn header-item noti-icon "
                id="page-header-search-dropdown"
              >
                <i className="mdi mdi-magnify" />
              </button>
              <div
                className={
                  search
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div> */}

            {/* <LanguageDropdown /> */}

            {/* light / dark mode */}
            <LightDark layoutMode={props['layoutMode']} onChangeLayoutMode={onChangeLayoutMode} />

            {/* <Dropdown
              className="d-none d-lg-inline-block ms-1"
              isOpen={socialDrp}
              toggle={() => {
                setsocialDrp(!socialDrp)
              }}
            >
              <DropdownToggle
                className="btn header-item noti-icon "
                tag="button"
              >
                <FeatherIcon
                  icon="grid"
                  className="icon-lg"
                />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-lg dropdown-menu-end">
                <div className="p-2">
                  <Row className="g-0">
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={github} alt="Github" />
                        <span>GitHub</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={bitbucket} alt="bitbucket" />
                        <span>Bitbucket</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={dribbble} alt="dribbble" />
                        <span>Dribbble</span>
                      </Link>
                    </Col>
                  </Row>

                  <Row className="g-0">
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={dropbox} alt="dropbox" />
                        <span>Dropbox</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={mail_chimp} alt="mail_chimp" />
                        <span>Mail Chimp</span>
                      </Link>
                    </Col>
                    <Col>
                      <Link className="dropdown-icon-item" to="#">
                        <img src={slack} alt="slack" />
                        <span>Slack</span>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </DropdownMenu>
            </Dropdown> */}

            <NotificationDropdown />
            {/* <div
              onClick={toggleTopDrawer} disabled={open}
              className="dropdown d-inline-block"
            >
              <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle "
              >
                <FeatherIcon
                  icon="settings"
                  className="icon-lg"
                />
              </button>
            </div> */}
            <ProfileMenu />

          </div>
        </div>
      </header>
      <ReactDrawer
        open={open}
        position={position}
        onClose={onDrawerClose}
      >
        <RightSidebar onClose={onDrawerClose} onChangeLayoutMode={onChangeLayoutMode} />
      </ReactDrawer>
    </React.Fragment>
  )
}

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
  changelayoutMode: PropTypes.func,
  layoutMode: PropTypes.any,
}

const mapStatetoProps = state => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
    layoutMode
  } = state.Layout
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType, layoutMode }
}

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  changelayoutMode,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header))
