import jwt from 'jwt-decode'

import {
  LOGIN_USER,
  LOGIN_ADMIN,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  VERIFY_SUCCESS,
  VERIFY_FAILED,
  CHANGE_USER_INFO
} from "./actionTypes"

const initialState = {
  error: "",
  loading: false,
  verifyMessage: 'verifying',
  user: localStorage.getItem('access_token') && jwt(localStorage.getItem('access_token'))
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      }
      break
    case LOGIN_ADMIN:
      state = {
        ...state,
        loading: true,
      }
      break
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        user: action.payload
      }
      break
    case LOGOUT_USER:
      state = { ...state }
      break
    case LOGOUT_USER_SUCCESS:
      state = { ...state }
      break
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false }
      break
    case VERIFY_SUCCESS:
      state = {
        ...state,
        verifyMessage: 'success'
      }
      break
    case VERIFY_FAILED:
      state = {
        ...state,
        verifyMessage: 'failed'
      }
      break
    case CHANGE_USER_INFO:
      state = {
        ...state,
        user: action.payload
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default login
