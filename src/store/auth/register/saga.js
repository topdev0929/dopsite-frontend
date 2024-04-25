import { takeEvery, fork, put, all, call } from "redux-saga/effects"

import { REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"
import {
  postRegister,
} from "../../../helpers/backend_helper"

function* registerUser({ payload: { user } }) {
  try {
    const response = yield call(postRegister, user)
    yield put(registerUserSuccessful(response))
  } catch (error) {
    yield put(registerUserFailed('This email is already registered. Please use other email.'))
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser)
}

function* accountSaga() {
  yield all([fork(watchUserRegister)])
}

export default accountSaga
