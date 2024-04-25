import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import { Spin } from 'antd'
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TrComponent from '../../components/Reports/TrComponent'
import {
  Container,
  Table
} from "reactstrap";
import * as ST from './styles'
import { getReportHistoriesByCompany } from "../../store/actions.js" 
import { useSelector, useDispatch } from "react-redux"

const Reports = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => ({currentUser: state.Login.user}))
  const { report_histories, loading } = useSelector(state => state.reports)
  useEffect(() => {
    if(currentUser?.company_id) {
      dispatch(getReportHistoriesByCompany(currentUser.company_id))
    }
  }, [currentUser])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Reports | DOP Test Network</title>
        </MetaTags>
        {currentUser?.role_id !== 10 && (
          <ST.Wrapper>
            <Container fluid>
              <Breadcrumbs title="DOP" breadcrumbItem="Reports" />
              {!loading ? (
                <div className="table-responsive">
                  <Table className="table table-striped mb-0">
                    <thead>
                      <tr>
                        <th>Project Number</th>
                        <th>Date</th>
                        <th>Pass</th>
                        <th>Fail</th>
                        <th>Customer</th>
                        <th>Reference #</th>
                        <th>Status</th>
                        <th>Report</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report_histories && report_histories.map((res, index) => (
                        <TrComponent key={index} tableData={res} Role={currentUser?.role_id} />
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

export default Reports