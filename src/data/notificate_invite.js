import { post } from "../helpers/api_helper"

export const inviteUser = data => post(`/notificateInvite/sendEmailToRequester`, data)
export const requestCompanyFromRequester = data => post('/notificateInvite/requestCompanyFromRequester', data)
