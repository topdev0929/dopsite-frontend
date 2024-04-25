import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from "react-redux"

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TrComponent from '../../components/Customers/TrComponentDetail'
import {
  Container,
  Table,
  Button
} from "reactstrap";
import * as ST from './styles'
import getProject from '../../data/swr/projects/projectByCustomerId'
import { getCustomer } from '../../data/customer'
import { getUsersByCompanyId } from '../../data/user'

const Projects = () => {
  const [customerData, setCustomerData] = useState()
  const [companyUsers, setCompanyUsers] = useState()
  const history = useHistory()
  const { id } = useParams();
  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))
  const { result } = getProject({ customer_id: id })
  useEffect(() => {
    getCustomer({id: id, company_id: currentUser?.company_id}).then(res => {
      setCustomerData(res[0])
    })
  }, [])
  useEffect(() => {
    getUsersByCompanyId({ company_id: currentUser?.company_id }).then(res => {
      setCompanyUsers(res)
    })
  }, [currentUser])
  const goEditCustomer = val => {
    history.push(`/customers/edit/${id}`)
  }
  const goBack = () => {
    history.push('/customers')
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Customer/Detail | DOP Test Network</title>
        </MetaTags>
        {currentUser?.role_id !== 10 && (
          <ST.DetailWrapper>
            <Container fluid>
              {/* Render Breadcrumbs */}
              <Breadcrumbs title="DOP" breadcrumbItem="Customer/Detail" />
              <header className='back d-print-none' onClick={() => goBack()}>
                <i className='dripicons-arrow-thin-left'></i>
                <span>Back</span>
              </header>
              <div className='row panel'>
                <div className='col-md-3'>
                  <header>Customer</header>
                  <div>Email Adderss:</div>
                  <nav>{customerData?.customer_email}</nav>
                  <div>Terms:</div>
                  <nav>{customerData?.terms}</nav>
                </div>
                <div className='col-md-3'>
                  <div style={{ marginTop: 20 }}>Billing Address</div>
                  <nav>{customerData?.street}</nav>
                  <nav>{customerData?.state}, {customerData?.city}</nav>
                  <nav>{customerData?.zip}</nav>
                </div>
                <div className='col-md-6'>
                  <Button onClick={() => goEditCustomer()}>Edit Customer</Button>
                </div>
              </div>
              <div className="table-responsive">
                <header>Project History</header>
                <Table className="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>Requested By</th>
                      <th>Technician</th>
                      <th>Project #</th>
                      <th>Client Project #</th>
                      <th>Date</th>
                      <th>Invoice #</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result && result.map((res, index) => (
                      <TrComponent key={index} tableData={res} companyUsers={companyUsers} />
                    ))}
                  </tbody>
                </Table>
              </div>
            </Container>
          </ST.DetailWrapper>
        )}
      </div>
    </React.Fragment>
  )
}

export default Projects;