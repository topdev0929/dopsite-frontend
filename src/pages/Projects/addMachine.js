import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import moment from 'moment'
//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useHistory, useParams } from 'react-router-dom'
import SuccessModal from '../../components/Modal/successModal'
import { getProject } from '../../data/project.js'
import { openNotificationWithIcon } from '../../components/Modal/notification'
import { useSelector } from "react-redux"
import { Form, Radio, DatePicker, Input, Select, Checkbox } from 'antd'
import {
  Container,
  Button,
} from "reactstrap";
import * as ST from './styles'
import { CreateMachine, getMachinesNum } from '../../data/project.js'
import { getCompanyInfo } from '../../data/comany'

const equipment_test = [
  {
    label: 'Pass',
    value: true,
  },
  {
    label: 'Fail',
    value: false,
  }
]

const cause_failure = [
  {
    label: 'Leaks/Poor Seal',
    value: '1',
  },
  {
    label: 'Electrical Malfunction',
    value: '2',
  },
  {
    label: 'Damaged Filter',
    value: '3',
  },
  {
    label: 'Damaged Case/Missing Parts',
    value: '4',
  }
]

const { Option } = Select
const Projects = () => {
  const history = useHistory();
  const [modal_center, setmodal_center] = useState(false)
  const [dateValue, setDateValue] = useState(moment(new Date()).format())
  const [editData, setEditData] = useState()
  const [failureStatus, setFailureStatus] = useState(false)
  const [companyInfo, setCompanyInfo] = useState()
  const { id } = useParams();
  const [form] = Form.useForm()
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
        city: res[0].city,
        state: res[0].state,
        street: res[0].street,
        zip: res[0].zip
      }
      setEditData(params)
    })
  }, [id])
  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))
  useEffect(() => {
    getCompanyInfo({id: currentUser?.company_id}).then(res => {
      if (res) {
        setCompanyInfo(res[0])
      }
    })
  }, [])
  useEffect(() => {
    getMachinesNum({id: currentUser?.company_id}).then(res => {
      if (res[0].num >= companyInfo?.dop_certificate_start) {
        form.setFieldsValue({certificate_id: Number(Number(res[0].num) + 1)})
      } else {
        form.setFieldsValue({certificate_id:companyInfo?.dop_certificate_start})
      }
    })
  }, [companyInfo])
  const tog_center = () => {
    setmodal_center(!modal_center)
    // removeBodyCss()
  }
  const goMachine = () => {
    history.push(`/projects/machines/${id}`)
  }

  const handleSubmit = (val) => {
    if (currentUser.role_id !== 9 && currentUser.role_id !== 10 ) {
      const data = val
      data.project_id = id
      data.machine_creator = currentUser.sub
      data.date = dateValue

    //  console.log('data =>', data)
      CreateMachine(val).then(res => {
        tog_center()
        setTimeout(function(){
          history.push(`/projects/machines/${id}`)
        }, 500)
      }).catch(err => {
        openNotificationWithIcon('error', 'Note', 'Failed')
      })
    } else {
      openNotificationWithIcon('error', 'Note', "You must be a part of a company before using this feature.")
    }
  }

  const onChangeData = (date, dateString) => {
    setDateValue(dateString)
  }

  const onChangeTest = e => {
    if (!e.target.value) {
      setFailureStatus(true)
    } else {
      setFailureStatus(false)
    }
  }

  const onChangeReason = checkedValues => {
  }
  
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Projects | DOP Test Network</title>
        </MetaTags>
        {currentUser?.role_id !== 10 && (
          <ST.AddMachineWrapper>
            <Container fluid>
              {/* Render Breadcrumbs */}
              <Breadcrumbs title="DOP" breadcrumbItem="Add Device" />
              <div className='back' onClick={() => goMachine()}>
                <i className='dripicons-arrow-thin-left'></i>
                <span>Back</span>
              </div>
              <div className="">
                <div className='row'>
                  <div className='col-md-1'></div>
                  <div className='col-md-5'>
                    <header>
                      <div>Customer: <span>{editData?.customer_name}</span></div>
                      <div>Project Name: <span>{editData?.project_name}</span></div>
                      <div>Project Number: <span>{editData?.ses_project_id}</span></div>
                    </header>
                  </div>
                </div>
                <Form layout="vertical" onFinish={handleSubmit} form={form} initialValues={{ equipment_test: true, cause_failure: '1', date: moment() }}>
                  <div className='row'>
                    <div className='col-md-1'></div>
                    <div className='col-md-5'>
                      <Form.Item label='Date' name='date' rules={[{ required: true, message: 'This field is required' }]}>
                        <DatePicker
                          format="MM/DD/YYYY"
                          style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }}
                          onChange={onChangeData}
                          // defaultValue={moment()}
                        />
                      </Form.Item>
                      <Form.Item label='Equipment Type' name='equipment_type' rules={[{ required: true, message: 'This field is required' }]}>
                        <Select className='antdSelect' placeholder='Equipment Type' >
                          <Option></Option>
                          <Option value='HEPA Vacuum'>HEPA Vacuum</Option>
                          <Option value='Neg Air Machine'>Neg Air Machine</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label='Model' name='model' rules={[{ required: true, message: 'This field is required' }]}>
                        <Input placeholder='Model' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                      </Form.Item>
                    </div>
                    <div className='col-md-5'>
                      <Form.Item label='Certificate' name='certificate_id' rules={[{ required: true, message: 'This field is required' }]}>
                        <Input disabled placeholder='DOP Certificate #' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                      </Form.Item>
                      <Form.Item label='Make' name='make' rules={[{ required: true, message: 'This field is required' }]}>
                        <Input  placeholder='Make' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                      </Form.Item>
                      <Form.Item label='Serial' name='serial_id' rules={[{ required: true, message: 'This field is required' }]}>
                        <Input placeholder='Serial' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                      </Form.Item>
                    </div>
                    <div className='col-md-1'></div>
                  </div>
                  <section>
                    <div className='row'>
                      <div className='col-md-1'></div>
                      <div className='col-md-10'>
                        <div className='row'>
                          <div className='col-md-2'>
                            Equipment Test
                          </div>
                          <div className='col-md-10'>
                            <Form.Item name='equipment_test'>
                              <Radio.Group
                                options={equipment_test}
                                optionType="button"
                                buttonStyle="solid"
                                onChange={onChangeTest}
                              />
                            </Form.Item>
                          </div>
                        </div>
                      </div>
                      <div className='col-md-1'></div>
                    </div>
                  </section>
                  <aside>
                    <div className='row'>
                      <div className='col-md-1'></div>
                      <div className='col-md-10'>
                        <div className='row'>
                          <div className='col-md-2'>
                            Cause of Failure
                          </div>
                          <div className='col-md-10'>
                            <Form.Item name='cause_failure'>
                              <Checkbox.Group options={cause_failure} disabled={!failureStatus} onChange={onChangeReason} />
                            </Form.Item>
                          </div>
                        </div>
                      </div>
                      <div className='col-md-1'></div>
                    </div>
                  </aside>
                  <footer>
                    <div className='row'>
                      <div className='col-md-5'>
                        <Button htmlType="submit">Save & New</Button>
                      </div>
                    </div>
                  </footer>
                </Form>
              </div>
            </Container>
            <SuccessModal
              title='Successfully!'
              content='New Device Created'
              modal_center={modal_center}
              setmodal_center={setmodal_center}
              tog_center={tog_center}
            />
          </ST.AddMachineWrapper>
        )}
      </div>
    </React.Fragment>
  )
}

export default Projects;