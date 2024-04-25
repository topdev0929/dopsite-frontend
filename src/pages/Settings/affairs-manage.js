import React, { useEffect, useState } from 'react';
import MetaTags from 'react-meta-tags';
import { Button, Form, Input, Select, Table, Tooltip } from 'antd'
import { FormOutlined, SendOutlined, DeleteOutlined } from '@ant-design/icons'
import { getRoles } from '../../data/role'
import { openNotificationWithIcon } from '../../components/Modal/notification'

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  Container
} from "reactstrap";
import * as ST from './styles'
import { sendEmail, getUsersByCompanyId, changeUserProfile, DeleteUser } from '../../data/user'
import { getCompany } from '../../data/comany'

const { Option } = Select
const AffairsManage = () => {
  const [roleList, setLoleList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [sendEmailModal, setSendEmailModal] = useState(false)
  const [sendEmailButton, setSendEmailButton] = useState(false)
  

  const [companyData, setCompanyData] = useState(false);
  const [usersData, setUsersData] = useState();
  const [companyId, setCompanyId] = useState();
  const [loading, setLoading] = useState(false);
  const [editUserData, setEditUserData] = useState();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  useEffect(() => {
    getUsersByCompanyId({ company_id: companyId }).then(res => {
      if (res) {
        setUsersData(res)
      }
    })
  }, [companyId, pagination])

  useEffect(() => {
    getCompany().then(res => {
      if (res) {
        setCompanyData(res)
      }
    })
  }, [])

  
  const columns = [
    {
      title: 'Name',
      key: 'ID',
      render: data => {
        return <>{data.firstname} {data.lastname}</>
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      key: 'ID',
      render: data => {
        return (
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            value={data.role_id}
            // onChange={val => userRoleChange(val, tableData?.id)}
            disabled
          >
            {roleList && roleList.map(res => (
              <Option key={res.id} value={res.id}>{res.name}</Option>
            ))}
          </Select>
        )
      }
    },
    {
      title: 'Actions',
      key: 'created_at',
      render: data => {
        return (
          <>
            <Tooltip placement="top" title='Edit'>
              <FormOutlined onClick={() => openEditBox(data)} />
            </Tooltip>
            <Tooltip placement="top" title='Send Reset Password'>
              <SendOutlined onClick={() => openSendEmailModal(data)} style={{ marginLeft: 15 }} />
            </Tooltip>
            <Tooltip placement="top" title='Delete'>
              <DeleteOutlined onClick={() => openDeleteModal(data)} style={{ marginLeft: 15, color: 'tomato' }} />
            </Tooltip>
          </>
        )
      }
    }
  ]
  const [form] = Form.useForm()
  const validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  useEffect(() => {
    getRoles().then(res => {
      setLoleList(res)
    })
  }, [])

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleTableChange = (newPagination) => {
    setPagination(newPagination)
  };

  const onFinish = values => {
    changeUserProfile(values).then(res => {
      setIsModalVisible(false);
      getUsersByCompanyId({ company_id: companyId }).then(res => {
        if (res) {
          setUsersData(res)
        }
      })
      openNotificationWithIcon('success', 'Note', 'Saved successfully')
    }).catch(err => {
      openNotificationWithIcon('error', 'Note', 'Failed')
    })
  }

  const openEditBox = data => {
    // setEditUserData(data)
    form.setFieldsValue({ email: data.email, id: data.id })
    setIsModalVisible(true)
  }
  const openDeleteModal = data => {
    setEditUserData(data)
    setDeleteModal(true)
  }
  const deleteUser = () => {
    DeleteUser({ id: editUserData.id }).then(res => {
      setDeleteModal(false);
      getUsersByCompanyId({ company_id: companyId }).then(res => {
        if (res) {
          setUsersData(res)
        }
      })
      openNotificationWithIcon('success', 'Note', 'Deleted successfully')
    }).catch(err => {
      openNotificationWithIcon('error', 'Note', 'Failed')
    })
  }
  
  const openSendEmailModal = data => {
    setEditUserData(data)
    setSendEmailModal(true)
  }
  const sendEmailToUser = () => {
    setSendEmailButton(true)
    sendEmail({ email: editUserData.email }).then(res => {
      setSendEmailModal(false);
      openNotificationWithIcon('success', 'Note', 'Sent reset password email successfully')
      setSendEmailButton(false)
    }).catch(err => {
      openNotificationWithIcon('error', 'Note', 'Failed')
      setSendEmailButton(false)
    })
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Company | DOP Test Network</title>
        </MetaTags>
        <ST.Wrapper>
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="DOP" breadcrumbItem="User Management" />
            <Select
              className='antdSelect'
              showSearch
              placeholder='Search to Company'
              optionFilterProp="children"
              filterOption={(input, option) => option.children.includes(input)}
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              }
              onChange={val => setCompanyId(val)}
              style={{ width: '200px', marginBottom: 20 }}
            >
              {companyData && companyData.map(res => (
                <Option key={res.ID} value={res.ID}>{res.company_name || res.ID}</Option>
              ))}
            </Select>
            <Table
              columns={columns}
              dataSource={usersData}
              pagination={pagination}
              loading={loading}
              onChange={handleTableChange}
            />
          </Container>
          <ST.StyleModal title="Edit" visible={isModalVisible}  onCancel={handleCancel}>
            <p>
              <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
              >
                <Form.Item name="email" label="User Email"
                  rules={[
                    { required: true, message: 'This field is required' },
                    {
                      validator(_, value) {
                        if (value && !value.match(validRegex)) {
                          return Promise.reject('Invalid email address!')
                        }
                        return Promise.resolve()
                      }
                    }
                  ]}
                >
                  <Input style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                </Form.Item>
                <Form.Item name="id" style={{ height : 0 }}>
                  <Input hidden />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 5, span: 19 }} style={{ textAlign: 'left' }}>
                  <Button htmlType="button" onClick={() => setIsModalVisible(false)}>
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit" >
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </p>
          </ST.StyleModal>
          <ST.StyleModal title="Edit" visible={deleteModal}  onCancel={() => setDeleteModal(false)}>
            <h3 style={{ textAlign: 'center' }}>Are you sure to delete this user?</h3>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Button htmlType="button" onClick={() => setDeleteModal(false)}>
                Cancel
              </Button>
              <Button type="primary" danger onClick={() => deleteUser()} style={{ marginLeft: 20 }}>
                Delete
              </Button>
            </div>
          </ST.StyleModal>
          <ST.StyleModal title="Edit" visible={sendEmailModal}  onCancel={() => setSendEmailModal(false)}>
            <h3 style={{ textAlign: 'center' }}>Are you sure to send the reset password email to this user?</h3>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Button htmlType="button" onClick={() => setSendEmailModal(false)}>
                Cancel
              </Button>
              <Button type="primary" disabled={sendEmailButton} onClick={() => sendEmailToUser()} style={{ marginLeft: 20 }}>
                Send
              </Button>
            </div>
          </ST.StyleModal>
        </ST.Wrapper>
      </div>
    </React.Fragment>
  )
}

export default AffairsManage