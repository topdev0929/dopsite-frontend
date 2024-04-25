// @flow
import {
  CHANGE_LAYOUT,
  CHANGE_LAYOUT_WIDTH,
  CHANGE_SIDEBAR_THEME,
  CHANGE_SIDEBAR_TYPE,
  CHANGE_TOPBAR_THEME,
  CHANGE_LAYOUT_THEME,
  CHANGE_LAYOUT_POSITION,
  SHOW_RIGHT_SIDEBAR,
  CHANGE_PRELOADER,
  TOGGLE_LEFTMENU,
  SHOW_SIDEBAR,
} from "./actionTypes"

//constants
import {
  layoutTypes,
  layoutWidthTypes,
  topBarThemeTypes,
  layoutTheme,
  layoutPositions,
  leftSidebarTypes,
  leftSideBarThemeTypes,
} from "../../constants/layout";

const INIT_STATE = {
  layoutType: layoutTypes.VERTICAL,
  layoutWidth: layoutWidthTypes.FLUID,
  leftSideBarTheme: leftSideBarThemeTypes.LIGHT,
  leftSideBarType: leftSidebarTypes.DEFAULT,
  layoutMode: layoutTheme.LIGHTMODE,
  topbarTheme: topBarThemeTypes.LIGHT,
  isPreloader: true,
  showRightSidebar: false,
  layoutPosition: layoutPositions.SCROLLABLE_FALSE,
  isMobile: false,
  showSidebar: true,
  leftMenu: false,
}

const Layout = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LAYOUT:
      return {
        ...state,
        layoutType: action.payload,
      }
    case CHANGE_PRELOADER:
      return {
        ...state,
        isPreloader: action.payload,
      }

    case CHANGE_LAYOUT_WIDTH:
      return {
        ...state,
        layoutWidth: action.payload,
      }
    case CHANGE_SIDEBAR_THEME:
      return {
        ...state,
        leftSideBarTheme: action.payload,
      }
    case CHANGE_SIDEBAR_TYPE:
      return {
        ...state,
        leftSideBarType: action.payload.sidebarType,
      }
    case CHANGE_TOPBAR_THEME:
      return {
        ...state,
        topbarTheme: action.payload,
      }
    case CHANGE_LAYOUT_POSITION:
      return {
        ...state,
        layoutPosition: action.payload,
      }
    case CHANGE_LAYOUT_THEME:
      return {
        ...state,
        layoutMode: action.payload.layoutMode,
      }
    case SHOW_RIGHT_SIDEBAR:
      return {
        ...state,
        showRightSidebar: action.payload,
      }
    case SHOW_SIDEBAR:
      return {
        ...state,
        showSidebar: action.payload,
      }
    case TOGGLE_LEFTMENU:
      return {
        ...state,
        leftMenu: action.payload,
      }

    default:
      return state
  }
}

export default Layout
