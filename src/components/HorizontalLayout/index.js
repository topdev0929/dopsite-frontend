import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//actions
import {
  changeLayout,
  changeTopbarTheme,
  changeLayoutWidth,
  changelayoutMode,
  changeLayoutPosition
} from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

//components
import Navbar from "./Navbar";
import Header from "./Header";
// import Footer from "./Footer";

const Layout = (props) => {

  const dispatch = useDispatch();

  const {
    topbarTheme, layoutWidth, isPreloader, layoutPosition, layoutMode
  } = useSelector(state => ({
    topbarTheme: state.Layout.topbarTheme,
    layoutWidth: state.Layout.layoutWidth,
    isPreloader: state.Layout.isPreloader,
    layoutPosition: state.Layout.layoutPosition,
    layoutMode: state.Layout.layoutMode
  }));

  /*
  document title
  */
  useEffect(() => {
    const title = props.location.pathname;
    let currentage = title.charAt(1).toUpperCase() + title.slice(2);

    document.title =
      currentage + " | DOP Test Network";
  }, [props.location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /*
  layout settings
  */
  useEffect(() => {
    dispatch(changeLayout("horizontal"));
  }, [dispatch]);

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
    if (topbarTheme) {
      dispatch(changeTopbarTheme(topbarTheme));
    }
  }, [dispatch, topbarTheme]);

  useEffect(() => {
    if (layoutPosition) {
      dispatch(changeLayoutPosition(layoutPosition));
    }
  }, [dispatch, layoutPosition]);

  useEffect(() => {
    if (layoutWidth) {
      dispatch(changeLayoutWidth(layoutWidth));
    }
  }, [dispatch, layoutWidth]);

  useEffect(() => {
    if (layoutMode) {
      dispatch(changelayoutMode(layoutMode, layoutType));
    }
  }, [layoutMode, dispatch]);

  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const openMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  /*
call dark/light mode
*/
  const { changelayoutMode, layoutType } = props;
  const onChangeLayoutMode = (value) => {
    if (changelayoutMode) {
      changelayoutMode(value, layoutType);
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
        <Header
          theme={topbarTheme}
          isMenuOpened={isMenuOpened}
          openLeftMenuCallBack={openMenu}
          onChangeLayoutMode={onChangeLayoutMode}
        />
        <Navbar menuOpen={isMenuOpened} />
        <div className="main-content">{props.children}</div>
        {/* <Footer /> */}
      </div>
    </React.Fragment>
  );
};

Layout.propTypes = {
  changeLayout: PropTypes.func,
  changeLayoutWidth: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  isPreloader: PropTypes.any,
  layoutWidth: PropTypes.any,
  location: PropTypes.object,
  showRightSidebar: PropTypes.any,
  topbarTheme: PropTypes.any
};

const mapStateToProps = state => {
  return { ...state.Layout };
};

export default connect(mapStateToProps, {
  changelayoutMode,
})(withRouter(Layout));
