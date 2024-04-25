import { del, get, post } from "../helpers/api_helper"

export const createCustomer = data => post('/customer/create', data)
export const getCustomer = data => get(`/customer/get/${data.id}/${data.company_id}`)
export const updateCoustomer = data => post(`/customer/update/${data.id}`, data)
export const DeleteCustomer = data => del(`/customer/remove/${data.id}`)