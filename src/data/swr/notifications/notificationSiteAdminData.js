import useSWR from 'swr'
import { get } from "../../../helpers/api_helper"

const NotificationSiteAdminData = () => {
  const { data, error, mutate } = useSWR('/notificationSiteAdminData', get)
  return {
    result: data,
    error,
    mutate
  }
}
export default NotificationSiteAdminData