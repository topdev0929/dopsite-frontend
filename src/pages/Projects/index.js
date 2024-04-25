import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import { useHistory } from 'react-router-dom'
import { useSelector } from "react-redux"
import { Pagination, Spin } from 'antd'

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TrComponent from '../../components/Projects/TrComponent'
import {
  Container,
  Table,
} from "reactstrap";
import * as ST from './styles'
import getProjects from '../../data/swr/projects/project.js'

import { ReactComponent as PlusIcon } from '../../assets/images/adminIcons/plusIcon.svg'
import { ReactComponent as NewProjectIcon } from '../../assets/images/NewProject.svg'
const Projects = () => {
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const history = useHistory()
  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))
  const { result, mutate } = getProjects({ company_id: currentUser?.company_id, data: { limit: limit, page: page } })
  const goNewProjectPage = () => {
    history.push('/newProject')
  }

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
          <title>Projects | DOP Test Network</title>
        </MetaTags>
        {currentUser?.role_id !== 10 && (
          <ST.Wrapper>
            <Container fluid>
              {/* Render Breadcrumbs */}
              <Breadcrumbs title="DOP" breadcrumbItem="Projects" />
              <div style={{ textAlign: 'right' }}>
                <div className='newProject' onClick={() => goNewProjectPage()}>
                  <div>
                    <NewProjectIcon />
                    <div>New Project</div>
                  </div>
                  <div className='plusIcon'>
                    <PlusIcon />
                  </div>
                </div>
              </div>
              {!loading ? (
                <div className="table-responsive">
                  <Table className="table table-striped mb-0">
                    <thead>
                      <tr>
                        <th>SES Project #</th>
                        <th>Creation Date</th>
                        <th>Completion Date</th>
                        <th>Customer</th>
                        <th>Reference #</th>
                        <th>Status</th>
                        <th>Report</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {result && result.lists.map((res, index) => (
                        <TrComponent key={index} tableData={res} mutate={mutate} Role={currentUser?.role_id} />
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