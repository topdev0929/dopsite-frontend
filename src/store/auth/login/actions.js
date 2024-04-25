import {
  LOGIN_USER,
  LOGIN_ADMIN,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  SOCIAL_LOGIN,
  VERIFY_USER,
  VERIFY_SUCCESS,
  VERIFY_FAILED,
  CHANGE_USER_INFO
} from "./actionTypes"

export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history },
  }
}

export const loginAdminUser = (user, history) => {
  return {
    type: LOGIN_ADMIN,
    payload: { user, history },
  }
}

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  }
}

export const logoutUser = history => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  }
}

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  }
}

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  }
}

export const socialLogin = (data, history, type) => {
  return {
    type: SOCIAL_LOGIN,
    payload: { data, history, type },
  }
}

export const verifyUser = (data, history, type) => {
  return {
    type: VERIFY_USER,
    payload: { data, history },
  }
}

export const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS,
    payload: {},
  }
}

export const verifyFiled = () => {
  return {
    type: VERIFY_FAILED,
    payload: {},
  }
}

export const changeUserInfo = data => {
  return {
    type: CHANGE_USER_INFO,
    payload: data,
  }
}