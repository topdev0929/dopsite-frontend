import { del, get, post, put } from "../helpers/api_helper"

export const getRoles = () => get('/role/get')
export const addUserToCompany = data => post('/auth/addUserToCompany', data)