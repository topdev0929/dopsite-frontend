import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import SuccessModal from '../../components/Modal/successModal'
import { useHistory } from 'react-router-dom'
import { useSelector } from "react-redux"
//import Breadcrumbs
import { Form, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  Container,
  FormGroup,
  Input
} from "reactstrap";
import PencilIcon from '../../assets/images/pencil.png'
import { createCustomer } from '../../data/customer.js'
import * as ST from './styles'
import { openNotificationWithIcon } from '../../components/Modal/notification'
import { getCompanyInfo } from '../../data/comany'

const Projects = () => {
  const [modal_center, setmodal_center] = useState(false);
  const [companyInfo, setCompanyInfo] = useState();
  const history = useHistory()

  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))
  useEffect(() => {
    getCompanyInfo({id: currentUser?.company_id}).then(res => {
      if (res) {
        setCompanyInfo(res[0].discount?.split(','))
      }
    })
  }, [])
  const validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const tog_center = () => {
    setmodal_center(!modal_center)
  }
  
  const goBack = () => {
    history.push('/customers')
  }
  const handleSubmit = (val) => {
    if (currentUser.role_id !== 9 && currentUser.role_id !== 10 ) {
      const data = val
      data.company_id = currentUser.company_id
      createCustomer(val).then(res => {
        openNotificationWithIcon('success', 'Note', 'Created successfully')
        history.push('/customers')
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
          <title>Add Customer | DOP Test Network</title>
        </MetaTags>
        {currentUser?.role_id !== 10 && (
          <ST.Wrapper>
            <Container fluid>
              {/* Render Breadcrumbs */}
              <Breadcrumbs title="DOP" breadcrumbItem="Add Customer" />
              <header className='back d-print-none' onClick={() => goBack()}>
                <i className='dripicons-arrow-thin-left'></i>
                <span>Back</span>
              </header>
              <div className='row header'>
                <div className='col-md-12'>
                  Add Customer
                </div>
              </div>
              <Form onFinish={handleSubmit}>
                <div className='row'>
                  <div className='col-md-1'></div>
                  <div className='col-md-5'>
                    <Form.Item name="customer_name" rules={[{ required: true, message: 'This field is required' }]}>
                      <FormGroup>
                        <Input  />
                        <span className='inputTitle'>Customer Name</span>
                        <img src={PencilIcon} alt='' />
                      </FormGroup>
                    </Form.Item>
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
                        <Input />
                        <span className='inputTitle'>Email Address</span>
                        <img src={PencilIcon} alt='' />
                      </FormGroup>
                    </Form.Item>
                    <Form.Item name="terms" rules={[{ required: true, message: 'This field is required' }]}>
                      <FormGroup>
                        <Input type="select" >
                          <option></option>
                          <option value='Due on receipt'>Due on receipt</option>
                          <option value='Net 15'>Net 15</option>
                          <option value='Net 30'>Net 30</option>
                        </Input>
                        <span className='inputTitle'>Terms</span>
                        <DownOutlined />
                      </FormGroup>
                    </Form.Item>
                    <Form.Item name="discount">
                      <FormGroup>
                        <Input type="select" >
                          <option value='N/A'>N/A</option>
                          {companyInfo && companyInfo.map(res => (
                            <option value={res} key={res}>{res}%</option>
                          ))}
                          
                        </Input>
                        <span className='inputTitle'>Discount Allegibillity</span>
                        <DownOutlined />
                      </FormGroup>
                    </Form.Item>
                  </div>
                  <div className='col-md-5'>
                    <Form.Item name="street">
                      <FormGroup>
                        <Input />
                        <span className='inputTitle'>Street</span>
                        <img src={PencilIcon} alt='' />
                      </FormGroup>
                    </Form.Item>
                    <Form.Item name="city">
                      <FormGroup>
                        <Input />
                        <span className='inputTitle'>City</span>
                        <img src={PencilIcon} alt='' />
                      </FormGroup>
                    </Form.Item>
                    <Form.Item name="state">
                      <FormGroup>
                        <Input />
                        <span className='inputTitle'>State</span>
                        <img src={PencilIcon} alt='' />
                      </FormGroup>
                    </Form.Item>
                    <Form.Item name="zip">
                      <FormGroup>
                        <Input />
                        <span className='inputTitle'>Zip</span>
                        <img src={PencilIcon} alt='' />
                      </FormGroup>
                    </Form.Item>
                  </div>
                  <div className='col-md-1'></div>
                </div>
                <div className='row'>
                  <div className='col-md-5'>
                    <Button htmlType="submit">Save & New</Button>
                  </div>
                </div>
              </Form>
            </Container>
            <SuccessModal
              title='Successfully!'
              content='Customer Added'
              modal_center={modal_center}
              setmodal_center={setmodal_center}
              tog_center={tog_center}
            />
          </ST.Wrapper>
        )}
      </div>
    </React.Fragment>
  )
}

export default Projects;