import React, { useState, useEffect, useRef } from 'react';
import MetaTags from 'react-meta-tags';
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from "react-redux"
import { PDFExport, savePDF } from  '@progress/kendo-react-pdf'
//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { getProject } from '../../data/project.js'
import { Checkbox, Button, Select, Row, Col } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import moment from 'moment'
import {
  Container,
  Table,
  Input,
  FormGroup
} from "reactstrap";
import * as ST from './styles'
import getMachines from '../../data/swr/machines/machines.js'
import { getCompanyInfo } from '../../data/comany'
import { SendInvoice, getInvoiceNum } from '../../data/invoice.js'
import SuccessModal from '../../components/Modal/successModal'
import { getS3Image, deleteImage } from '../../data/report.js'


const { Option } = Select
const InvoiceGenerate = () => {
  const pdfExportComponent = useRef(null)
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [modal_center, setmodal_center] = useState(false)
  const [editData, setEditData] = useState()
  const [companyInfo, setCompanyInfo] = useState()
  const [companyDiscount, setCompanyDiscount] = useState()
  const [discountStatus, setDiscountStatus] = useState(true)
  const [discountValue, setDiscountValue] = useState()
  const [invoiceId, setInvoiceId] = useState()
  const [invoiceButtonLoading, setInvoiceButtonLoading] = useState()
  const [layoutSelection, setLayoutSelection] =  useState("size-a4");
  
  const { id } = useParams();
  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))

  const nowDate = new Date()
  const { result } = getMachines({ project_id: id })

  useEffect(() => {
    getCompanyInfo({id: currentUser?.company_id}).then(res => {
      if (res) {
        setCompanyInfo(res[0])
        setCompanyDiscount(res[0].discount.split(','))
      }
    })
  }, [])
  useEffect(() => {
    getInvoiceNum({id: currentUser?.company_id}).then(res => {
      if (res[0].num >= companyInfo?.invoice_start) {
        setInvoiceId(Number(Number(res[0].num) + 1))
      } else {
        setInvoiceId(companyInfo?.invoice_start)
      }
    })
  }, [companyInfo])


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
        invoice_date: moment(nowDate).format('MM/DD/YYYY'),
        report_date: moment(nowDate).format('MM/DD/YYYY'),
        tested_at: moment(nowDate).format('MM/DD/YYYY'),
        city: res[0].city,
        state: res[0].state,
        street: res[0].street,
        zip: res[0].zip,
        discount: res[0].discount,
        terms: res[0].terms,
        extra_test_num: result?.length < 4 ? 0 : (result?.length - 4),
        sender_user_id: currentUser?.sub,
        invoice_id: invoiceId
      }
      setEditData(params)
      if (params.discount !== 'N/A') {
        setDiscountValue(params.discount)
      }
    })
  }, [id, result, invoiceId])
  const tog_center = () => {
    setmodal_center(!modal_center)
  }
  const goMachine = () => {
    history.push(`/projects/machines/${id}`)
  }

  const onChangeCheckbox = val => {
    if (val.target.checked) {
      setDiscountStatus(false)
    } else {
      setDiscountStatus(true)
    }
  }

  const onChangeDiscount = val => {
    setDiscountValue(val.target.value)
  }
  
  const sendInvoiceAndReport = () => {

    setInvoiceButtonLoading(true)
    const params = {
      editData: editData,
      companyInfo: companyInfo,
      discount: !discountStatus && discountValue ? discountValue : 0,
      subtotal: companyInfo?.initial_rate + editData?.extra_test_num * companyInfo?.additional_rate,
      resend: false,
      company_id: currentUser?.company_id,
      tableData: result,
      userId: currentUser.sub,
      currentUser: currentUser
    }
    console.log('params =>', params)
    SendInvoice(params).then(res => {
      if (res) {
        setmodal_center(true)
        setInvoiceButtonLoading(false)
      }
    })
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Project/machines | DOP Test Network</title>
        </MetaTags>
        {currentUser?.role_id !== 10 && (
          <ST.GeneratedWrapper>
            <Container fluid>
              <Breadcrumbs title="DOP" breadcrumbItem="Project/Machines" />
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
                        <img src={image ? image : `https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${companyInfo?.logo}`} height='70' alt='logo'/>
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
                  {/* <div className='row panel'>
                    <div className='col-md-4'>
                      <div><span>Bill to:</span></div>
                      <div><span>{editData?.customer_name}</span></div>
                      <div><span>{editData?.street}</span></div>
                      <div>{editData?.city}, {editData?.state}</div>
                      <div><span>{editData?.zip}</span></div>
                    </div>
                    <div className='col-md-4'>
                      <div>Project Name:</div>
                      <div><span>{editData?.project_name}</span></div>
                      <div>Project Address:</div>
                      <div><span>{editData?.project_street}</span></div>
                      <div><span>{editData?.project_city}, {editData?.project_state}</span></div>
                      <div><span>{editData?.project_zip}</span></div>
                    </div>
                    <div className='col-md-4' style={{ textAlign: 'right' }}>
                      <div><span>SES Project: {editData?.ses_project_id}</span></div>
                      <div><span>Customer Reference: {editData?.reference_id}</span></div>
                      <div>P.O.NO. 88765</div>
                      <div><br /></div>
                      <div>TERMS: {editData?.terms}</div>
                    </div>
                  </div> */}
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
                          <td>{companyInfo?.initial_rate}</td>
                          <td>{companyInfo?.initial_rate.toFixed(2)}</td>
                        </tr>
                        {editData?.extra_test_num !== 0 && (
                          <tr>
                            <td>Extra units tested</td>
                            <td>{editData?.extra_test_num}</td>
                            <td>{companyInfo?.additional_rate}</td>
                            <td>{(editData?.extra_test_num * companyInfo?.additional_rate).toFixed(2)}</td>
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
                          <td>{(companyInfo?.initial_rate + editData?.extra_test_num * companyInfo?.additional_rate).toFixed(2)}</td>
                        </tr>
                        {!discountStatus && (
                          <tr className='grayTr'>
                            <td></td>
                            <td colSpan='2'>DISCOUNT {discountValue ? `${discountValue}%` : ''}</td>
                            <td>{discountValue ? ((companyInfo?.initial_rate + editData?.extra_test_num * companyInfo?.additional_rate) * (discountValue / 100)).toFixed(2) : 0}</td>
                          </tr>
                        )}
                        <tr>
                          <td></td>
                          <td colSpan='2'>INVOICE TOTAL</td>
                          <td>
                            {!discountStatus && discountValue ? ((companyInfo?.initial_rate + editData?.extra_test_num * companyInfo?.additional_rate) - (companyInfo?.initial_rate + editData?.extra_test_num * companyInfo?.additional_rate) * (discountValue / 100)).toFixed(2) : (companyInfo?.initial_rate + editData?.extra_test_num * companyInfo?.additional_rate).toFixed(2)}
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
              <footer className='d-print-none'>
                <div style={{ textAlign: 'center' }}>
                  <Checkbox onChange={onChangeCheckbox} checked={!discountStatus}>Enable Discount</Checkbox>
                  {/* <Checkbox onChange={onChangeCheckbox} checked={!discountStatus} disabled>Enable Discount</Checkbox> */}
                  <FormGroup>
                    <Input type="select" value={discountValue} disabled={discountStatus} onChange={onChangeDiscount} >
                    {/* <Input type="select" value={discountValue} disabled onChange={onChangeDiscount} > */}
                      <option value=''>N/A</option>
                      {companyDiscount && companyDiscount.map(res => (
                        <>
                          {editData?.discount && (
                            <>
                              {Number(res) <= Number(editData.discount) ? (
                                <option key={res} value={res}>{res}%</option>
                              ) : (
                                <option style={{ background: 'gainsboro' }} key={res} value={res} disabled='disabled'>{res}%</option>
                              )}
                            </>
                          )}
                        </>
                      ))}
                    </Input>
                    <DownOutlined />
                  </FormGroup>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Button disabled={invoiceButtonLoading}  className='newCustomer' onClick={() => sendInvoiceAndReport()}>Save & Send</Button>
                </div>
              </footer>
            </Container>
            <SuccessModal
              title='Successfully!'
              content='You sent invoice to customer'
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

export default InvoiceGenerate;