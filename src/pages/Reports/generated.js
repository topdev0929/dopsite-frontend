import React, { useState, useEffect, useRef } from 'react';
import MetaTags from 'react-meta-tags';
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from "react-redux"
import { PDFExport } from  '@progress/kendo-react-pdf'
import SuccessModal from '../../components/Modal/successModal'

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TrComponent from '../../components/Projects/TrMachines'
import { getProject } from '../../data/project.js'
import { SendReport, getUserById, getS3Image, getS3ImagesWithSignature, checkReportStatusById } from '../../data/report.js'
import moment from 'moment'
import { Row, Col, Select } from 'antd'
import {
  Container,
  Table,
  Button
} from "reactstrap";
import * as ST from './styles'
import getMachines from '../../data/swr/machines/machines.js'
import { getCompanyInfo } from '../../data/comany'

const { Option } = Select

const Reports = () => {
  const pdfExportComponent = useRef(null)
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [signatureLogo, setSignatureLogo] = useState(null)
  const [modal_center, setmodal_center] = useState(false);
  const [editData, setEditData] = useState()
  const [reportUser, setReportUser] = useState()
  const [companyInfo, setCompanyInfo] = useState()
  const [showSendReport, setShowSendReport] = useState(true)
  const [invoiceButtonLoading, setInvoiceButtonLoading] = useState()
  const [layoutSelection, setLayoutSelection] =  useState("size-a4");
  const { id } = useParams();
  const { currentUser } = useSelector(state => ({currentUser: state.Login.user}))

  useEffect(() => {
    getUserById({ id: currentUser?.sub }).then(res => {
      setReportUser(res[0])
    })
  }, [currentUser])

  const nowDate = new Date()
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
        project_id: id,
        report_date: moment(nowDate).format('MM/DD/YYYY'),
        city: res[0].city,
        state: res[0].state,
        street: res[0].street,
        zip: res[0].zip,
        tested_at: res[0].tested_at,
        reporter_user_id: currentUser?.sub,
        technician_name: currentUser?.firstname + ' ' + currentUser?.lastname
      }
      setEditData(params)
    })
  }, [id])

  useEffect(() => {
    checkReportStatusById({id: id}).then(res => {
      if(res.length > 0) {
        setShowSendReport(false)
      } else {
        setShowSendReport(true)
      }
    })
  }, [id])

  useEffect(() => {
    getCompanyInfo({id: currentUser?.company_id}).then(res => {
      if (res) {
        setCompanyInfo(res[0])
      }
    })
  }, [])

  const tog_center = () => {
    setmodal_center(!modal_center)
  }
  const goMachine = () => {
    history.push(`/projects/machines/${id}`)
  }
  const printInvoice = () => {
    window.print()
    // history.push(`/projects/printDops/${id}`)
  }

  const sendReport = () => {
    setInvoiceButtonLoading(true)
    const params = {
      editData: editData,
      companyInfo: companyInfo,
      tableData: result,
      userId: currentUser.sub,
      currentUser: currentUser
    }
    SendReport(params).then(res => {
      if (res) {
        setmodal_center(true)
        setInvoiceButtonLoading(false)
      }
    })
  }
  const handleExportWithComponent = async () => {
    setLoading(true);
    if(reportUser.signature_level == 0) {
      getS3ImagesWithSignature({logo: companyInfo.logo, signature: reportUser.signature_logo}).then(res => {
        if(res.success) {
          setImage(process.env.REACT_APP_SERVER_URL + `/uploads/${companyInfo.logo}`)
          setSignatureLogo(process.env.REACT_APP_SERVER_URL + `/uploads/${reportUser.signature_logo}`)
          pdfExportComponent.current.save();
          setLoading(false);
        }
      })
    } else {
      getS3Image({url: companyInfo.logo}).then(res => {
        if(res.success) {
          setImage(process.env.REACT_APP_SERVER_URL + `/uploads/${companyInfo.logo}`)
          pdfExportComponent.current.save();
          setLoading(false);
        }
      })
    }
  }
  
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Report | DOP Test Network</title>
        </MetaTags>
        {currentUser?.role_id !== 10 && (
          <ST.GeneratedWrapper>
            <Container fluid>
              <Breadcrumbs title="DOP" breadcrumbItem="Status: Report Generated" />
              <div className='back d-print-none' onClick={() => goMachine()}>
                <i className='dripicons-arrow-thin-left'></i>
                <span>Back</span>
              </div>
              <Select defaultValue={layoutSelection} onChange={e => setLayoutSelection(e)} style={{ marginLeft: 'calc( 50% - 200px )', width: 200 }}>
                <Option value='size-a4'>A4</Option>
                <Option value='size-letter'>Letter</Option>
                <Option value='size-executive'>Execution</Option>
              </Select>
              <PDFExport  ref={pdfExportComponent}>
                <div className={ `pdf-page ${ layoutSelection }` }>
                  <Row className='panelFirst'>
                    <Col span={12}>
                      <div style={{ minHeight: 70 }}>
                        <img src={image ? image : `https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${companyInfo?.logo}`} height='70' alt='' />
                      </div>
                    </Col>
                    <Col span={12} className='headerTitle'>
                      ENVIRONMENTAL SOLUTIONS WITH A SENSIBLE APPROACH
                    </Col>
                  </Row>
                  <div className='title'>
                    DOP AEROSOL TEST CERTIFICATION REPORT
                  </div>
                  <Row className='title' gutter={[8, 8]} style={{ fontSize: 12 }}>
                    <Col span={12}>
                      <Row gutter={[8, 8]}>
                        <Col span={10}>
                          Report Date:
                        </Col>
                        <Col span={14}>
                          <div style={{ borderBottom: '1px solid' }}>{moment().format('MM/DD/YYYY')}</div>
                        </Col>
                      </Row>
                      <Row gutter={[8, 8]}>
                        <Col span={10}>
                          Test Date:
                        </Col>
                        <Col span={14}>
                          <div style={{ borderBottom: '1px solid' }}>{moment(editData?.tested_at).format('MM/DD/YYYY')}</div>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={12}>
                      <Row gutter={[8, 8]}>
                        <Col span={10}>
                          SES Job No.:
                        </Col>
                        <Col span={14}>
                          <div style={{ borderBottom: '1px solid' }}>DOP-{editData?.ses_project_id}</div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className='panel' gutter={[8, 8]}>
                    <Col span={12}>
                      <section>
                        <div>Client:</div>
                        <div>{editData?.customer_name}</div>
                        <div>{editData?.street}</div>
                        <div>{editData?.city}, {editData?.state}</div>
                        <div>Phone: {editData?.phone}</div>
                        <div>Email: {editData?.customer_email}</div>
                        <div>Attention: {editData?.attention}</div>
                      </section>
                    </Col>
                    <Col span={12}>
                      <section>
                        <div>Project Information:</div>
                        <div>{editData?.project_name}</div>
                        <div>{editData?.project_street}</div>
                        <div>{editData?.project_city}, {editData?.project_state}</div>
                        <div>Client Reference No.: {editData?.reference_id}</div>
                      </section>
                    </Col>
                  </Row>
                  <div className="table-responsive">
                    <Table className="table table-striped table-bordered mb-0">
                      <thead>
                        <tr>
                          <th>Certificate #</th>
                          <th>Equipment Type</th>
                          <th>Make</th>
                          <th>Model</th>
                          <th>Serial #</th>
                          <th>Pass/Fail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result && result.map((res, index) => (
                          <TrComponent key={index} tableData={res} mutate={mutate}  Role={currentUser?.role_id}  />
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <div style={{ position: 'absolute', width: 'calc(100% - 0.6in)', bottom: '0.4in' }}>
                    <Row style={{ fontSize: 11 }}>
                      <Col span={12}>
                        <Row>
                          <Col span={10} style={{ textAlign: 'right', paddingRight: 20 }}>
                            Inspector Name:
                          </Col>
                          <Col span={14}>
                            <div style={{ borderBottom: '1px solid' }}>
                              {reportUser?.firstname} {reportUser?.lastname}
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={12}>
                        <Row>
                          <Col span={10} style={{ textAlign: 'right', paddingRight: 20 }}>
                            Signature:
                          </Col>
                          <Col span={14}>
                            <div style={{ borderBottom: '1px solid' }}>
                              {reportUser?.signature_level == 1 && (
                                <img src={reportUser?.signature} alt='' style={{ height: '20px' }} />
                              )}
                               {reportUser?.signature_level == 0 && (
                                <img src={signatureLogo ? signatureLogo : `https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${reportUser?.signature_logo}`} alt='' style={{ height: '20px' }} />
                              )}
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <div style={{ textAlign: 'center', padding: 7, marginBottom: 3, fontWeight: '600', borderBottom: '3px solid' }}>
                      Testing Performed in Accordance with ANSI/ASME N510-2007
                    </div>
                    <Row style={{ fontSize: 10 }}>
                      <Col span={12}>
                        <span>{companyInfo?.company_name}: {companyInfo?.street}, {companyInfo?.city}, {companyInfo?.state} {companyInfo?.zip}</span>
                      </Col>
                      <Col span={12} style={{ textAlign: 'right' }}>
                        <span>Phone: {companyInfo?.phone}</span>
                        <span style={{ marginLeft: 10 }}>Fax: {companyInfo?.phone}</span>
                      </Col>
                    </Row>
                  </div>
                </div>
              </PDFExport>
                
              <footer className='d-print-none'  style={{ textAlign: 'center', marginTop: 30 }}>
                {showSendReport == true && (
                  <Button disabled={invoiceButtonLoading} onClick={() => sendReport()}>Send Report</Button>
                )}
                <Button onClick={handleExportWithComponent}> {!loading ? "Download PDF" : 'loading...'}</Button>
              </footer>
            </Container>
            <SuccessModal
              title='Successfully!'
              content='You sent report to customer'
              modal_center={modal_center}
              setmodal_center={setmodal_center}
              tog_center={tog_center}
            />
          </ST.GeneratedWrapper>
        )}
      </div>
    </React.Fragment>
  )
}

export default Reports;