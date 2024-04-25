import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import { Pagination, Spin } from 'antd'
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TrNewComponent from '../../components/Invoices/TrNewComponent'
import {
  Container,
  Table
} from "reactstrap";
import * as ST from './styles'
import { getInvoiceHistoriesByCompany } from "../../store/actions.js" 
import { useSelector, useDispatch } from "react-redux"

const Invoices = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))
  const { allInvoiceHistories } = useSelector(state => state.invoices)
  
  useEffect(() => {
    if(currentUser?.company_id) {
      dispatch(getInvoiceHistoriesByCompany(currentUser.company_id))
    }
  }, [currentUser])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Invoices | DOP Test Network</title>
        </MetaTags>
        {currentUser?.role_id !== 10 && (
          <ST.Wrapper>
            <Container fluid>
              <Breadcrumbs title="DOP" breadcrumbItem="Invoices" />
              {!loading ? (
                <div className="table-responsive">
                  <Table className="table table-striped mb-0">
                    <thead>
                      <tr>
                        <th>Invoice #</th>
                        <th>Invoice Date</th>
                        <th>SES Project #</th>
                        <th>Customer</th>
                        <th>Reference #</th>
                        <th>Status</th>
                        <th>Re-Send</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allInvoiceHistories && allInvoiceHistories.map((res, index) => (
                        <TrNewComponent key={index} tableData={res}  />
                      ))}

                    </tbody>
                  </Table>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Spin tip="Loading..." />
                </div>
              )}
            
            </Container>
          </ST.Wrapper>
        )}
      </div>
    </React.Fragment>
  )
}

export default Invoices