import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_USERS, GET_USER_PROFILE, ADD_NEW_USER, DELETE_USER, UPDATE_USER } from "./actionTypes"

import {
  getUsersSuccess,
  getUsersFail,
  getUserProfileSuccess,
  getUserProfileFail,
  addUserFail,
  addUserSuccess,
  updateUserSuccess,
  updateUserFail,
  deleteUserSuccess,
  deleteUserFail,
} from "./actions"

//Include Both Helper File with needed methods
import { getUsers, getUserProfile, addNewUser, updateUser, deleteUser } from "../../helpers/backend_helper"

function* fetchUsers() {
  try {
    const response = yield call(getUsers)
    yield put(getUsersSuccess(response))
  } catch (error) {
    yield put(getUsersFail(error))
  }
}

function* fetchUserProfile() {
  try {
    const response = yield call(getUserProfile)
    yield put(getUserProfileSuccess(response))
  } catch (error) {
    yield put(getUserProfileFail(error))
  }
}

function* onUpdateUser({ payload: user }) {
  try {
    const response = yield call(updateUser, user)
    yield put(updateUserSuccess(response))
  } catch (error) {
    yield put(updateUserFail(error))
  }
}

function* onDeleteUser({ payload: user }) {
  try {
    const response = yield call(deleteUser, user)
    yield put(deleteUserSuccess(response))
  } catch (error) {
    yield put(deleteUserFail(error))
  }
}

function* onAddNewUser({ payload: user }) {

  try {
    const response = yield call(addNewUser, user)

    yield put(addUserSuccess(response))
  } catch (error) {

    yield put(addUserFail(error))
  }
}

function* contactsSaga() {
  yield takeEvery(GET_USERS, fetchUsers)
  yield takeEvery(GET_USER_PROFILE, fetchUserProfile)
  yield takeEvery(ADD_NEW_USER, onAddNewUser)
  yield takeEvery(UPDATE_USER, onUpdateUser)
  yield takeEvery(DELETE_USER, onDeleteUser)
}

export default contactsSaga;
