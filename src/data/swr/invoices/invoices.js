import useSWR from 'swr'
import { post } from "../../../helpers/api_helper"

const GetReports = res => {
  const { data, error, mutate } = useSWR([`/invoice/getAll/${res.company_id}`, res.data], url =>
    post(url, res.data)
  )
  return {
    result: data,
    error,
    mutate
  }
}
export default GetReports