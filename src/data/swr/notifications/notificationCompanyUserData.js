import useSWR from 'swr'
import { get } from "../../../helpers/api_helper"

const NotificationCompanyUserData = res => {
  const { data, error, mutate } = useSWR(`/notificationCompanyUserData/${res.id}`, get)
  return {
    result: data,
    error,
    mutate
  }
}
export default NotificationCompanyUserData