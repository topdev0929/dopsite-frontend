import useSWR from 'swr'
import { get } from "../../../helpers/api_helper"

const NotificationCompanyAdminData = res => {
  const { data, error, mutate } = useSWR(`/customer/getCompany/${res.company_id}`, get)
  return {
    result: data,
    error,
    mutate
  }
}
export default NotificationCompanyAdminData