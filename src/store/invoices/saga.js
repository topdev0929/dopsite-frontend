import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_INVOICES, GET_INVOICE_DETAIL, GET_INVOICE_HISTORY_BYID, GET_INVOICE_HISTORY_BY_COMPANYID, GET_INVOICE_HISTORY_BY_PROJECTID } from "./actionTypes"
import {
  getInvoicesSuccess,
  getInvoicesFail,
  getInvoiceDetailSuccess,
  getInvoiceDetailFail,
  getInvoiceHistoryByIdSuccess,
  getInvoiceHistoriesByCompanySuccess,
  getInvoiceHisotryByProjectSuccess
} from "./actions"
import { getInvoices, getInvoiceDetail, getInvoiceHistoryByIdAsync, getInvoiceHistoryByCompnayAsync, getInvoiceHistoryByProjectAsync } from "../../helpers/backend_helper"

function* fetchInvoices() {
  try {
    const response = yield call(getInvoices)
    yield put(getInvoicesSuccess(response))
  } catch (error) {
    yield put(getInvoicesFail(error))
  }
}

function* fetchInvoiceDetail({ invoiceId }) {
  try {
    const response = yield call(getInvoiceDetail, invoiceId)
    yield put(getInvoiceDetailSuccess(response))
  } catch (error) {
    yield put(getInvoiceDetailFail(error))
  }
}

function* fetchInvoiceHistoryById({ payload: id }) {
  try {
    const response = yield call(getInvoiceHistoryByIdAsync, id)
    yield put(getInvoiceHistoryByIdSuccess(response))
  } catch (error) {
    console.log('error =>',error)
    // yield put(getInvoiceDetailFail(error))
  }
}

function* fetchInvoiceHistoryByCompnay({payload: company_id}) {
  try {
    const response = yield call(getInvoiceHistoryByCompnayAsync, company_id)
    yield put(getInvoiceHistoriesByCompanySuccess(response))

  } catch (error) {
    console.log('error =>',error)
  }
}

function* fetchInvoiceHistoryByProject({payload: project_id}) {
  try {
    const response = yield call(getInvoiceHistoryByProjectAsync, project_id)
    yield put(getInvoiceHisotryByProjectSuccess(response))

  } catch (error) {
    console.log('error =>',error)
  }
}

function* invoiceSaga() {
  yield takeEvery(GET_INVOICES, fetchInvoices)
  yield takeEvery(GET_INVOICE_DETAIL, fetchInvoiceDetail)
  yield takeEvery(GET_INVOICE_HISTORY_BYID, fetchInvoiceHistoryById)
  yield takeEvery(GET_INVOICE_HISTORY_BY_COMPANYID, fetchInvoiceHistoryByCompnay)
  yield takeEvery(GET_INVOICE_HISTORY_BY_PROJECTID, fetchInvoiceHistoryByProject)


  

}

export default invoiceSaga
