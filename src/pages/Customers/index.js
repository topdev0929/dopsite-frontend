import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import { useHistory } from 'react-router-dom'
import getCustomers from '../../data/swr/customers/customers.js'
import { useSelector } from "react-redux"
import { Pagination, Spin } from 'antd'

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TrComponent from '../../components/Customers/TrComponent'
import {
  Container,
  Table,
} from "reactstrap";
import * as ST from './styles'
import { ReactComponent as PlusIcon } from '../../assets/images/adminIcons/plusIcon.svg'
import { ReactComponent as NewCustomerIcon } from '../../assets/images/NewCustomer.svg'

const Customers = () => {
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const history = useHistory();
  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))
  const { result, mutate } = getCustomers({ company_id: currentUser?.company_id, data: { limit: limit, page: page } })
  const goNewCustomerPage = () => {
    history.push('/newCustomer')
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
          <title>Customers | DOP Test Network</title>
        </MetaTags>
        {currentUser?.role_id !== 10 && (
          <ST.Wrapper>
            <Container fluid>
              {/* Render Breadcrumbs */}
              <Breadcrumbs title="DOP" breadcrumbItem="Customers" />
              <div style={{ textAlign: 'right' }}>
                <div className='newCustomer' onClick={() => goNewCustomerPage()}>
                  <div>
                    <NewCustomerIcon />
                    <div>New Customer</div>
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
                        <th>Customer</th>
                        <th>City</th>
                        <th>Street</th>
                        <th>State</th>
                        <th>Zip</th>
                        <th>Email</th>
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
                current={page || 1}
                onShowSizeChange={onShowSizeChange}
                onChange={onShowSizeChange}
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

export default Customers;