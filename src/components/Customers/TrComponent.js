import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Tooltip, Button } from 'antd'
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import * as ST from '../../pages/Settings/styles'
import { DeleteCustomer } from '../../data/customer'
import { openNotificationWithIcon } from '../../components/Modal/notification'

const TrComponent = ({ tableData, mutate, Role }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const history = useHistory();
  const goCustomerDetailPage = val => {
    history.push(`/customers/detail/${val}`)
  }
  const goEditCustomer = val => {
    history.push(`/customers/edit/${val}`)
  }
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const deleteCustomer = id => {
    if (Role !== 9 && Role !== 10 ) {
      DeleteCustomer({ id: id }).then(res => {
        openNotificationWithIcon('success', 'Note', 'Deleted successfully!')
        setIsModalVisible(false);
        mutate()
      }).catch(err => {
        openNotificationWithIcon('error', 'Note', 'Failed')
      })
    } else {
      setIsModalVisible(false);
      openNotificationWithIcon('error', 'Note', "You must be a part of a company before using this feature.")
    }
  }
  return (
    <>
      <tr>
        <td>
          <Link to={`/customers/detail/${tableData.id}`}>
            {tableData?.customer_name}
          </Link>
        </td>
        <td>{tableData?.city}</td>
        <td>{tableData?.street}</td>
        <td>{tableData?.state}</td>
        <td>{tableData?.zip}</td>
        <td>{tableData?.customer_email}</td>
        <td>
          <div>
            <Tooltip placement="top" title='Detail'>
              <EyeOutlined onClick={() => goCustomerDetailPage(tableData?.id)} />
            </Tooltip>
            <Tooltip placement="top" title='Edit'>
              <EditOutlined onClick={() => goEditCustomer(tableData?.id)} />
            </Tooltip>
            <Tooltip placement="top" title='Delete'>
              <DeleteOutlined onClick={() => setIsModalVisible(true)} />
            </Tooltip>
          </div>
        </td>
      </tr>
      <ST.StyleModal title="Users" visible={isModalVisible}  onCancel={handleCancel}>
        <p>
            <p style={{ textAlign: 'center' }}>Are you sure to delete this customer? <br />Will delete all data depend on this customer!</p>
            <div style={{ textAlign: 'center' }}>
              <Button htmlType="button" onClick={() => setIsModalVisible(false)}>
                Cancel
              </Button>
              <Button type="danger" onClick={() => deleteCustomer(tableData?.id)}>
                Delete
              </Button>
            </div>
        </p>
      </ST.StyleModal>
    </>
  )
}

export default TrComponent
