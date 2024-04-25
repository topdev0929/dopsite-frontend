import PropTypes from "prop-types";
import React, { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux"
import styled from 'styled-components'
//Import Icons
// import FeatherIcon from "feather-icons-react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

//Import images
// import giftBox from "../../assets/images/giftbox.png";

//i18n
import { withTranslation } from "react-i18next";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import dashboardIcon from '../../assets/images/sidebarIcons/dashboard.svg'
// import newProjectIcon from '../../assets/images/sidebarIcons/newProject.svg'
// import newCustomerIcon from '../../assets/images/sidebarIcons/newCustomer.svg'
import projectsIcon from '../../assets/images/sidebarIcons/projects.svg'
import reportsIcon from '../../assets/images/sidebarIcons/reports.svg'
import invoicesIcon from '../../assets/images/sidebarIcons/invoices.svg'
import customersIcon from '../../assets/images/sidebarIcons/customers.svg'
import settingsIcon from '../../assets/images/sidebarIcons/settings.svg'
// import logoutIcon from '../../assets/images/sidebarIcons/logout.svg'

const Wrapper = styled.div`
  .list-unstyled li {
    img {
      width: 40px;
      height: auto;
    }
    span {
      font-family: 'Montserrat';
      font-size: 18px;
      margin-left: 10px;
      color: #6C6C6C
    }
    
  }
  .list-unstyled li.mm-active {
    background: white;
    span {
      color: #333333 !important;
    }
  }
  .logoutBtn {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    img {
      width: 40px;
      height: auto;
    }
    span {
      font-family: 'Montserrat';
      font-size: 18px;
      margin-left: 10px;
      color: #6C6C6C;
    }
  }
  #sidebar-menu > ul > li > a {
    margin-left: -5px;
  }
  #sidebar-menu .has-arrow:after {
    margin-top: 4px !important;
  }
  #sidebar-menu .sub-menu {
    padding-left: 15px;
    
    a {
      font-family: 'Montserrat';
      font-size: 18px;
      color: #6C6C6C;
    }
  }
`
const SidebarContent = (props) => {
  const ref = useRef();

  const activateParentDropdown = useCallback(item => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  });

  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }
  return (
    <React.Fragment>
      <Wrapper>
        <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              {/* Can't site super admin and user having other role */}
              {currentUser?.role_id !== 1 && !currentUser?.role_id !== 10 ? (
                <>
                  <li>
                    <Link to="/dashboard" className="">
                      <img src={dashboardIcon} alt='' />
                      <span>{props.t("Dashboard")}</span>
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/newProject" className="">
                      <img src={newProjectIcon} alt='' />
                      <span>{props.t("New Project")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/newCustomer" className="">
                      <img src={newCustomerIcon} alt='' />
                      <span>{props.t("New Customer")}</span>
                    </Link>
                  </li> */}
                  <li>
                    <Link to="/projects" className="">
                      <img src={projectsIcon} alt='' />
                      <span>{props.t("Projects")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/customers" className="">
                      <img src={customersIcon} alt='' />
                      <span>{props.t("Customers")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports" className="">
                      <img src={reportsIcon} alt='' />
                      <span>{props.t("Reports")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/invoices" className="">
                      <img src={invoicesIcon} alt='' />
                      <span>{props.t("Invoices")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="has-arrow">
                      <img src={settingsIcon} alt='' />
                      <span>{props.t("Settings")}</span>
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="/settings/company">{props.t("Company")}</Link>
                      </li>
                      <li>
                        <Link to="/settings/transactions">{props.t("Transactions")}</Link>
                      </li>
                      <li>
                        <Link to="/settings/usermanagement">{props.t("Users")}</Link>
                      </li>
                      <li>
                        <Link to="/setting">{props.t("Profile")}</Link>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/settings" className="has-arrow">
                    <img src={settingsIcon} alt='' />
                    <span>{props.t("Settings")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/company-manage">{props.t("Companies")}</Link>
                    </li>
                    <li>
                      <Link to="/affairs-manage">{props.t("Users")}</Link>
                    </li>
                    <li>
                      <Link to="/setting-manage">{props.t("Profile")}</Link>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
            {/* <div className="logoutBtn">
              <Link to="/logout" className="">
                <img src={logoutIcon} alt='' />
                <span>{props.t("Logout")}</span>
              </Link>
            </div> */}
          </div>
        </SimpleBar>
      </Wrapper>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withTranslation()(withRouter(SidebarContent));
