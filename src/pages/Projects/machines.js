import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from "react-redux"

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TrComponent from '../../components/Projects/TrMachines'
// import PlusIcon from '../../assets/images/adminIcons/plusIcon.svg'
import { ReactComponent as PlusIcon } from '../../assets/images/adminIcons/plusIcon.svg'
import { getProject, updateProject } from '../../data/project.js'
import { Checkbox, Button as ButtonAntd } from 'antd'
import {
  Container,
  Table,
  Button
} from "reactstrap";
import * as ST from './styles'
import getMachines from '../../data/swr/machines/machines.js'
import { openNotificationWithIcon } from '../../components/Modal/notification'
import MachineIcon from '../../assets/images/machine-icon.png'
import {checkReportStatusById } from '../../data/report.js'


const Projects = () => {
  const history = useHistory()
  const [editData, setEditData] = useState()
  const [showPrintReport, setShowPrintReport] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { id } = useParams();
  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))
  const { result, mutate } = getMachines({ project_id: id })
  useEffect(() => {
    getProject({id: id}).then(res => {
      var params = {
        customer_email: res[0].customer_email,
        customer_name: res[0].customer_name,
        project_name: res[0].project_name,
        customer_id: res[0].customer_id,
        ses_project_id: res[0].ses_project_id,
        reference_id: res[0].reference_id,
        project_city: res[0].project_city,
        project_state: res[0].project_state,
        project_street: res[0].project_street,
        project_zip: res[0].project_zip,
        project_status: res[0].status,
        city: res[0].city,
        state: res[0].state,
        street: res[0].street,
        zip: res[0].zip
      }
      setEditData(params)
    })
  }, [id])

  useEffect(() => {
    checkReportStatusById({id: id}).then(res => {
      if(res.length > 0) {
        setShowPrintReport(false)
      } else {
        setShowPrintReport(true)
      }
    })
  }, [id])

  const goAddMachine = () => {
    if (editData?.project_status) {
      openNotificationWithIcon('error', 'Note', "Can't add. This project was closed.")
    } else {
      history.push(`/projects/addMachine/${id}`)
    }
  }
  const goMachine = () => {
    history.push('/projects')
  }

  const printReport = () => {
    history.push(`/reports/${id}`)
  }

  const viewReport = () => {
    history.push(`/reports/view/${id}`)
  }

  const printInvoice = () => {
    history.push(`/invoices/${id}`)
  }

  const viewInvoice = () => {
    history.push(`/invoices/view/${id}`)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const sendInvoiceAndReport = () => {
    if (editData?.project_status) {
      openNotificationWithIcon('error', 'Note', "Can't close. This project was closed.")
    } else {    
      history.push(`/invoices/${id}`)
    }
  }


  const printLabel = () => {
    history.push(`/projects/printDops/${id}`)
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Project/machines | DOP Test Network</title>
        </MetaTags>
        {currentUser?.role_id !== 10 && (
          <ST.MachinesWrapper>
            <Container fluid>
              {/* Render Breadcrumbs */}
              <Breadcrumbs title="DOP" breadcrumbItem="Project/Machines" />
              <div className='back d-print-none' onClick={() => goMachine()}>
                <i className='dripicons-arrow-thin-left'></i>
                <span>Back</span>
              </div>
              <div className='row panel'>
                <div className='col-md-3'>
                  <header>Customer</header>
                  <div>{editData?.customer_name}</div>
                  <div>{editData?.customer_email}</div>
                  <div>{editData?.street}</div>
                  <div>{editData?.city}, {editData?.state}, {editData?.zip}</div>
                </div>
                <div className='col-md-3'>
                  <header>Project</header>
                  <div>Project Name: <span>{editData?.project_name}</span></div>
                  <div>Project Number: <span>{editData?.ses_project_id}</span></div>
                  <div>Client Reference: <span>{editData?.reference_id}</span></div>
                </div>
                <div className='col-md-3'>
                  <div style={{ marginTop: 30 }}><span>{editData?.project_street}</span></div>
                  <div><span>{editData?.project_city}, {editData?.project_state}</span></div>
                  <div><span>{editData?.project_zip}</span></div>
                </div>
                <div className='col-md-3 d-print-none'>
                  <div onClick={() => goAddMachine()}>
                    <img src={MachineIcon} width={40} alt='' />
                    <div>Add Machine</div>
                  </div>
                  <div className='plusIcon'>
                    <PlusIcon />
                  </div>
                  <div>Machines: {result ? result.length : 0}</div>
                </div>
              </div>
              <div className="table-responsive">
                <header>Job Equipment Certificate Status</header>
                <Table className="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>Certificate #</th>
                      <th>Equipment Type</th>
                      <th>Make</th>
                      <th>Model</th>
                      <th>Serial #</th>
                      <th>Pass/Fail</th>
                      <th className='d-print-none'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {result && result.map((res, index) => (
                      <TrComponent key={index} tableData={res} mutate={mutate}  Role={currentUser?.role_id} status={editData?.project_status}  />
                    ))}
                  </tbody>
                </Table>
                {currentUser?.role_id !== 9 && (
                  <footer className='d-print-none'>
                    <Button onClick={() => printLabel()}>Print Certificates</Button>
                    {showPrintReport == true ? (
                     <Button disabled={!editData?.project_status} onClick={() => printReport()}>{ 'Print Report'}</Button>
                    ) : (
                     <Button disabled={!editData?.project_status} onClick={() => viewReport()}>{ 'View Report'}</Button>
                    )}

                    {editData?.project_status == 0 ? (
                     <Button disabled={!editData?.project_status} onClick={() =>printInvoice()}>{ 'Print Invoice'}</Button>
                    ) : (
                     <Button disabled={!editData?.project_status} onClick={() => viewInvoice()}>{ 'View Invoice'}</Button>
                    )}

                    { !editData?.project_status && (
                      <Button onClick={() => setIsModalVisible(true)}>Close Project</Button>
                    ) }
                  </footer>
                )}
              </div>
            </Container>
            <ST.StyleModal title="Users" visible={isModalVisible}  onCancel={handleCancel}>
              <header>Are you sure you want to close the project?</header>
              <nav>Once you close the project you will not be able to return to it to add more machines or print labels.</nav>
              <div>
                <ButtonAntd
                  type="primary"
                  danger
                  onClick={() => sendInvoiceAndReport()}
                >
                  Close Project
                </ButtonAntd>
              </div>
            </ST.StyleModal>
          </ST.MachinesWrapper>
        )}
      </div>
    </React.Fragment>
  )
}

export default Projects;