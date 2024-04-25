import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Collapse } from "reactstrap";
import { Link, withRouter } from "react-router-dom";

//Import Icons
import FeatherIcon from "feather-icons-react";

//i18n
import { withTranslation } from "react-i18next";

//redux
import { useSelector } from "react-redux";

const Navbar = (props) => {
  const { leftMenu } = useSelector((state) => ({
    leftMenu: state.Layout.leftMenu,
  }));

  useEffect(() => {
    var matchingMenuItem = null;
    var ul = document.getElementById("navigation");
    var items = ul.getElementsByTagName("a");
    for (var i = 0; i < items.length; ++i) {
      if (props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  });
  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    if (parent) {
      parent.classList.add("active"); // li
      const parent2 = parent.parentElement;
      parent2.classList.add("active"); // li
      const parent3 = parent2.parentElement;
      if (parent3) {
        parent3.classList.add("active"); // li
        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add("active"); // li
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("active"); // li
            const parent6 = parent5.parentElement;
            if (parent6) {
              parent6.classList.add("active"); // li
            }
          }
        }
      }
    }
    return false;
  }

  return (
    <React.Fragment>
      <div className="topnav">
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    to="/company-manage"
                  >
                    <FeatherIcon icon="home" />
                    <span>{props.t("Companies")}</span>
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    to="/affairs-manage"
                  >
                    <FeatherIcon icon="users" />
                    <span>{props.t("Users")}</span>
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    to="/setting-manage"
                  >
                    <FeatherIcon icon="settings" />
                    <span>{props.t("Profile")}</span>
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    to="/transactions"
                  >
                    <FeatherIcon icon="calendar" />
                    <span>{props.t("Transactions")}</span>
                  </Link>
                </li>
                {/* <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault();
                      setapp(!app);
                    }}
                    className="nav-link dropdown-togglez arrow-none"
                  >
                    <FeatherIcon icon="grid" />
                    {props.t("Apps")} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: app })}>
                    <Link to="#" className="dropdown-item">
                      {props.t("Calendar")}
                    </Link>
                    <Link to="#" className="dropdown-item">
                      {props.t("Chat")}
                    </Link>
                    <div className="dropdown">
                      <Link
                        to="/#"
                        className="dropdown-item dropdown-toggle arrow-none"
                        onClick={e => {
                          e.preventDefault();
                          setemail(!email);
                        }}
                      >
                        {props.t("Email")} <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", { show: email })}
                      >
                        <Link to="#" className="dropdown-item">
                          {props.t("Inbox")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Read Email")}
                        </Link>
                      </div>
                    </div>
                    <div className="dropdown">
                      <Link
                        to="/#"
                        className="dropdown-item dropdown-toggle arrow-none"
                        onClick={e => {
                          e.preventDefault();
                          setinvoice(!invoice);
                        }}
                      >
                        {props.t("Invoices")} <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", {
                          show: invoice,
                        })}
                      >
                        <Link to="#" className="dropdown-item">
                          {props.t("Invoice List")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Invoice Detail")}
                        </Link>
                      </div>
                    </div>

                    <div className="dropdown">
                      <Link
                        to="/#"
                        className="dropdown-item dropdown-toggle arrow-none"
                        onClick={e => {
                          e.preventDefault();
                          setcontact(!contact);
                        }}
                      >
                        {props.t("Contacts")} <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", {
                          show: contact,
                        })}
                      >
                        <Link to="#" className="dropdown-item">
                          {props.t("User Grid")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("User List")}
                        </Link>
                        <Link to="#" className="dropdown-item">
                          {props.t("Profile")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </li> */}

              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
};

export default withTranslation()(withRouter(Navbar));
