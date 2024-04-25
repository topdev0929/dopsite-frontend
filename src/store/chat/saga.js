import { takeEvery, put, call } from "redux-saga/effects"

// Chat Redux States
import {
  GET_CHATS,
  GET_CONTACTS,
  GET_GROUPS,
  GET_MESSAGES,
  POST_ADD_MESSAGE,
} from "./actionTypes"
import {
  getChatsSuccess,
  getChatsFail,
  getGroupsSuccess,
  getGroupsFail,
  getContactsSuccess,
  getContactsFail,
  getMessagesSuccess,
  getMessagesFail,
  addMessageSuccess,
  addMessageFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getChats,
  getGroups,
  getContacts,
  getMessages,
  addMessage,
} from "../../helpers/backend_helper"

function* onGetChats() {
  try {
    const response = yield call(getChats)
    yield put(getChatsSuccess(response))
  } catch (error) {
    yield put(getChatsFail(error))
  }
}

function* onGetGroups() {
  try {
    const response = yield call(getGroups)
    yield put(getGroupsSuccess(response))
  } catch (error) {
    yield put(getGroupsFail(error))
  }
}

function* onGetContacts() {
  try {
    const response = yield call(getContacts)
    yield put(getContactsSuccess(response))
  } catch (error) {
    yield put(getContactsFail(error))
  }
}

function* onGetMessages({ roomId }) {
  try {
    const response = yield call(getMessages, roomId)
    yield put(getMessagesSuccess(response))
  } catch (error) {
    yield put(getMessagesFail(error))
  }
}

function* onAddMessage({ message }) {
  try {
    const response = yield call(addMessage, message)
    yield put(addMessageSuccess(response))
  } catch (error) {
    yield put(addMessageFail(error))
  }
}

function* chatSaga() {
  yield takeEvery(GET_CHATS, onGetChats)
  yield takeEvery(GET_GROUPS, onGetGroups)
  yield takeEvery(GET_CONTACTS, onGetContacts)
  yield takeEvery(GET_MESSAGES, onGetMessages)
  yield takeEvery(POST_ADD_MESSAGE, onAddMessage)
}

export default chatSaga
