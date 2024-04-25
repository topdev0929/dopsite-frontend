import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_REPORT_HISTORY_BYPROJECTID, GET_REPORT_HISTORY_BYCOMPANY, GET_REPORT_HISTORY_BYID} from "./actionTypes"
import {
  getReportHisotryByProjectSuccess,
  getReportHistoriesByCompanySuccess,
  getReportHisotryByIdSuccess
} from "./actions"
import { getReportHistoryByProjectAsync, getReportHistoryByCompanyAsync, getReportHistoryByIdAsync } from "../../helpers/backend_helper"

function* fetchReportHistoryByProject({payload: projectId}) {
  try {
    const response = yield call(getReportHistoryByProjectAsync, projectId)
    yield put(getReportHisotryByProjectSuccess(response))
  } catch (error) {
    console.log('error =>',error)
  }
}

function* fetchReportHistoryByCompany({payload: companyId}) {
  try {
    const response = yield call(getReportHistoryByCompanyAsync, companyId)
    yield put(getReportHistoriesByCompanySuccess(response))
  } catch (error) {
    console.log('error =>',error)
  }
}


function* fetchReportHistoryById({payload: id}) {
  try {
    const response = yield call(getReportHistoryByIdAsync, id)
    yield put(getReportHisotryByIdSuccess(response))
  } catch (error) {
    console.log('error =>',error)
  }
}




function* reportsSaga() {
  yield takeEvery(GET_REPORT_HISTORY_BYPROJECTID, fetchReportHistoryByProject)
  yield takeEvery(GET_REPORT_HISTORY_BYCOMPANY, fetchReportHistoryByCompany)
  yield takeEvery(GET_REPORT_HISTORY_BYID, fetchReportHistoryById)
}

export default reportsSaga
