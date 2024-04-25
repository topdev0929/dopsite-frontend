import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import { useHistory } from 'react-router-dom'
import { useSelector } from "react-redux"
import { Pagination, Spin } from 'antd'

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TrComponent from '../../components/Dashboard/TrComponent'
import { ReactComponent as PlusIcon } from '../../assets/images/adminIcons/plusIcon.svg'
import {
  Container,
  Table
} from "reactstrap";
import * as ST from './styles'
import getReports from '../../data/swr/reports/reportsDashboard'
import { ReactComponent as NewProjectIcon } from '../../assets/images/NewProject.svg'
import { ReactComponent as NewCustomerIcon } from '../../assets/images/NewCustomer.svg'
import { ReactComponent as ProjectsIcon } from '../../assets/images/Projects.svg'
import { ReactComponent as InvoicesIcon } from '../../assets/images/Invoices.svg'
import { ReactComponent as ReportsIcon } from '../../assets/images/Reports.svg'
import { ReactComponent as CustomersIcon } from '../../assets/images/Customers.svg'

const Projects = () => {
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const history = useHistory();
  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))

  const { result, mutate } = getReports({ company_id: currentUser?.company_id, data: { limit: limit, page: page } })

  useEffect(() => {
    if (result) {
      setLoading(false)
    }
  }, [result])
  const onShowSizeChange = (page, limit) => {
    setLoading(true)
    setLimit(limit)
    setPage(page)
  }
  const showTotal = (total) => `Total ${total} items`;
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard | DOP Test Network</title>
        </MetaTags>
        {currentUser?.role_id !== 10 && (
          <ST.Wrapper>
            <Container fluid>
              {/* Render Breadcrumbs */}
              <Breadcrumbs title="DOP" breadcrumbItem="Dashboard" />
              <div className='btnLinkGroup'>
                <div className='row'>
                  <div className='col-md-2' onClick={() => history.push('/newProject')}>
                    <div>
                      <NewProjectIcon />
                      <div>New Project</div>
                    </div>
                    <div className='plusIcon'>
                      <PlusIcon />
                    </div>
                  </div>
                  <div className='col-md-2' onClick={() => history.push('/newCustomer')}>
                    <div>
                      <NewCustomerIcon />
                      <div>New Customer</div>
                    </div>
                    <div className='plusIcon'>
                      <PlusIcon />
                    </div>
                  </div>
                  <div className='col-md-2' onClick={() => history.push('/projects')}>
                    <div>
                      <ProjectsIcon />
                      <div>Projects</div>
                    </div>
                  </div>
                  <div className='col-md-2' onClick={() => history.push('/invoices')}>
                    <div>
                      <InvoicesIcon />
                      <div>Invoices</div>
                    </div>
                  </div>
                  <div className='col-md-2' onClick={() => history.push('/reports')}>
                    <div>
                      <ReportsIcon />
                      <div>Reports</div>
                    </div>
                  </div>
                  <div className='col-md-2' onClick={() => history.push('/customers')}>
                    <div>
                      <CustomersIcon />
                      <div>Customers</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='tableTitle'>
                Recently Completed Projects
              </div>
              {!loading ? (
                <div className="table-responsive">
                  <Table className="table table-striped mb-0">
                    <thead>
                      <tr>
                        <th>Project Name</th>
                        <th>Client</th>
                        <th>Technician</th>
                        <th>Project #</th>
                        <th>Client Project #</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result && result.lists.map((res, index) => (
                        <TrComponent key={index} tableData={res}  />
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Spin tip="Loading..." />
                </div>
              )}
              <Pagination
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                onChange={onShowSizeChange}
                current={page || 1}
                total={result?.total_count}
                showTotal={showTotal}
                pageSizeOptions={[10, 20, 30, 40, 50]}
                style={{ marginTop: 30 }}
              />
            </Container>
          </ST.Wrapper>
        )}
      </div>
    </React.Fragment>
  )
}

export default Projects;