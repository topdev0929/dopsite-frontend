import {  get, post } from "../helpers/api_helper"

export const SendInvoice = data => post('/invoice/sendInvoice', data)
export const getInvoiceNum = data => get(`/invoice/getInvoiceNum/${data.id}`)

export const getInvoice = data => get(`/invoice/get/${data.id}`)
export const paymentSecret = data => post(`/invoice/paymentSecret`, data)
export const payed = data => post(`/invoice/payed`, data)
export const getInvoiceByCompany = data => post(`/invoice/getInvoiceByCompany/${data.id}`, data)

export const getAccount = () => get(`/invoice/getAccount`)
export const transterToCompany = data => post(`/invoice/pay`, data)

export const CreateSubscription = data => post('/invoice/createSubscription', data)
export const createPortalSession = data => post('/invoice/createPortalSession', data)
export const CancelSubscription = data => post('/invoice/cancelSubscription', data)
