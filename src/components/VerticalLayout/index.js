import PropTypes from "prop-types";
import React, { useEffect } from "react";
import {
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  changeLayoutWidth,
  changelayoutMode,
} from "../../store/actions";

// Layout Related Components
import Header from "./Header";
import Sidebar from "./Sidebar";
// import Footer from "./Footer";

//redux
import { useSelector, useDispatch } from "react-redux";
const Layout = props => {
  const dispatch = useDispatch();

  const {
    isPreloader,
    layoutWidth,
    leftSideBarType,
    topbarTheme,
    leftSideBarTheme,
    layoutMode,
    layoutType,
    leftSidebarTypes
  } = useSelector(state => ({
    isPreloader: state.Layout.isPreloader,
    leftSideBarType: state.Layout.leftSideBarType,
    layoutWidth: state.Layout.layoutWidth,
    topbarTheme: state.Layout.topbarTheme,
    leftSideBarTheme: state.Layout.leftSideBarTheme,
    layoutMode: state.Layout.layoutMode,
    layoutType: state.Layout.layoutType,
    leftSidebarTypes: state.Layout.leftSidebarTypes
  }));

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const toggleMenuCallback = () => {
    if (leftSideBarType === "default") {
      dispatch(changeSidebarType("condensed", isMobile));
    } else if (leftSideBarType === "condensed") {
      dispatch(changeSidebarType("default", isMobile));
    }
  };

  /*
  layout  settings
  */

  useEffect(() => {
    if (isPreloader === true) {
      document.getElementById("preloader").style.display = "block";
      document.getElementById("status").style.display = "block";

      setTimeout(function () {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("status").style.display = "none";
      }, 500);
    } else {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("status").style.display = "none";
    }
  }, [isPreloader]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(changeLayout("vertical"));
  }, [dispatch]);

  useEffect(() => {
    if (leftSideBarTheme) {
      dispatch(changeSidebarTheme(leftSideBarTheme));
    }
  }, [leftSideBarTheme, dispatch]);

  useEffect(() => {
    if (layoutMode) {
      dispatch(changelayoutMode(layoutMode));
    }
  }, [layoutMode, dispatch]);

  useEffect(() => {
    if (leftSidebarTypes) {
      dispatch(changeSidebarType(leftSidebarTypes));
    }
  }, [leftSidebarTypes, dispatch]);


  useEffect(() => {
    if (layoutWidth) {
      dispatch(changeLayoutWidth(layoutWidth));
    }
  }, [layoutWidth, dispatch]);

  useEffect(() => {
    if (leftSideBarType) {
      dispatch(changeSidebarType(leftSideBarType));
    }
  }, [leftSideBarType, dispatch]);

  useEffect(() => {
    if (topbarTheme) {
      dispatch(changeTopbarTheme(topbarTheme));
    }
  }, [topbarTheme, dispatch]);

  /*
  call dark/light mode
  */
  const onChangeLayoutMode = (value) => {
    if (changelayoutMode) {
      dispatch(changelayoutMode(value, layoutType));
    }
  };

  return (
    <React.Fragment>
      <div id="preloader">
        <div id="status">
          <div className="spinner-chase">
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
          </div>
        </div>
      </div>

      <div id="layout-wrapper">
        <Header toggleMenuCallback={toggleMenuCallback} onChangeLayoutMode={onChangeLayoutMode} />
        <Sidebar
          theme={leftSideBarTheme}
          type={leftSideBarType}
          isMobile={isMobile}
        />
        <div className="main-content">{props.children}</div>
        {/* <Footer /> */}
      </div>
    </React.Fragment>
  );
};

Layout.propTypes = {
  changeLayoutWidth: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  isPreloader: PropTypes.any,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarType: PropTypes.any,
  location: PropTypes.object,
  showRightSidebar: PropTypes.any,
  topbarTheme: PropTypes.any,
  changelayoutMode: PropTypes.func
};


export default Layout;
