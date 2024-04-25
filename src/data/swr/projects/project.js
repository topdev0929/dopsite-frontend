import useSWR from 'swr'
import { post } from "../../../helpers/api_helper"

const GetProject = res => {
  const { data, error, mutate } = useSWR([`/project/getProject/${res.company_id}`, res.data], url =>
    post(url, res.data)
  )
  return {
    result: data,
    error,
    mutate
  }
}
export default GetProject