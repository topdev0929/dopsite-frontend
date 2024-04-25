import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import SuccessModal from '../../components/Modal/successModal'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from "react-redux"
//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { openNotificationWithIcon } from '../../components/Modal/notification'
import { Form } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import {
  Container,
  Button,
  FormGroup,
  Input,
} from "reactstrap";
import { getCustomer, updateCoustomer } from '../../data/customer.js'
import PencilIcon from '../../assets/images/pencil.png'
import * as ST from './styles'
import { getCompanyInfo } from '../../data/comany'

// const discountOptions = ['N/A', '']
const termOptions = ['Due on receipt', 'Net 15', 'Net 30']
const Projects = () => {
  const [modal_center, setmodal_center] = useState(false);
  const [companyInfo, setCompanyInfo] = useState();
  const [editData, setEditData] = useState()
  const history = useHistory()
  const { id } = useParams();
  const [form] = Form.useForm()
  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))
  useEffect(() => {
    getCompanyInfo({id: currentUser?.company_id}).then(res => {
      if (res) {
        setCompanyInfo(res[0].discount.split(','))
      }
    })
  }, [])
  useEffect(() => {
    getCustomer({id: id, company_id: currentUser?.company_id}).then(res => {
      var params = {
        customer_name: res[0].customer_name,
        customer_email: res[0].customer_email,
        city: res[0].city,
        distance: res[0].distance,
        state: res[0].state,
        street: res[0].street,
        terms: res[0].terms,
        zip: res[0].zip
      }
      form.setFieldsValue(params)
      setEditData(res[0])
    })
  }, [id])
  const validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const tog_center = () => {
    setmodal_center(!modal_center)
    // removeBodyCss()
  }
  const goBack = () => {
    history.push('/customers')
  }
  const handleSubmit = (val) => {

    if (currentUser.role_id !== 9 && currentUser.role_id !== 10 ) {
      const data = val
      data.id = id
      updateCoustomer(val).then(res => {
        // openNotificationWithIcon('success', 'Note', 'Updated successfully')
        tog_center()
        setTimeout(function(){
          history.push('/customers')
        }, 500)
      }).catch(err => {
        openNotificationWithIcon('error', 'Note', 'Failed')
      })
    } else {
      openNotificationWithIcon('error', 'Note', "You must be a part of a company before using this feature.")
    }
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Edit Customer | DOP Test Network</title>
        </MetaTags>
        {currentUser?.role_id !== 10 && (
          <ST.EditWrapper>
            <Container fluid>
              {/* Render Breadcrumbs */}
              <Breadcrumbs title="DOP" breadcrumbItem="Customer/Edit" />
              <header className='back d-print-none' onClick={() => goBack()}>
                <i className='dripicons-arrow-thin-left'></i>
                <span>Back</span>
              </header>
              <div className='row header'>
                <div className='col-md-12'>
                  Edit Customer
                </div>
              </div>
              <Form onFinish={handleSubmit} form={form}>
                <div className='row'>
                  <div className='col-md-1'></div>
                  <div className='col-md-5'>
                    <Form.Item
                      name="customer_name"
                      rules={[{ required: true, message: 'This field is required' }]}
                    >
                      <FormGroup>
                        <Input placeholder={editData?.customer_name} />
                        <span className='inputTitle'>Customer Name</span>
                        <img src={PencilIcon} alt='' />
                      </FormGroup>
                    </Form.Item>
                  </div>
                  <div className='col-md-5'>
                    <Form.Item name="street">
                      <FormGroup>
                        <Input placeholder={editData?.street} />
                        <span className='inputTitle'>Street</span>
                        <img src={PencilIcon} alt='' />
                      </FormGroup>
                    </Form.Item>
                  </div>
                  <div className='col-md-1'></div>
                </div>
                <div className='row'>
                  <div className='col-md-1'></div>
                  <div className='col-md-5'>
                    <Form.Item
                      name="customer_email"
                      rules={[
                        { required: true, message: 'This field is required' },
                        {
                          validator(_, value) {
                            if (value && !value.match(validRegex)) {
                              return Promise.reject('Invalid email address!')
                            }
                            return Promise.resolve()
                          }
                        }
                      ]}
                    >
                      <FormGroup>
                        <Input placeholder={editData?.customer_email} />
                        <span className='inputTitle'>Email</span>
                        <img src={PencilIcon} alt='' />
                      </FormGroup>
                    </Form.Item>
                  </div>
                  <div className='col-md-5'>
                    <Form.Item name="city">
                      <FormGroup>
                        <Input placeholder={editData?.city} />
                        <span className='inputTitle'>City</span>
                        <img src={PencilIcon} alt='' />
                      </FormGroup>
                    </Form.Item>
                  </div>
                  <div className='col-md-1'></div>
                </div>
                
                <div className='row'>
                  <div className='col-md-1'></div>
                  <div className='col-md-5'>
                    <Form.Item name="terms">
                      <FormGroup>
                        <Input type="select" defaultValue={editData?.customer_id} >
                          <option></option>
                          {termOptions && termOptions.map(res => (
                            <>
                              {res === editData?.terms ? (
                                <option key={res} value={res} selected >{res}</option>
                              ) : (
                                <option key={res} value={res}>{res}</option>
                              )}
                            </>
                          ))}
                        </Input>
                        <span className='inputTitle'>Terms</span>
                        <DownOutlined />
                      </FormGroup>
                    </Form.Item>
                  </div>
                  <div className='col-md-5'>
                    <Form.Item name="state">
                      <FormGroup>
                        <Input placeholder={editData?.state} />
                        <span className='inputTitle'>State</span>
                        <img src={PencilIcon} alt='' />
                      </FormGroup>
                    </Form.Item>
                  </div>
                  <div className='col-md-1'></div>
                </div>
                <div className='row'>
                  <div className='col-md-1'></div>
                  <div className='col-md-5'>
                    <Form.Item name="discount">
                      <FormGroup>
                        <Input type="select" defaultValue={editData?.customer_id} >
                          <option value='N/A'>N/A</option>
                          {companyInfo && companyInfo.map(res => (
                            <>
                              {res === editData?.discount ? (
                                <option key={res} value={res} selected >{res}%</option>
                              ) : (
                                <option key={res} value={res}>{res}%</option>
                              )}
                            </>
                          ))}
                        </Input>
                        <span className='inputTitle'>Discount Allegibillity</span>
                        <DownOutlined />
                      </FormGroup>
                    </Form.Item>
                  </div>
                  <div className='col-md-5'>
                    <Form.Item name="zip">
                      <FormGroup>
                        <Input placeholder={editData?.zip} />
                        <span className='inputTitle'>Zip</span>
                        <img src={PencilIcon} alt='' />
                      </FormGroup>
                    </Form.Item>
                  </div>
                  <div className='col-md-1'></div>
                </div>
                <div className='row'>
                  <div className='col-md-5'>
                    <Button htmlType="submit">Edit & Save</Button>
                  </div>
                </div>
              </Form>
            </Container>
            <SuccessModal
              title='Successfully!'
              content='Customer Updated'
              modal_center={modal_center}
              setmodal_center={setmodal_center}
              tog_center={tog_center}
            />
          </ST.EditWrapper>
        )}
      </div>
    </React.Fragment>
  )
}

export default Projects;