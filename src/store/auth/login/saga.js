import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import jwt from 'jwt-decode'
import { LOGIN_USER, LOGIN_ADMIN, LOGOUT_USER, SOCIAL_LOGIN, VERIFY_USER } from "./actionTypes"
import { apiError, loginSuccess, verifySuccess, verifyFiled } from "./actions"
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postLogin,
  postSocialLogin,
  postVerify
} from "../../../helpers/backend_helper"
import {axiosApi} from '../../../helpers/api_helper'


function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(postLogin, {
      email: user.email,
      password: user.password,
    })
    const userData = jwt(response.access_token)
    if (userData.verified) {
      if (userData.role_id === 1) {
        yield put(apiError('Wrong email or password.'))
      } else {
        axiosApi.defaults.headers.common["Authorization"] = "Bearer " + response.access_token
        localStorage.setItem("access_token", JSON.stringify(response.access_token))
        yield put(loginSuccess(userData))
        history.push('/dashboard')
      }
    } 
  } catch (error) {
    console.log('error', error)
  }
}

function* loginAdminUser({ payload: { user, history } }) {
  try {
    const response = yield call(postLogin, {
      email: user.email,
      password: user.password,
    })
    const userData = jwt(response.access_token)
    if (userData.verified) {
      if (userData.role_id === 1) {
        axiosApi.defaults.headers.common["Authorization"] = "Bearer " + response.access_token
        localStorage.setItem("access_token", JSON.stringify(response.access_token))
        yield put(loginSuccess(userData))
        history.push('/company-manage')
      } else {
        yield put(apiError("Wrong admin's email or password."))
      }
    } 
  } catch (error) {
    console.log('error', error)
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("access_token")
    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* verifyUser({ payload: { data, history } }) {
  try {
    const response = yield call(postVerify, data)
    if (response.success) {
      yield put(verifySuccess())
      const userData = jwt(response.access_token)
      axiosApi.defaults.headers.common["Authorization"] = "Bearer " + response.access_token
      localStorage.setItem("access_token", JSON.stringify(response.access_token))
      yield put(loginSuccess(userData))
      history.push("/dashboard")
    } else {
      yield put(verifyFiled())
    }
  } catch (error) {
    yield put(verifyFiled())
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend()
      const response = yield call(
        fireBaseBackend.socialLoginUser,
        data,
        type,
      )
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    } else {
      const response = yield call(postSocialLogin, data)
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    }
    history.push("/dashboard")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGIN_ADMIN, loginAdminUser)
  yield takeLatest(SOCIAL_LOGIN, socialLogin)
  yield takeEvery(LOGOUT_USER, logoutUser)
  yield takeEvery(VERIFY_USER, verifyUser)
}

export default authSaga
