import React, { useState, useEffect, useRef } from 'react';
import MetaTags from 'react-meta-tags';
import { useHistory, useParams } from 'react-router-dom'
import { Row, Col, Select, Image } from 'antd'
import { PDFExport } from  '@progress/kendo-react-pdf'
import SuccessModal from '../../components/Modal/successModal'
//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TrComponent from '../../components/Projects/TrMachines'
import { SendReport, getS3Image, getS3ImagesWithSignature } from '../../data/report.js'
import moment from 'moment'
import {
  Container,
  Table,
  Button
} from "reactstrap";
import * as ST from './styles'
import AWS from 'aws-sdk'
import { getReportHisotryByProject } from "../../store/actions.js";
import { useSelector, useDispatch } from "react-redux";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
})
// const myBucket = new AWS.S3({
//   params: { Bucket: process.env.REACT_APP_BUCKET_NAME},
//   region: process.env.REACT_APP_REGION
// })

const { Option } = Select
const Projects = () => {
  const dispatch = useDispatch();
  const pdfExportComponent = useRef(null)
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [signatureLogo, setSignatureLogo] = useState(null)
  const [modal_center, setmodal_center] = useState(false);
  const [mashineInfo, setMashineInfo] = useState([])
  const [invoiceButtonLoading, setInvoiceButtonLoading] = useState()
  const [layoutSelection, setLayoutSelection] =  useState("size-a4");
  const { id } = useParams();
  const { currentUser } = useSelector(state => ({currentUser: state.Login.user}))
  const { report_history } = useSelector((state) => state.reports);

  useEffect(() => {
    if(id) {
      dispatch(getReportHisotryByProject(id));
    }
  }, [id])

  useEffect(() => {
    if(report_history) {
      const mashine_data = JSON.parse(report_history.mashine_info)
      setMashineInfo(mashine_data)
    }
  }, [report_history])

  const tog_center = () => {
    setmodal_center(!modal_center)
  }

  const goMachine = () => {
    history.push(`/reports`)
  }

  const resendReport = () => {
    setInvoiceButtonLoading(true)
    const params = {
      resend: true,
      customer_email: report_history.customer_email,
      project_id: report_history.project_id,
      userId: report_history.create_user_id,
      copy_reports_user: report_history.company_copy_reports_user
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
    if(report_history.inspector_signature_level == false) {
      getS3ImagesWithSignature({logo: report_history?.company_logo, signature: report_history?.inspector_signature_logo}).then(res => {
        if(res.success) {
          setImage(process.env.REACT_APP_SERVER_URL + `/uploads/${report_history.company_logo}`)
          setSignatureLogo(process.env.REACT_APP_SERVER_URL + `/uploads/${report_history.inspector_signature_logo}`)
          pdfExportComponent.current.save();
          setLoading(false);
        }
      })
    } else {
      getS3Image({url: report_history?.company_logo}).then(res => {
        if(res.success) {
          setImage(process.env.REACT_APP_SERVER_URL + `/uploads/${report_history.company_logo}`)
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
                  <Row className='panelFirst' style={{ paddingBottom: 5, borderBottom: '3px solid' }}>
                    <Col span={12}>
                      <div style={{ minHeight: 70 }}>
                        <Image height={70} src={image ? image :`https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${report_history?.company_logo}`} />
                      </div>
                    </Col>
                    <Col span={12} style={{ fontSize: 9, display: 'flex', alignItems: 'flex-end' }}>
                      ENVIRONMENTAL SOLUTIONS WITH A SENSIBLE APPROACH
                    </Col>
                  </Row>
                  <div style={{ textAlign: 'center', margin: 10, fontWeight: '600' }}>
                    DOP AEROSOL TEST CERTIFICATION REPORT
                  </div>
                  <Row className='title' gutter={[8, 8]} style={{ fontSize: 12 }}>
                    <Col span={12}>
                      <Row gutter={[8, 8]}>
                        <Col span={10}>
                          Report Date:
                        </Col>
                        <Col span={14}>
                          <div style={{ borderBottom: '1px solid' }}>{moment(report_history?.report_date).format('MM/DD/YYYY')}</div>
                        </Col>
                      </Row>
                      <Row gutter={[8, 8]}>
                        <Col span={10}>
                          Test Date:
                        </Col>
                        <Col span={14}>
                          <div style={{ borderBottom: '1px solid' }}>{moment(report_history?.tested_at).format('MM/DD/YYYY')}</div>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={12}>
                      <Row gutter={[8, 8]}>
                        <Col span={10}>
                          SES Job No.:
                        </Col>
                        <Col span={14}>
                          <div style={{ borderBottom: '1px solid' }}>DOP-{report_history?.ses_project_id}</div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className='panel' gutter={[8, 8]}>
                    <Col span={12}>
                      <section>
                        <div>Client:</div>
                        <div>{report_history?.customer_name}</div>
                        <div>{report_history?.street}</div>
                        <div>{report_history?.city}, {report_history?.state}</div>
                        <div>Phone: {report_history?.phone}</div>
                        <div>Email: {report_history?.customer_email}</div>
                        <div>Attention: {report_history?.attention}</div>
                      </section>
                    </Col>
                    <Col span={12}>
                      <section>
                        <div>Project Information:</div>
                        <div>{report_history?.project_name}</div>
                        <div>{report_history?.project_street}</div>
                        <div>{report_history?.project_city}, {report_history?.project_state}</div>
                        <div>Client Reference No.: {report_history?.reference_id}</div>
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
                        {mashineInfo && mashineInfo.map((res, index) => (
                          <TrComponent key={index} tableData={res} Role={currentUser?.role_id}  />
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
                              {report_history?.technician_name}
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
                              {report_history?.inspector_signature_level == true && (
                                <img src={report_history?.inspector_signature} alt='' style={{ height: '20px' }} />
                              )}
                               {report_history?.inspector_signature_level == false && (
                                <img src={signatureLogo ? signatureLogo : `https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${report_history?.inspector_signature_logo}`} alt='' style={{ height: '20px' }} />
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
                        <span>{report_history?.company_name}: {report_history?.company_street}, {report_history?.company_city}, {report_history?.company_state} {report_history?.company_zip}</span>
                      </Col>
                      <Col span={12} style={{ textAlign: 'right' }}>
                        <span>Phone: {report_history?.company_phone}</span>
                        <span style={{ marginLeft: 10 }}>Fax: {report_history?.company_phone}</span>
                      </Col>
                    </Row>
                  </div>
                </div>
              </PDFExport>

              <footer className='d-print-none'  style={{ textAlign: 'center', marginTop: 30 }}>
                  <Button disabled={invoiceButtonLoading} onClick={() => resendReport()}>Resend Report</Button>
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

export default Projects;