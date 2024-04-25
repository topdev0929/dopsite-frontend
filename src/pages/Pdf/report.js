import React, { useState, useEffect, useRef } from 'react';
import MetaTags from 'react-meta-tags';
import { useParams } from 'react-router-dom'
import { PDFExport } from  '@progress/kendo-react-pdf'
import TrComponent from '../../components/Projects/TrMachines'
import moment from 'moment'
import { Row, Col, Select } from 'antd'
import {
  Table,
  Button
} from "reactstrap";
import * as ST from '../Reports/styles'
import { getS3Image, getS3ImagesWithSignature } from '../../data/report.js'
import { getReportHisotryById } from "../../store/actions.js";
import { useSelector, useDispatch } from "react-redux";

const { Option } = Select

const PrintReport = () => {
  const dispatch = useDispatch();
  const pdfExportComponent = useRef(null)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [signatureLogo, setSignatureLogo] = useState(null)
  const [layoutSelection, setLayoutSelection] =  useState("size-a4");
  const [currentUser, setCurrentUser] = useState()
  const [mashineInfo, setMashineInfo] = useState([])

  const { id } = useParams();
  const { report_history } = useSelector((state) => state.reports);

  useEffect(() => {
    if(id) {
      dispatch(getReportHisotryById(id));
    }
  }, [id])

  useEffect(() => {
    if(report_history) {
      const mashine_data = JSON.parse(report_history.mashine_info)
      setMashineInfo(mashine_data)
    }
  }, [report_history])

  console.log('marchine infor =>', mashineInfo)

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
    <>
      <MetaTags>
        <title>Print | DOP Test Network</title>
      </MetaTags>
      <ST.GeneratedWrapper>
        <Select defaultValue={layoutSelection} onChange={e => setLayoutSelection(e)} style={{ marginLeft: 'calc( 50% - 200px + 100px )', width: 200, marginTop: 30 }}>
          <Option value='size-a4'>A4</Option>
          <Option value='size-letter'>Letter</Option>
          <Option value='size-executive'>Execution</Option>
        </Select>
        <PDFExport  ref={pdfExportComponent}>
          <div className={ `pdf-page ${ layoutSelection }` }>
            <Row className='panelFirst' style={{ paddingBottom: 5, borderBottom: '3px solid' }}>
              <Col span={12}>
                <div style={{ minHeight: 70 }}>
                  <img src={image ? image : `https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${report_history?.company_logo}`} height='70' alt='' />
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
          
        <div className='d-print-none'  style={{ textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
          <Button onClick={handleExportWithComponent} className='newCustomer'> {!loading ? "Download PDF" : 'loading...'}</Button>
        </div>

      </ST.GeneratedWrapper>
    </>
  )
}

export default PrintReport;