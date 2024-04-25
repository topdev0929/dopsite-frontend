import React from 'react'
import { Select } from 'antd'
import { changeUserRole } from '../../data/comany'
import { openNotificationWithIcon } from '../Modal/notification'

const { Option } = Select
const TrComponent = ({ tableData, roleList, outUser, currentUser }) => {
  const userRoleChange = (val, id) => {
    changeUserRole({ id: id, role_id: val }).then(res => {
      openNotificationWithIcon('success', 'Note', 'Updated this user role successfully')
    })
  }

  const setStatus = user => {
    let txt
    if (user?.role_id !== 10) {
      txt = 'Active'
    } else {
    if (user?.verified) {
        txt = 'Disabled'
      } else if (user?.token) {
        txt = 'Invitation sent'
      } else {
        txt = 'Invitation expired'
      }
    }
    return (
      <span className={`statusBadge ${txt}`}>
        {txt}
      </span>
    )
  }
  return (
    <tr>
      <td>{tableData?.firstname} {tableData?.lastname}</td>
      <td>{tableData?.email}</td>
      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
        {setStatus(tableData)}
      </td>
      <td>
        {roleList && (
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            defaultValue={tableData?.role_id}
            onChange={val => userRoleChange(val, tableData?.id)}
            disabled={currentUser?.role_id !== 2 ? true : false}
          >
            {roleList.map(res => (
              res.id !== 1 && (
                <Option key={res.id} value={res.id}>{res.name}</Option>
              )
            ))}
          </Select>
        )}
      </td>
      <td>
        {currentUser?.role_id === 2 && (
          <a href='#' onClick={() => outUser(tableData?.id)}>Delete</a>
        )}
      </td>
    </tr>
  )
}

export default TrComponent
