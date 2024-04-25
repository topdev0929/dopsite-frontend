import { post } from "../helpers/api_helper"

export const SendReport = data => post('/report/sendReport', data)
export const getReportByUser = data => post('/report/getReportByUser', data)
export const getUserById = data => post('/report/getUserById', data)
export const getS3Image = data => post('/report/getS3Image', data)
export const getS3ImagesWithSignature = data => post('/report/getS3ImagesWithSignature', data)
export const deleteImage = data => post('/delete', data)
export const checkReportStatusById = data => post('/report/checkReportStatusById', data)

