import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import SuccessModal from '../../components/Modal/successModal'
//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import PencilIcon from '../../assets/images/pencil.png'
import { useHistory, useParams } from 'react-router-dom'
import getCustomers from '../../data/swr/customers/customers.js'
import { useSelector } from "react-redux"
import { Form, Select } from 'antd'
import { getProject, updateProject } from '../../data/project.js'
import { openNotificationWithIcon } from '../../components/Modal/notification'
import {
  Container,
  Button,
  FormGroup,
  Input,
} from "reactstrap";
import * as ST from './styles'

const { Option } = Select
const Projects = () => {
  const history = useHistory();
  const [modal_center, setmodal_center] = useState(false);
  const [editData, setEditData] = useState()
  const { id } = useParams();
  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))

  const { result } = getCustomers({ company_id: currentUser?.company_id })
  const [form] = Form.useForm()
  useEffect(() => {
    getProject({id: id}).then(res => {
      var params = {
        project_name: res[0].project_name,
        customer_id: res[0].customer_id,
        ses_project_id: res[0].ses_project_id,
        reference_id: res[0].reference_id,
        city: res[0].project_city,
        state: res[0].project_state,
        street: res[0].project_street,
        zip: res[0].project_zip
      }
      form.setFieldsValue(params)
      setEditData(params)
    })
  }, [id])
  const tog_center = () => {
    setmodal_center(!modal_center)
  }
  const goMachine = val => {
    history.push('/projects')
  }
  const handleSubmit = (val) => {
    if (currentUser.role_id !== 9 && currentUser.role_id !== 10 ) {
      const data = val
      data.id = id
      updateProject(val).then(res => {
        tog_center()
        setTimeout(function(){
          history.push('/projects')
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
          <title>Projects | DOP Test Network</title>
        </MetaTags>
        {currentUser?.role_id !== 10 && (
          <ST.EditWrapper>
            <Container fluid>
              {/* Render Breadcrumbs */}
              <Breadcrumbs title="DOP" breadcrumbItem="Update Project" />
              <div className='back' onClick={() => goMachine()}>
                <i className='dripicons-arrow-thin-left'></i>
                <span>Back</span>
              </div>
              <div className='row header'>
                <div className='col-md-12'>Enter Project Details</div>
              </div>
              <Form onFinish={handleSubmit} form={form}>
                <div className='row'>
                  <div className='col-md-1'></div>
                  <div className='col-md-5'>
                    <Form.Item
                      name="customer_id"
                      rules={[{ required: true, message: 'This field is required' }]}
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
                        {result && result.map(res => (
                          <>
                            {res.id === editData?.customer_id ? (
                              <Option key={res.id} value={res.id} selected >{res.customer_name}</Option>
                            ) : (
                              <Option key={res.id} value={res.id}>{res.customer_name}</Option>
                            )}
                          </>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className='col-md-5'>
                    <Form.Item name='project_name' rules={[{ required: true, message: 'This field is required' }]}>
                      <FormGroup>
                        <Input placeholder={editData?.project_name} />
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
                    <Form.Item  name='ses_project_id' rules={[{ required: true, message: 'This field is required' }]}>
                      <FormGroup>
                        <Input placeholder={editData?.ses_project_id} />
                        <span className='inputTitle'>Project Number</span>
                        <img src={PencilIcon} alt='' />
                      </FormGroup>
                    </Form.Item>
                  </div>
                  <div className='col-md-5'>
                    <Form.Item name='reference_id' rules={[{ required: true, message: 'This field is required' }]}>
                      <FormGroup>
                        <Input placeholder={editData?.reference_id} />
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
                        <Input placeholder={editData?.street} />
                        <span className='inputTitle'>Street</span>
                        <img src={PencilIcon} alt='' />
                      </FormGroup>
                    </Form.Item>
                  </div>
                  <div className='col-md-5'>
                    <Form.Item name='city'>
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
                    <Form.Item name='state'>
                      <FormGroup>
                        <Input placeholder={editData?.state} />
                        <span className='inputTitle'>State</span>
                        <img src={PencilIcon} alt='' />
                      </FormGroup>
                    </Form.Item>
                  </div>
                  <div className='col-md-5'>
                    <Form.Item name='zip'>
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
                  <Button htmlType="submit">Update & Save</Button>
                </div>
              </div>
              </Form>
            </Container>
            <SuccessModal
              title='Successfully!'
              content='This project updated'
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