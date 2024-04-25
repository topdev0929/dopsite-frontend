// @flow
import { all, call, fork, takeEvery, put } from "redux-saga/effects";

import {
  CHANGE_LAYOUT,
  CHANGE_LAYOUT_WIDTH,
  CHANGE_SIDEBAR_THEME,
  CHANGE_SIDEBAR_TYPE,
  CHANGE_TOPBAR_THEME,
  CHANGE_LAYOUT_THEME,
  SHOW_RIGHT_SIDEBAR,
  CHANGE_LAYOUT_POSITION,
} from "./actionTypes";

import {
  changeSidebarType as changeSidebarTypeAction,
  changeTopbarTheme as changeTopbarThemeAction,
} from "./actions";

/**
 * Changes the body attribute
 */
function changeBodyAttribute(attribute, value) {
  if (document.body) document.body.setAttribute(attribute, value);
  return true;
}

/**
 * Toggle the class on body
 * @param {*} cssClass
 */
function manageBodyClass(cssClass, action = "toggle") {
  switch (action) {
    case "add":
      if (document.body) document.body.classList.add(cssClass);
      break;
    case "remove":
      if (document.body) document.body.classList.remove(cssClass);
      break;
    default:
      if (document.body) document.body.classList.toggle(cssClass);
      break;
  }

  return true;
}

/**
 * Changes the layout type
 * @param {*} param0
 */
function* changeLayout({ payload: layout }) {
  try {
    if (layout === "horizontal") {
      yield put(changeTopbarThemeAction("dark"));
      document.body.removeAttribute("data-sidebar", "");
      yield call(changeBodyAttribute, "data-sidebar-size", "lg");
    } else {
      yield put(changeTopbarThemeAction("light"));
    }
    yield call(changeBodyAttribute, "data-layout", layout);
  } catch (error) { }
}

/**
 * Changes the layout width
 * @param {*} param0
 */
function* changeLayoutWidth({ payload: width }) {
  try {
    if (width === "boxed") {
      yield put(changeSidebarTypeAction("compact"));
      yield call(changeBodyAttribute, "data-layout-size", width);
    } else if (width === "scrollable") {
      yield put(changeSidebarTypeAction("compact"));
    } else {
      yield put(changeSidebarTypeAction("default"));
      yield call(changeBodyAttribute, "data-layout-size", width);
    }
  } catch (error) { }
}

/**
 * Changes the layout postion
 * @param {*} param0
 */
function* changeLayoutPosition({ payload: theme }) {
  try {
    yield call(changeBodyAttribute, "data-layout-scrollable", theme);
  } catch (error) { }
}

/**
 * Changes the left sidebar theme
 * @param {*} param0
 */
function* changeLeftSidebarTheme({ payload: theme }) {
  try {
    yield call(changeBodyAttribute, "data-sidebar", theme);
  } catch (error) { }
}

/**
 * Changes the topbar theme
 * @param {*} param0
 */
function* changeTopbarTheme({ payload: theme }) {
  try {
    yield call(changeBodyAttribute, "data-topbar", theme);
  } catch (error) { }
}

/**
 * Changes the layout mode
 * @param {*} param0
 */
function* changelayoutMode({ payload: { layoutMode, layoutType } }) {
  try {
    if (layoutMode === "light") {
      yield call(changeBodyAttribute, "data-layout-mode", layoutMode);
      yield put(changeTopbarThemeAction("light"));
      if (layoutType !== "horizontal") {
        yield call(changeBodyAttribute, "data-sidebar", "light");
      } else {
        yield call(changeBodyAttribute, "data-sidebar", "");
      }
    } else if (layoutMode === "dark") {
      yield call(changeBodyAttribute, "data-layout-mode", layoutMode);
      yield put(changeTopbarThemeAction("dark"));
      yield call(changeBodyAttribute, "data-sidebar", "dark");
    }
  } catch (error) { }
}

/**
 * Changes the left sidebar type
 * @param {*} param0
 */
function* changeLeftSidebarType({ payload: { sidebarType } }) {
  try {
    switch (sidebarType) {
      case "md":
        yield call(manageBodyClass, "sidebar-enable", "remove");
        yield call(changeBodyAttribute, "data-sidebar-size", "md");
        break;
      case "sm":
        yield call(manageBodyClass, "sidebar-enable", "remove");
        yield call(changeBodyAttribute, "data-sidebar-size", "sm");
        break;
      default:
        yield call(manageBodyClass, "sidebar-enable", "add");
        yield call(changeBodyAttribute, "data-sidebar-size", "lg");
        break;
    }
  } catch (error) { }
}

/**
 * Show the rightsidebar
 */
function* showRightSidebar() {
  try {
    yield call(manageBodyClass, "right-bar-enabled", "add");
  } catch (error) { }
}

/**
 * Watchers
 */
export function* watchChangeLayoutType() {
  yield takeEvery(CHANGE_LAYOUT, changeLayout);
}

export function* watchChangeLayoutWidth() {
  yield takeEvery(CHANGE_LAYOUT_WIDTH, changeLayoutWidth);
}

export function* watchChangeLeftSidebarTheme() {
  yield takeEvery(CHANGE_SIDEBAR_THEME, changeLeftSidebarTheme);
}

export function* watchChangeLayoutPosition() {
  yield takeEvery(CHANGE_LAYOUT_POSITION, changeLayoutPosition);
}

export function* watchChangeLeftSidebarType() {
  yield takeEvery(CHANGE_SIDEBAR_TYPE, changeLeftSidebarType);
}

export function* watchChangeTopbarTheme() {
  yield takeEvery(CHANGE_TOPBAR_THEME, changeTopbarTheme);
}

export function* watchChangelayoutMode() {
  yield takeEvery(CHANGE_LAYOUT_THEME, changelayoutMode);
}

export function* watchShowRightSidebar() {
  yield takeEvery(SHOW_RIGHT_SIDEBAR, showRightSidebar);
}

function* LayoutSaga() {
  yield all([
    fork(watchChangeLayoutType),
    fork(watchChangeLayoutWidth),
    fork(watchChangeLeftSidebarTheme),
    fork(watchChangeLeftSidebarType),
    fork(watchShowRightSidebar),
    fork(watchChangeTopbarTheme),
    fork(watchChangelayoutMode),
    fork(watchChangeLayoutPosition),
  ]);
}

export default LayoutSaga;
