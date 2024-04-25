import useSWR from 'swr'
import { post } from "../../../helpers/api_helper"

const NotificationCompanyAdminData = res => {
  const { data, error, mutate } = useSWR(`/notificationCompanyAdminData/${res.company_id}/${res.id}`, post)
  return {
    result: data,
    error,
    mutate
  }
}
export default NotificationCompanyAdminData