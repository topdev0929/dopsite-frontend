import { get, post } from "../helpers/api_helper"
import * as url from "../helpers/url_helper"

export const requestCompany = data => post(url.REQUEST_COMPANY, data)
export const requestCheck = data => post(url.REQUEST_CHECK, data)
export const updateCompany = data => post(`/company/update/${data.id}`, data)
export const getStuffs = data => post(`/company/getStuffs/${data.company_id}`, data.data)
export const outUser = data => post('/auth/outUser', {id: data})
export const getAllStuffsNotImported = () => get('/auth/getAllStuffsNotImported')
export const changeUserRole = data => post('/auth/changeUserRole', data)
export const getAllCompany = data => get('/company/getApprove')
export const getCompany = data => get('/company/get')
export const companyApproveState = data => post(`/company/updateCompany/${data.id}`, data)
export const companyDelete = data => post(`/company/remove/${data.id}`, data)

export const getCompanyInfo = data => get(`/company/get/${data.id}`)
export const setBankAccount = data => post(`/company/setBankAccount`, data)

export const getTransactions = data => post(`/company/getTransactions`, data)
export const getRootAmount = data => post(`/company/getRootAmount`, data)
export const getCompanyBalance = data => post(`/company/getCompanyBalance`, data)
export const getTransactionInfo = data => post('/company/getTransactionInfo', data)
export const getTransactionsByCompany = data => post('/company/getTransactionsByCompany', data)

export const BackupDatabase = () => get('/backup')
