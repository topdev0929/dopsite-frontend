import React from 'react'
import moment from 'moment'
import { useHistory, Link } from 'react-router-dom'

const TrNewComponent = ({ tableData }) => {
  const history = useHistory();
  const goView = val => {
    history.push(`/invoices/view/${val}`)
  }
  return (
    <tr>
      <td>
        <Link to={`/invoices/view/${tableData.project_id}`}>
          {tableData?.invoice_id}
        </Link>
      </td>
      <td>{moment(tableData?.invoice_date).format('MM/DD/YYYY')}</td>
      <td>{tableData?.ses_project_id}</td>
      <td>{tableData?.customer_name}</td>
      <td>{tableData?.reference_id}</td>
      {tableData?.status ? (
        <td className='greenBg'>Paid</td>
      ): <td>Billed</td>}
      <td>
        {!tableData?.status ? (
          <a href='#' onClick={() => goView(tableData?.project_id)}>Send</a>
        ) : (
          <a href='#' style={{ color: 'green !important' }} onClick={() => goView(tableData?.project_id)}>View</a>
        )}
      </td>
    </tr>
  )
}

export default TrNewComponent
