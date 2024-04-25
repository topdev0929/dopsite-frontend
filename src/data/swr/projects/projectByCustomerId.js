import useSWR from 'swr'
import { get } from "../../../helpers/api_helper"

const GetProject = res => {
  const { data, error, mutate } = useSWR(`/project/getProjects/${res.customer_id}`, get)
  return {
    result: data,
    error,
    mutate
  }
}
export default GetProject