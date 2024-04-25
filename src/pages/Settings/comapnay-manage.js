import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import { useSelector } from "react-redux"
import { Table, Select, Button, Spin } from 'antd'
import { companyDelete, getCompany, companyApproveState, BackupDatabase } from '../../data/comany'
import { openNotificationWithIcon } from '../../components/Modal/notification'

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  Container
} from "reactstrap";
import * as ST from './styles'

const { Option } = Select
const Invoices = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteCompanyID, setDeleteCompanyID] = useState(false);
  const [companyData, setCompanyData] = useState(false);
  const [loading, setLoading] = useState(false)

  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))
  
  useEffect(() => {
    getCompany().then(res => {
      setCompanyData(res)
    })
  }, [isModalVisible])

  // useEffect(() => {
  //   backupDatabase()
  // }, [])
  
  const columns = [
    {
      title: 'New Company Applicant',
      key: 'ID',
      render: data => {
        return <>{data.firstname} {data.lastname}({data.email})</>
      }
    },
    {
      title: 'Company Name',
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: 'Status',
      key: 'ID',
      render: data => {
        return (
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            defaultValue={data.status}
            onChange={val => companyOnApproveState(val, data)}
          >
            <Option value={1}>Approve</Option>
            <Option value={0}>Reject</Option>
          </Select>
        )
      }
    },
    {
      title: 'CreatedAt',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: '',
      key: 'ID',
      render: data => {
        return (
          <a href='#' onClick={() => companyOnDelete(data)}>Delete</a>
        )
      }
    },
  ]
  const companyOnApproveState = (val, data) => {
    let status = false
    if (val === 1) status = true
    companyApproveState({ id: data.ID, status: status, site_admin_email: currentUser.email, site_admin_name: `${currentUser.firstname} ${currentUser.lastname}`, name: `${data.firstname} ${data.lastname}`, email: `${data.email}` }).then(res => {
      openNotificationWithIcon('success', 'Note', 'Changed successfully')
    }).catch(err => {
      openNotificationWithIcon('error', 'Note', 'Failed')
    })
  }
  const companyOnDelete = data => {
    setIsModalVisible(true)
    setDeleteCompanyID(data)
  }
  const deleteCompany = () => {
    companyDelete({ id: deleteCompanyID.ID, site_admin_email: currentUser.email, site_admin_name: `${currentUser.firstname} ${currentUser.lastname}`, name: `${deleteCompanyID.firstname} ${deleteCompanyID.lastname}`, email: `${deleteCompanyID.email}`}).then(res => {
      openNotificationWithIcon('success', 'Note', 'Deleted successfully')
      setIsModalVisible(false)
    }).catch(err => {
      openNotificationWithIcon('error', 'Note', 'Failed')
    })
  }

  const backupDatabase = () => {
    setLoading(true)
    BackupDatabase().then(res => {
      setLoading(false)
      const blob = new Blob([res], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "database.sql";
      link.href = url;
      link.click();
    })
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Company | DOP Test Network</title>
        </MetaTags>
        <ST.CompanyWrapper>
          <Container fluid>
            <Breadcrumbs title="DOP" breadcrumbItem="Company Admistration" />
            {loading ? (
              <div style={{ textAlign: 'center' }}>
                <Spin tip="Backup database..." />
              </div>
            ) : (
              <>
                <div>
                  <Button type="primary"  className='newCustomer' size='large' onClick={() => backupDatabase()}>Backup database</Button>
                </div>
                <Table dataSource={companyData} columns={columns} />
              </>
            )}
          </Container>
        </ST.CompanyWrapper>
      </div>
      <ST.StyleModal title="Users" visible={isModalVisible}  onCancel={() => setIsModalVisible(false)}>
        <div style={{ textAlign: 'center', marginBottom: 15 }}>
          <p>Are you sure delete this company?</p>
          <Button htmlType="button" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>
          <Button type="danger" htmlType="submit" onClick={() => deleteCompany()} style={{ marginLeft: 15 }}>
            Delete
          </Button>
        </div>
      </ST.StyleModal>
    </React.Fragment>
  )
}

export default Invoices