import React from 'react'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

const TrComponent = ({ tableData, Role }) => {
  const history = useHistory();
  const goView = val => {
    history.push(`/reports/view/${val}`)
  }
  return (
    <tr>
      <td>
        {Role !== 9 && (
          <a href='#' onClick={() => goView(tableData?.project_id)}>{tableData?.ses_project_id}</a>
        )}
      </td>
      <td>{moment(tableData?.report_date).format('DD/MM/YYYY')}</td>
      <td>{tableData?.pass_num}</td>
      <td>{tableData?.fail_num}</td>
      <td>{tableData?.customer_name}</td>
      <td>{tableData?.reference_id}</td>
      <td>Closed</td>
      <td>
        {Role !== 9 && (
          <a href='#' onClick={() => goView(tableData?.project_id)}>View</a>
        )}
      </td>
    </tr>
  )
}

export default TrComponent
