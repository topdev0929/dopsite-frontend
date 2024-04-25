import useSWR from 'swr'
import { get } from "../../../helpers/api_helper"

const GetMachines = res => {
  const { data, error, mutate } = useSWR(`/machine/getAll/${res.project_id}`, get)
  return {
    result: data,
    error,
    mutate
  }
}
export default GetMachines