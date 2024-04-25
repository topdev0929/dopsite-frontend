import React, { useState, useEffect, useRef } from 'react';
import MetaTags from 'react-meta-tags';
import { useParams } from 'react-router-dom'
import { PDFExport } from  '@progress/kendo-react-pdf'

//import Breadcrumbs
import { getProject } from '../../data/project.js'
import { Button, Select, Row, Col } from 'antd'
import moment from 'moment'
import {
  Table
} from "reactstrap";
import * as ST from '../Invoices/styles'
import getMachines from '../../data/swr/machines/machines.js'
import { getCompanyInfo } from '../../data/comany'
import { getInvoiceNum } from '../../data/invoice.js'
import getInvoicesId from '../../data/swr/invoices/invoiceProjectId.js'
import { getS3Image } from '../../data/report.js'

const { Option } = Select
const PdfInvoice = () => {
  const pdfExportComponent = useRef(null)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [editData, setEditData] = useState()
  const [companyInfo, setCompanyInfo] = useState()
  const [discountStatus, setDiscountStatus] = useState(true)
  const [discountValue, setDiscountValue] = useState()
  const [invoiceId, setInvoiceId] = useState()
  const [layoutSelection, setLayoutSelection] =  useState("size-a4");
  const { id } = useParams();

  const { result } = getMachines({ project_id: id })
  const { result: invoiceResult } = getInvoicesId({ project_id: id })
  
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
        invoice_date: moment(invoiceResult?.invoice_date).format('MM/DD/YYYY'),
        city: res[0].city,
        state: res[0].state,
        street: res[0].street,
        zip: res[0].zip,
        discount: res[0].discount,
        terms: res[0].terms,
        extra_test_num: result?.length < 4 ? 0 : (result?.length - 4),
        invoice_id: invoiceResult?.invoice_id,
        company_id: res[0].company_id
      }
      setEditData(params)
      if (invoiceResult?.discount !== 'N/A') {
        setDiscountStatus(false)
        setDiscountValue(invoiceResult?.discount)
      } else {
        setDiscountStatus(true)
      }
    })
  }, [id, result, invoiceResult])
  
  useEffect(() => {
    getCompanyInfo({id: editData?.company_id}).then(res => {
      if (res) {
        setCompanyInfo(res[0])
      }
    })
  }, [editData])

  useEffect(() => {
    getInvoiceNum({id: editData?.company_id}).then(res => {
      setInvoiceId(Number(Number(res[0].num) + 1))
    })
  }, [editData])

  const handleExportWithComponent = async () => {
    setLoading(true);
    getS3Image({url: companyInfo.logo}).then(res => {
      if(res.success) {
        setImage(process.env.REACT_APP_SERVER_URL + `/uploads/${companyInfo.logo}`)
        pdfExportComponent.current.save();
        setLoading(false);
      }
    })
  }
  
  return (
    <>
      <MetaTags>
        <title>Project/Invoice | DOP Test Network</title>
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
                  <img src={image ? image : `https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${companyInfo?.logo}`} height='70' alt='' />
                </div>
              </Col>
              <Col span={12} style={{ fontSize: 9, display: 'flex', alignItems: 'flex-end' }}>
                ENVIRONMENTAL SOLUTIONS WITH A SENSIBLE APPROACH
              </Col>
            </Row>
            <div style={{ textAlign: 'center', margin: 10, fontWeight: '600' }}>
              DOP AEROSOL TEST CERTIFICATION INVOICE
            </div>
            <Row className='title' gutter={[8, 8]} style={{ fontSize: 12 }}>
              <Col span={12}>
                <Row gutter={[8, 8]}>
                  <Col span={10}>
                    Invoice Date:
                  </Col>
                  <Col span={14}>
                    <div style={{ borderBottom: '1px solid' }}>{ moment(editData?.invoice_date).format('MM/DD/YYYY')}</div>
                  </Col>
                </Row>
                <Row gutter={[8, 8]}>
                  <Col span={10}>
                    Invoice NO.:
                  </Col>
                  <Col span={14}>
                    <div style={{ borderBottom: '1px solid' }}>{companyInfo?.invoice_start_prefix ? companyInfo.invoice_start_prefix + '-' + editData?.invoice_id : editData?.invoice_id}</div>
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
              <Table className="table table-bordered">
                <thead>
                  <tr>
                    <th width='60%'>DESCRIPTION</th>
                    <th>QTY</th>
                    <th>RATE</th>
                    <th>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>EQUIPMENT TESTING-4 units</td>
                    <td>1</td>
                    <td>{invoiceResult?.initial_rate}</td>
                    <td>{invoiceResult?.initial_rate.toFixed(2)}</td>
                  </tr>
                  {editData?.extra_test_num !== 0 && (
                    <tr>
                      <td>Extra units tested</td>
                      <td>{editData?.extra_test_num}</td>
                      <td>{invoiceResult?.additional_rate}</td>
                      <td>{(editData?.extra_test_num * invoiceResult?.additional_rate).toFixed(2)}</td>
                    </tr>
                  )}
                  <tr>
                    <td className='colorNone'>'</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className='colorNone'>'</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className='colorNone'>'</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr className='grayTr'>
                    <td></td>
                    <td colSpan='2'>SUBTOTAL</td>
                    <td>{(invoiceResult?.initial_rate + editData?.extra_test_num * invoiceResult?.additional_rate).toFixed(2)}</td>
                  </tr>
                  {!discountStatus && (
                    <tr className='grayTr'>
                      <td></td>
                      <td colSpan='2'>DISCOUNT {discountValue ? `${discountValue}%` : ''}</td>
                      <td>{discountValue ? ((invoiceResult?.initial_rate + editData?.extra_test_num * invoiceResult?.additional_rate) * (discountValue / 100)).toFixed(2) : 0}</td>
                    </tr>
                  )}
                  <tr>
                    <td></td>
                    <td colSpan='2'>INVOICE TOTAL</td>
                    <td>
                      {!discountStatus && discountValue ? ((invoiceResult?.initial_rate + editData?.extra_test_num * invoiceResult?.additional_rate) - (invoiceResult?.initial_rate + editData?.extra_test_num * invoiceResult?.additional_rate) * (discountValue / 100)).toFixed(2) : (invoiceResult?.initial_rate + editData?.extra_test_num * invoiceResult?.additional_rate).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div style={{ textAlign: 'center', marginTop: 20, marginBottom: 20  }}>
                <span>{companyInfo?.street}, {companyInfo?.city}, {companyInfo?.state} {companyInfo?.zip}</span>
                <span style={{ marginLeft: 40 }}>{companyInfo?.phone}</span>
              </div>
            </div>
            <div style={{ position: 'absolute', width: 'calc(100% - 0.6in)', bottom: '0.4in' }}>
              <Row>
                <Col span={12}>
                  <div style={{ fontSize: 11, border: '1px solid', textAlign: 'center', padding: 5 }}>
                    <div style={{ marginBottom: 10 }}>Remit Payment to:</div>
                    <div>{companyInfo?.company_name}</div>
                    <div>{companyInfo?.street}</div>
                    <div>{companyInfo?.city}, {companyInfo?.state}</div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </PDFExport>
        <div style={{ textAlign: 'center' }}>
        <Button onClick={handleExportWithComponent}> {!loading ? "Download PDF" : 'loading...'}</Button>
        </div>
      </ST.GeneratedWrapper>
    </>
  )
}

export default PdfInvoice;