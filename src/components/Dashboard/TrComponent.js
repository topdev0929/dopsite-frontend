import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const TrComponent = ({ tableData }) => {
  return (
    <tr>
      <td>
        <Link to={`/projects/machines/${tableData.project_id}`}>
          {tableData?.project_name}
        </Link>
      </td>
      <td>
        <Link to={`/customers/detail/${tableData.customer_id}`}>
          {tableData?.customer_name}
        </Link>
      </td>
      <td>{tableData?.firstname} {tableData?.lastname}</td>
      <td>
        <Link to={`/projects/machines/${tableData.project_id}`}>
          {tableData?.ses_project_id}
        </Link>
      </td>
      <td>{tableData?.reference_id}</td>
      <td>{moment(tableData?.report_date).format('MM/DD/YYYY')}</td>
    </tr>
  )
}

export default TrComponent
