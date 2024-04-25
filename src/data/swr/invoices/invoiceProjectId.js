import useSWR from 'swr'
import { get } from "../../../helpers/api_helper"

const GetInvoices = res => {
  const { data, error, mutate } = useSWR(`/invoice/getByProject/${res.project_id}`, get)
  return {
    result: data,
    error,
    mutate
  }
}
export default GetInvoices