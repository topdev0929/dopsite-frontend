import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Tooltip, Button } from 'antd'
import { FormOutlined, DeleteOutlined, PrinterOutlined } from '@ant-design/icons'
import * as ST from '../../pages/Settings/styles'
import { DeleteMachine } from '../../data/project'
import { openNotificationWithIcon } from '../../components/Modal/notification'

const TrComponent = ({ tableData, mutate, Role, status }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const history = useHistory();
  const goEditMachine = val => {
    if (status) {
      openNotificationWithIcon('error', 'Note', "Can't edit. This project was closed.")
    } else {
      history.push(`/projects/machines/edit/${val}`)
    }
  }
  const goPrintPage = val => {
    history.push(`/projects/print/${val}`)
  }
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const deleteMachine = id => {
    if (status) {
      openNotificationWithIcon('error', 'Note', "Can't delete. This project was closed.")
    } else {
      if (Role !== 9 && Role !== 10 ) {
        DeleteMachine({ id: id }).then(res => {
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
  }
  return (
    <>
      <tr>
        <td>{tableData?.certificate_id}</td>
        <td>{tableData?.equipment_type}</td>
        <td>{tableData?.make}</td>
        <td>{tableData?.model}</td>
        <td>{tableData?.serial_id}</td>
        <td>
          {tableData?.equipment_test ? <>Pass</> : <>Fail</>}
        </td>
        <td className='d-print-none'>
          {Role !== 9 && (
            <div>
              <Tooltip placement="top" title='Edit'>
                <FormOutlined onClick={() => goEditMachine(tableData?.id)} />
              </Tooltip>
              <Tooltip placement="top" title='Print Certificate'>
                <PrinterOutlined onClick={() => goPrintPage(tableData?.id)} />
              </Tooltip>
              <Tooltip placement="top" title='Delete'>
                <DeleteOutlined onClick={() => setIsModalVisible(true)} />
              </Tooltip>
            </div>
          )}
        </td>
      </tr>
      <ST.StyleModal title="Users" visible={isModalVisible}  onCancel={handleCancel}>
        <p>
            <p style={{ textAlign: 'center' }}>Are you sure to delete this machine?</p>
            <div style={{ textAlign: 'center' }}>
              <Button htmlType="button" onClick={() => setIsModalVisible(false)}>
                Cancel
              </Button>
              <Button type="danger" onClick={() => deleteMachine(tableData?.id)}>
                Delete
              </Button>
            </div>
        </p>
      </ST.StyleModal>
    </>
  )
}

export default TrComponent
