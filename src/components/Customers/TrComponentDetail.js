import React from 'react'
import moment from 'moment';
import { Link } from "react-router-dom"

const TrComponent = ({ tableData, companyUsers }) => {
  const user = companyUsers?.find(res => res.id === tableData.creator)
  return (
    <tr>
      {tableData && (
        <>
          <td>
            <Link to={`/projects/machines/${tableData.id}`}>
              {tableData.project_name}
            </Link>
          </td>
          <td>{user?.firstname} {user?.lastname}</td>
          <td>{tableData.project_technician}</td>
          <td>
            <Link to={`/projects/machines/${tableData.id}`}>
              {tableData.ses_project_id}
            </Link>
          </td>
          <td>{tableData.reference_id}</td>
          <td>{moment(tableData.createdAt).format('MM/DD/YYYY')}</td>
          <td>
            <Link to={`/invoices/view/${tableData.id}`}>
              {tableData.invoice_id}
            </Link>
          </td>
        </>
      )}
    </tr>
  )
}

export default TrComponent
