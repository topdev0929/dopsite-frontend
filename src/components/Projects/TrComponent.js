import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Tooltip, Button } from 'antd'
import { FormOutlined, ToolOutlined, DeleteOutlined } from '@ant-design/icons'
import moment from 'moment'
import * as ST from '../../pages/Settings/styles'
import { DeleteProject } from '../../data/project'
import { openNotificationWithIcon } from '../../components/Modal/notification'

const TrComponent = ({ tableData, mutate, Role }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const history = useHistory();
  const goMachinesPage = val => {
    history.push(`/projects/machines/${val}`)
  }
  const goEditProject = val => {
    history.push(`/projects/edit/${val}`)
  }
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const deleteProject = id => {
    if (Role !== 9 && Role !== 10 ) {
      DeleteProject({ id: id }).then(res => {
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
  let date = moment(tableData?.completion_date).format('MM/DD/YYYY')
  if (date === 'Invalid date') {
    date = ''
  }
  return (
    <>
      <tr>
        <td>
          <Link to={`/projects/machines/${tableData.id}`}>
            {tableData?.ses_project_id}
          </Link>
        </td>
        <td>{moment(tableData?.created_at).format('MM/DD/YYYY')}</td>
        <td>{date}</td>
        <td>{tableData?.customer_name}</td>
        <td>{tableData?.reference_id}</td>
        {!tableData?.status ? (
          <td className='greenBg'>Open</td>
        ): <td>Closed</td>}
        <td>{tableData?.report}</td>
        <td>
          <div>
            <Tooltip placement="top" title='Machines'>
              <ToolOutlined onClick={() => goMachinesPage(tableData?.id)} />
            </Tooltip>
            <Tooltip placement="top" title='Edit'>
              <FormOutlined onClick={() => goEditProject(tableData?.id)} />
            </Tooltip>
            <Tooltip placement="top" title='Delete'>
              <DeleteOutlined onClick={() => setIsModalVisible(true)} />
            </Tooltip>
          </div>
        </td>
      </tr>
      <ST.StyleModal title="Users" visible={isModalVisible}  onCancel={handleCancel}>
        <p>
            <p style={{ textAlign: 'center' }}>Are you sure to delete this project? Will delete all data in this project!</p>
            <div style={{ textAlign: 'center' }}>
              <Button htmlType="button" onClick={() => setIsModalVisible(false)}>
                Cancel
              </Button>
              <Button type="danger" onClick={() => deleteProject(tableData?.id)}>
                Delete
              </Button>
            </div>
        </p>
      </ST.StyleModal>
    </>
  )
}

export default TrComponent
