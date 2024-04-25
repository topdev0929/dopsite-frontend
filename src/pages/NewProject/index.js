import React, { useState } from 'react';
import MetaTags from 'react-meta-tags';
import SuccessModal from '../../components/Modal/successModal'
import { useHistory } from 'react-router-dom'
import { useSelector } from "react-redux"
//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import PencilIcon from '../../assets/images/pencil.png'
import { openNotificationWithIcon } from '../../components/Modal/notification'
import {
  Container,
  Button,
  FormGroup,
  Input,
} from "reactstrap";
import { Form, Select } from 'antd'
import * as ST from './styles'
import getCustomers from '../../data/swr/customers/customers.js'
import { createProject } from '../../data/project.js'

const { Option } = Select
const Projects = () => {
  const [modal_center, setmodal_center] = useState(false);
  const history = useHistory()
  const [form] = Form.useForm()
  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))
  // const { result } = getCustomers({ company_id: currentUser?.company_id })
  const { result } = getCustomers({ company_id: currentUser?.company_id, data: { limit: 1000, page: 1 } })

  const tog_center = () => {
    setmodal_center(!modal_center)
  }
  
  const handleSubmit = (val) => {
    if (currentUser.role_id !== 9 && currentUser.role_id !== 10 ) {
      const data = val
      data.creator = currentUser.sub
      createProject(val).then(res => {
        tog_center()
        setTimeout(function(){
          history.push(`/projects/machines/${res.id}`)
        }, 500)
      }).catch(err => {
        openNotificationWithIcon('error', 'Note', 'Failed')
      })
    } else {
      openNotificationWithIcon('error', 'Note', "You must be a part of a company before using this feature.")
    }
  }
  
  const goBack = () => {
    history.push('/projects')
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>New Project | DOP Test Network</title>
        </MetaTags>
        {currentUser?.role_id !== 10 && (
          <ST.Wrapper>
            <Container fluid>
              {/* Render Breadcrumbs */}
              <Breadcrumbs title="DOP" breadcrumbItem="New Project" />
              <header className='back d-print-none' onClick={() => goBack()}>
                <i className='dripicons-arrow-thin-left'></i>
                <span>Back</span>
              </header>
              <div className='row'>
                <div className='col-md-12'>Enter Project Details</div>
              </div>
              <Form onFinish={handleSubmit} form={form}>
                <div className='row'>
                  <div className='col-md-1'></div>
                  <div className='col-md-5 customerSelect'>
                    <Form.Item
                      name="customer_id"
                      rules={[{ required: true, message: 'Customer is required' }]}
                    >
                      <Select
                        className='antdSelect'
                        showSearch
                        placeholder='Search to Customer'
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                      >
                        {result && result.lists.map(res => (
                          <Option key={res.id} value={res.id}>{res.customer_name}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className='col-md-5'>
                    <Form.Item
                      name="project_name"
                      rules={[{ required: true, message: 'Project name is required' }]}
                    >
                      <FormGroup>
                        <Input />
                        <span className='inputTitle'>Project Name</span>
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
                      name="ses_project_id"
                      rules={[{ required: true, message: 'Project number is required' }]}
                    >
                      <FormGroup>
                        <Input />
                        <span className='inputTitle'>Project Number</span>
                        <img src={PencilIcon} alt='' />
                      </FormGroup>
                    </Form.Item>
                  </div>
                  <div className='col-md-5'>
                    <Form.Item
                      name="reference_id"
                      rules={[{ required: true, message: 'Client reference is required' }]}
                    >
                      <FormGroup>
                        <Input />
                        <span className='inputTitle'>Client Reference</span>
                        <img src={PencilIcon} alt='' />
                      </FormGroup>
                    </Form.Item>
                  </div>
                  <div className='col-md-1'></div>
                </div>
                <div className='row'>
                  <div className='col-md-1'></div>
                  <div className='col-md-5'>
                    <Form.Item name='street'>
                      <FormGroup>
                        <Input />
                        <span className='inputTitle'>Street</span>
                        <img src={PencilIcon} alt='' />
                      </FormGroup>
                    </Form.Item>
                  </div>
                  <div className='col-md-5'>
                    <Form.Item name='city'>
                      <FormGroup>
                        <Input />
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
                    <Form.Item name='state'>
                      <FormGroup>
                        <Input />
                        <span className='inputTitle'>State</span>
                        <img src={PencilIcon} alt='' />
                      </FormGroup>
                    </Form.Item>
                  </div>
                  <div className='col-md-5'>
                    <Form.Item name='zip'>
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
                    <Button  htmlType="submit">Create Project</Button>
                  </div>
                </div>
              </Form>
            </Container>
            <SuccessModal
              title='Successfully!'
              content='New project created'
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