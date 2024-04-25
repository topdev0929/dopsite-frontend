import {
  GET_INVOICES,
  GET_INVOICES_FAIL,
  GET_INVOICES_SUCCESS,
  GET_INVOICE_DETAIL,
  GET_INVOICE_DETAIL_FAIL,
  GET_INVOICE_DETAIL_SUCCESS,
  GET_INVOICE_HISTORY_BYID,
  GET_INVOICE_HISTORY_BYID_SUCCESS,
  GET_INVOICE_HISTORY_BY_COMPANYID,
  GET_INVOICE_HISTORY_BY_COMPANYID_SUCCESS,
  GET_INVOICE_HISTORY_BY_PROJECTID,
  GET_INVOICE_HISTORY_BY_PROJECTID_SUCCESS
} from "./actionTypes"

export const getInvoices = () => ({
  type: GET_INVOICES,
})

export const getInvoicesSuccess = invoices => ({
  type: GET_INVOICES_SUCCESS,
  payload: invoices,
})

export const getInvoicesFail = error => ({
  type: GET_INVOICES_FAIL,
  payload: error,
})

export const getInvoiceDetail = invoiceId => ({
  type: GET_INVOICE_DETAIL,
  invoiceId,
})

export const getInvoiceDetailSuccess = invoices => ({
  type: GET_INVOICE_DETAIL_SUCCESS,
  payload: invoices,
})

export const getInvoiceDetailFail = error => ({
  type: GET_INVOICE_DETAIL_FAIL,
  payload: error,
})

export const getInvoiceHisotryById = id => ({
  type: GET_INVOICE_HISTORY_BYID,
  payload: id
})

export const getInvoiceHistoryByIdSuccess = invoice_history => ({
  type: GET_INVOICE_HISTORY_BYID_SUCCESS,
  payload: invoice_history,
})

export const getInvoiceHistoriesByCompany = (company_id) => ({
  type: GET_INVOICE_HISTORY_BY_COMPANYID,
  payload: company_id
})

export const getInvoiceHistoriesByCompanySuccess = invoices => ({
  type: GET_INVOICE_HISTORY_BY_COMPANYID_SUCCESS,
  payload: invoices,
})

export const getInvoiceHisotryByProject = project_id => ({
  type: GET_INVOICE_HISTORY_BY_PROJECTID,
  payload: project_id
})

export const getInvoiceHisotryByProjectSuccess = invoice_history => ({
  type: GET_INVOICE_HISTORY_BY_PROJECTID_SUCCESS,
  payload: invoice_history,
})

