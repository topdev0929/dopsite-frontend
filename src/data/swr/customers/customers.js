import useSWR from 'swr'
import { post } from "../../../helpers/api_helper"

const NotificationCompanyAdminData = res => {
  const { data, error, mutate } = useSWR([`/customer/getCompany/${res.company_id}`, res.data], url =>
    post(url, res.data)
  )
  return {
    result: data,
    error,
    mutate
  }
}
export default NotificationCompanyAdminData