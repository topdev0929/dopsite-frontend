import {
  GET_REPORT_HISTORY,
  GET_REPORT_HISTORY_BYPROJECTID,
  GET_REPORT_HISTORY_BYPROJECTID_SUCCESS,
  GET_REPORT_HISTORY_BYCOMPANY,
  GET_REPORT_HISTORY_BYCOMPANY_SUCCESS,
  GET_REPORT_HISTORY_BYID,
  GET_REPORT_HISTORY_BYID_SUCCESS
} from "./actionTypes"

export const getReportHistories = () => ({
  type: GET_REPORT_HISTORY,
})

// export const getInvoicesSuccess = invoices => ({
//   type: GET_INVOICES_SUCCESS,
//   payload: invoices,
// })

export const getReportHisotryByProject = projectId => ({
  type: GET_REPORT_HISTORY_BYPROJECTID,
  payload: projectId,
})

export const getReportHisotryByProjectSuccess = reportHistory => ({
  type: GET_REPORT_HISTORY_BYPROJECTID_SUCCESS,
  payload: reportHistory,
})

export const getReportHistoriesByCompany = companyId => ({
  type: GET_REPORT_HISTORY_BYCOMPANY,
  payload: companyId,
})

export const getReportHistoriesByCompanySuccess = reportHistory => ({
  type: GET_REPORT_HISTORY_BYCOMPANY_SUCCESS,
  payload: reportHistory,
})

export const getReportHisotryById = id => ({
  type: GET_REPORT_HISTORY_BYID,
  payload: id,
})

export const getReportHisotryByIdSuccess = reportHistory => ({
  type: GET_REPORT_HISTORY_BYID_SUCCESS,
  payload: reportHistory,
})




