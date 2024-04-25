import React, { useState, useEffect, useRef } from 'react';
import MetaTags from 'react-meta-tags';
import { useParams } from 'react-router-dom'
import { PDFExport } from  '@progress/kendo-react-pdf'
import { Button, Select, Row, Col } from 'antd'
import {Table} from "reactstrap";
import * as ST from '../Invoices/styles.js'
import { getS3Image } from '../../data/report.js'
import { getInvoiceHisotryById } from "../../store/actions.js"
import { useSelector, useDispatch } from "react-redux"
import moment from 'moment'

const { Option } = Select
const PdfInvoice = () => {
  const dispatch = useDispatch()
  const { invoiceHisotry } = useSelector(state => state.invoices)
  const pdfExportComponent = useRef(null)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [discountStatus, setDiscountStatus] = useState(true)
  const [discountValue, setDiscountValue] = useState()
  const [layoutSelection, setLayoutSelection] =  useState("size-a4");
  const { id } = useParams();

  useEffect(() => {
    dispatch(getInvoiceHisotryById(id))
  }, [id])

  useEffect(() => {
    if (invoiceHisotry?.discount !== 'N/A') {
      setDiscountStatus(false)
      setDiscountValue(invoiceHisotry?.discount)
    } else {
      setDiscountStatus(true)
    }
  }, [invoiceHisotry])

  const handleExportWithComponent = async () => {
    setLoading(true);
    getS3Image({url: invoiceHisotry.company_logo}).then(res => {
      if(res.success) {
        setImage(process.env.REACT_APP_SERVER_URL + `/uploads/${invoiceHisotry?.company_logo}`)
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
        {invoiceHisotry && (
          <>
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
                  <img src={image ? image : `https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${invoiceHisotry?.company_logo}`} height='70' alt='' />
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
                    <div style={{ borderBottom: '1px solid' }}>{ moment(invoiceHisotry?.invoice_date).format('MM/DD/YYYY')}</div>
                  </Col>
                </Row>
                <Row gutter={[8, 8]}>
                  <Col span={10}>
                    Invoice NO.:
                  </Col>
                  <Col span={14}>
                    <div style={{ borderBottom: '1px solid' }}>{invoiceHisotry?.company_invoice_start_prefix ? invoiceHisotry.company_invoice_start_prefix + '-' + invoiceHisotry?.invoice_id : invoiceHisotry?.invoice_id}</div>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row gutter={[8, 8]}>
                  <Col span={10}>
                    SES Job No.:
                  </Col>
                  <Col span={14}>
                    <div style={{ borderBottom: '1px solid' }}>DOP-{invoiceHisotry?.ses_project_id}</div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='panel' gutter={[8, 8]}>
              <Col span={12}>
                <section>
                  <div>Client:</div>
                  <div>{invoiceHisotry?.customer_name}</div>
                  <div>{invoiceHisotry?.street}</div>
                  <div>{invoiceHisotry?.city}, {invoiceHisotry?.state}</div>
                  <div>Phone: {invoiceHisotry?.phone}</div>
                  <div>Email: {invoiceHisotry?.customer_email}</div>
                  <div>Attention: {invoiceHisotry?.attention}</div>
                </section>
              </Col>
              <Col span={12}>
                <section>
                  <div>Project Information:</div>
                  <div>{invoiceHisotry?.project_name}</div>
                  <div>{invoiceHisotry?.project_street}</div>
                  <div>{invoiceHisotry?.project_city}, {invoiceHisotry?.project_state}</div>
                  <div>Client Reference No.: {invoiceHisotry?.reference_id}</div>
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
                    <td>{invoiceHisotry?.company_initial_rate}</td>
                    <td>{invoiceHisotry?.company_initial_rate.toFixed(2)}</td>
                  </tr>
                  {invoiceHisotry?.extra_test_num !== 0 && (
                    <tr>
                      <td>Extra units tested</td>
                      <td>{invoiceHisotry?.extra_test_num}</td>
                      <td>{invoiceHisotry?.company_additional_rate}</td>
                      <td>{(invoiceHisotry?.extra_test_num * invoiceHisotry?.company_additional_rate).toFixed(2)}</td>
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
                    <td>{(invoiceHisotry?.company_initial_rate + invoiceHisotry?.extra_test_num * invoiceHisotry?.company_additional_rate).toFixed(2)}</td>
                  </tr>
                  {!discountStatus && (
                    <tr className='grayTr'>
                      <td></td>
                      <td colSpan='2'>DISCOUNT {discountValue ? `${discountValue}%` : ''}</td>
                      <td>{discountValue ? ((invoiceHisotry?.company_initial_rate + invoiceHisotry?.extra_test_num * invoiceHisotry?.company_additional_rate) * (discountValue / 100)).toFixed(2) : 0}</td>
                    </tr>
                  )}
                  <tr>
                    <td></td>
                    <td colSpan='2'>INVOICE TOTAL</td>
                    <td>
                      {!discountStatus && discountValue ? ((invoiceHisotry?.company_initial_rate + invoiceHisotry?.extra_test_num * invoiceHisotry?.company_additional_rate) - (invoiceHisotry?.company_initial_rate + invoiceHisotry?.extra_test_num * invoiceHisotry?.company_additional_rate) * (discountValue / 100)).toFixed(2) : (invoiceHisotry?.company_initial_rate + invoiceHisotry?.extra_test_num * invoiceHisotry?.company_additional_rate).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div style={{ textAlign: 'center', marginTop: 20, marginBottom: 20  }}>
                <span>{invoiceHisotry?.company_street}, {invoiceHisotry?.company_city}, {invoiceHisotry?.company_state} {invoiceHisotry?.company_zip}</span>
                <span style={{ marginLeft: 40 }}>{invoiceHisotry.company_phone}</span>
              </div>
            </div>
            <div style={{ position: 'absolute', width: 'calc(100% - 0.6in)', bottom: '0.4in' }}>
              <Row>
                <Col span={12}>
                  <div style={{ fontSize: 11, border: '1px solid', textAlign: 'center', padding: 5 }}>
                    <div style={{ marginBottom: 10 }}>Remit Payment to:</div>
                    <div>{invoiceHisotry?.company_name}</div>
                    <div>{invoiceHisotry?.company_street}</div>
                    <div>{invoiceHisotry?.company_city}, {invoiceHisotry?.company_state}</div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </PDFExport>
        <div style={{ textAlign: 'center' }}>
          <Button onClick={handleExportWithComponent} className='newCustomer'> {!loading ? "Download PDF" : 'loading...'}</Button>
        </div>
        </>
        )}
      </ST.GeneratedWrapper>
    </>
  )
}

export default PdfInvoice;