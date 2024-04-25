import React from "react";

import {
  changeLayout,
  changeLayoutWidth,
  changeLayoutPosition,
  changeTopbarTheme,
  changeSidebarType,
  changeSidebarTheme,
} from "../../store/actions";

//constants
import {
  layoutTypes,
  layoutTheme,
  layoutWidthTypes,
  layoutPositions,
  topBarThemeTypes,
  leftSidebarTypes,
  leftSideBarThemeTypes,
} from "../../constants/layout";

//SimpleBar
import SimpleBar from "simplebar-react";

import { Link } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";

const RightSidebar = ({ onClose, onChangeLayoutMode }) => {
  const dispatch = useDispatch();

  const {
    layoutType,
    layoutMode,
    layoutWidth,
    layoutPosition,
    topbarTheme,
    leftSideBarType,
    leftSideBarTheme,
  } = useSelector((state) => ({
    layoutType: state.Layout.layoutType,
    layoutMode: state.Layout.layoutMode,
    layoutWidth: state.Layout.layoutWidth,
    layoutPosition: state.Layout.layoutPosition,
    topbarTheme: state.Layout.topbarTheme,
    leftSideBarType: state.Layout.leftSideBarType,
    leftSideBarTheme: state.Layout.leftSideBarTheme,
  }));

  // Light/dark mode
  const onChangeMode = (value) => {
    if (onChangeLayoutMode) {
      onChangeLayoutMode(value);
    }
  };

  return (
    <React.Fragment>
      <div className="right-bar">
        <SimpleBar style={{ height: "900px" }}>
          <div data-simplebar className="h-100">
            <div className="rightbar-title d-flex align-items-center bg-dark p-3">
              <h5 className="m-0 me-2 text-white">Theme Customizer</h5>
              <Link
                to="#"
                onClick={onClose}
                className="right-bar-toggle ms-auto"
              >
                <i className="mdi mdi-close noti-icon"></i>
              </Link>
            </div>

            <hr className="m-0" />

            <div className="p-4">
              <h6 className="mb-3">Layouts</h6>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="radioVertical"
                  name="layout"
                  value={layoutTypes.VERTICAL}
                  className="form-check-input"
                  checked={layoutType === layoutTypes.VERTICAL}
                  onChange={e => {
                    if (e.target.checked) {
                      dispatch(changeLayout(e.target.value));
                    }
                  }}
                />
                <label htmlFor="radioVertical" className="form-check-label">
                  Vertical
                </label>
              </div>
              {"   "}
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="layout"
                  id="layout-horizontal"
                  value={layoutTypes.HORIZONTAL}
                  checked={layoutType === layoutTypes.HORIZONTAL}
                  onChange={e => {
                    if (e.target.checked) {
                      dispatch(changeLayout(e.target.value));
                    }
                  }}
                />
                <label className="form-check-label" htmlFor="layout-horizontal">
                  Horizontal
                </label>
              </div>
              <h6 className="mt-4 mb-3 pt-2">Layout Mode</h6>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="radioThemeLight"
                  name="radioTheme"
                  value={layoutTheme.LIGHTMODE}
                  className="form-check-input"
                  checked={layoutMode === layoutTheme.LIGHTMODE}
                  onChange={e => {
                    onChangeMode(e.target.value);
                  }}
                />
                <label className="form-check-label" htmlFor="radioThemeLight">
                  Light
                </label>
              </div>
              {"   "}
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="radioThemeDark"
                  name="radioTheme"
                  value={layoutTheme.DARKMODE}
                  className="form-check-input"
                  checked={layoutMode === layoutTheme.DARKMODE}
                  onChange={e => {
                    onChangeMode(e.target.value);
                  }}
                />
                <label className="form-check-label" htmlFor="radioThemeDark">
                  Dark
                </label>
              </div>

              <h6 className="mt-4 mb-3">Layout Width</h6>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="radioFluid"
                  name="radioWidth"
                  value={layoutWidthTypes.FLUID}
                  className="form-check-input"
                  checked={layoutWidth === layoutWidthTypes.FLUID}
                  onChange={e => {
                    if (e.target.checked) {
                      dispatch(changeLayoutWidth(e.target.value));
                    }
                  }}
                />
                <label htmlFor="radioFluid" className="form-check-label">
                  Fluid
                </label>
              </div>
              {"   "}
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="radioBoxed"
                  name="radioWidth"
                  value={layoutWidthTypes.BOXED}
                  className="form-check-input"
                  checked={layoutWidth === layoutWidthTypes.BOXED}
                  onChange={e => {
                    if (e.target.checked) {
                      dispatch(changeLayoutWidth(e.target.value));
                    }
                  }}
                />
                <label htmlFor="radioBoxed" className="form-check-label">
                  Boxed
                </label>
              </div>
              <h6 className="mt-4 mb-3">Layout Position</h6>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="layout-position-fixed"
                  name="layout-position"
                  value={layoutPositions.SCROLLABLE_FALSE}
                  className="form-check-input"
                  checked={layoutPosition === layoutPositions.SCROLLABLE_FALSE}
                  onChange={e => {
                    if (e.target.checked) {
                      dispatch(changeLayoutPosition(e.target.value));
                    }
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="layout-position-fixed"
                >
                  Fixed
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="layout-position-scrollable"
                  name="layout-position"
                  value={layoutPositions.SCROLLABLE_TRUE}
                  className="form-check-input"
                  checked={layoutPosition === layoutPositions.SCROLLABLE_TRUE}
                  onChange={e => {
                    if (e.target.checked) {
                      dispatch(changeLayoutPosition(e.target.value));
                    }
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="layout-position-scrollable"
                >
                  Scrollable
                </label>
              </div>

              <h6 className="mt-4 mb-3">Topbar Color</h6>

              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="topbar-color-light"
                  name="topbar-color"
                  value={topBarThemeTypes.LIGHT}
                  className="form-check-input"
                  checked={topbarTheme === topBarThemeTypes.LIGHT}
                  onChange={e => {
                    if (e.target.checked) {
                      dispatch(changeTopbarTheme(e.target.value));
                    }
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="topbar-color-light"
                >
                  Light
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="topbar-color-dark"
                  name="topbar-color"
                  value={topBarThemeTypes.DARK}
                  className="form-check-input"
                  checked={topbarTheme === topBarThemeTypes.DARK}
                  onChange={e => {
                    if (e.target.checked) {
                      dispatch(changeTopbarTheme(e.target.value));
                    }
                  }}
                />
                <label className="form-check-label" htmlFor="topbar-color-dark">
                  Dark
                </label>
              </div>
              {layoutType === "vertical" ? (
                <React.Fragment>
                  <h6 className="mt-4 mb-3 sidebar-setting">Sidebar Size</h6>

                  <div className="form-check sidebar-setting">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sidebar-size"
                      id="sidebar-size-default"
                      value={leftSidebarTypes.DEFAULT}
                      checked={leftSideBarType === leftSidebarTypes.DEFAULT}
                      onChange={e => {
                        if (e.target.checked) {
                          dispatch(changeSidebarType(e.target.value));
                        }
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="sidebar-size-default"
                    >
                      Default
                    </label>
                  </div>
                  <div className="form-check sidebar-setting">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sidebar-size"
                      id="sidebar-size-compact"
                      value={leftSidebarTypes.COMPACT}
                      checked={leftSideBarType === leftSidebarTypes.COMPACT}
                      onChange={e => {
                        if (e.target.checked) {
                          dispatch(changeSidebarType(e.target.value));
                        }
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="sidebar-size-compact"
                    >
                      Compact
                    </label>
                  </div>
                  <div className="form-check sidebar-setting">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sidebar-size"
                      id="sidebar-size-small"
                      value={leftSidebarTypes.ICON}
                      checked={leftSideBarType === leftSidebarTypes.ICON}
                      onChange={e => {
                        if (e.target.checked) {
                          dispatch(changeSidebarType(e.target.value));
                        }
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="sidebar-size-small"
                    >
                      Small (Icon View)
                    </label>
                  </div>
                  <h6 className="mt-4 mb-3 sidebar-setting">Sidebar Color</h6>

                  <div className="form-check sidebar-setting">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sidebar-color"
                      id="sidebar-color-light"
                      value={leftSideBarThemeTypes.LIGHT}
                      checked={leftSideBarTheme === leftSideBarThemeTypes.LIGHT}
                      onChange={e => {
                        if (e.target.checked) {
                          dispatch(changeSidebarTheme(e.target.value));
                        }
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="sidebar-color-light"
                    >
                      Light
                    </label>
                  </div>
                  <div className="form-check sidebar-setting">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sidebar-color"
                      id="sidebar-color-dark"
                      value={leftSideBarThemeTypes.DARK}
                      checked={leftSideBarTheme === leftSideBarThemeTypes.DARK}
                      onChange={e => {
                        if (e.target.checked) {
                          dispatch(changeSidebarTheme(e.target.value));
                        }
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="sidebar-color-dark"
                    >
                      Dark
                    </label>
                  </div>
                  <div className="form-check sidebar-setting">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sidebar-color"
                      id="sidebar-color-brand"
                      value={leftSideBarThemeTypes.COLORED}
                      checked={
                        leftSideBarTheme === leftSideBarThemeTypes.COLORED
                      }
                      onChange={e => {
                        if (e.target.checked) {
                          dispatch(changeSidebarTheme(e.target.value));
                        }
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="sidebar-color-brand"
                    >
                      Brand
                    </label>
                  </div>
                </React.Fragment>
              ) : null}
            </div>
          </div>
        </SimpleBar>
      </div>
      <div className="rightbar-overlay" />
    </React.Fragment>
  );
};

export default RightSidebar;
