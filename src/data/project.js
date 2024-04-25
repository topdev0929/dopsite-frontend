import { del, get, post } from "../helpers/api_helper"

export const createProject = data => post('/project/create', data)
export const getProject = data => get(`/project/get/${data.id}`)
export const updateProject = data => post(`/project/update/${data.id}`, data)
export const DeleteProject = data => del(`/project/remove/${data.id}`)

export const CreateMachine = data => post(`/machine/create`, data)
export const getMachine = data => get(`/machine/get/${data.id}`)
export const getMachinesNum  = data => get(`/machine/getDopCertificateNum/${data.id}`)
export const EditMachine = data => post(`/machine/update/${data.id}`, data)
export const DeleteMachine = data => del(`/machine/remove/${data.id}`)

export const getDopInfo = data => get(`/machine/getDop/${data.id}`)
export const getDopsInfo = data => get(`/machine/getDops/${data.project_id}`)