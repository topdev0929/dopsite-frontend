import { get, post } from "../helpers/api_helper"

export const changeUserProfile = data => post('/auth/changeUserProfile', data)
export const sendEmail = data => post('/send-email', data)
export const sendPass = data => post('/send-pass', data)
export const checkResetPassword = data => post('/change-pass', data)
export const getUserCompanyInfo = data => post('/auth/getUserCompanyInfo', data)
export const notificationCompanyAdminData = () => get('/notificationSiteAdminData')
export const joinToCompany = data => post('/auth/joinToCompany', data)
export const getUsersByCompanyId = data => get(`/auth/getUsersByCompanyId/${data.company_id}`)

export const joinToCompanyApprove = data => post('/auth/joinToCompanyApprove', data)
export const getAdmins = data => post('/auth/getAdmins', data)

export const DeleteUser = data => post('/auth/delete', data)

export const getUserByToken = data => post('/getUserByToken', data)

export const getUser = data => post('/auth/getUser', data)