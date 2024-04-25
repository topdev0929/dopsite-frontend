import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import ComfirmModal from '../../components/Modal/comfirmModal'
import SuccessModal from '../../components/Modal/successModal'
import { useHistory } from 'react-router-dom'
import { useSelector } from "react-redux"
import { requestCheck, updateCompany } from '../../data/comany'
import { getAdmins } from '../../data/user'
import { inviteUser } from '../../data/notificate_invite'
import ImgCrop from 'antd-img-crop';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js';
//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Button, Form, Input, Row, Col, Upload, Modal, Select, Checkbox, Radio, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  Container
} from "reactstrap";
import * as ST from './styles'
import { openNotificationWithIcon } from '../../components/Modal/notification'
import AWS from 'aws-sdk'
import { getRoles } from '../../data/role'
import { getAccount, CreateSubscription, CancelSubscription } from '../../data/invoice'
import { getUsersByCompanyId } from '../../data/user'

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
})
const myBucket = new AWS.S3({
  params: { Bucket: process.env.REACT_APP_BUCKET_NAME},
  region: process.env.REACT_APP_REGION
})

const { Option } = Select
const { TextArea } = Input
const discountOptions = [
  { label: '5%', value: '5' },
  { label: '10%', value: '10' },
  { label: '15%', value: '15' },
  { label: '20%', value: '20' }
]
const CARD_ELEMENT_OPTIONS = {
  // For more styling details, see https://stripe.com/docs/js/appendix/style
  style: {
    base: {
      fontSize: 16,
      color: '#424770',
      letterSpacing: '0.025em',
      fontFamily: 'Source Code Pro, monospace',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#9e2146'
    }
  }
}
const Company = () => {
  const [modal_center, setmodal_center] = useState(false);
  const [modal_center1, setmodal_center1] = useState(false);
  const [companyAdmins, setCompanyAdmins] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState([])
  const [discountStatus, setDiscountStatus] = useState(false)
  const [discountSelect, setDiscountSelect] = useState('enabled')
  const [companyUsers, setCompanyUsers] = useState()
  const [roleList, setLoleList] = useState([]);
  const [sendButton, setSendButton] = useState(false)
  const [subscriptionModal, SetSubscriptionModal] = useState(false)
  const [bankCreateButtonStatus, SetBankCreateButtonStatus] = useState(false)
  const [bankCheck, setBankCheck] = useState(false)
  const [companySubscriptionId, setCompanySubscriptionId] = useState()
  const [payProgress, setPayProgress] = useState(false)
  const [error, setError] = useState('')
  
  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))

  // stripe items
  const stripe = useStripe();
  const elements = useElements();

  const [form] = Form.useForm()
  const [formStripe] = Form.useForm()
  const validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const websiteCheck = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  const phoneCheck = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  const numberCheck = /^\d*\.?\d*$/

  
  useEffect(() => {
    getRoles().then(res => {
      setLoleList(res)
    })
  }, [])

  useEffect(() => {
    if (currentUser?.company_id) {
      getUsersByCompanyId({ company_id: currentUser?.company_id }).then(res => {
        setCompanyUsers(res)
      })
    } else {
      setCompanyUsers([])
    }
  }, [])
  useEffect(() => {
    requestCheck({ create_user_id: currentUser?.sub }).then(res => {
      if (res.length && res[0].status) {
        const company_info = res[0]
        if (!res[0].discount) {
          setDiscountSelect('disabled')
          setDiscountStatus(true)
        } else {
          company_info.discount = company_info.discount.split(',')
        }
        if (company_info.logo) {
          setFileList([
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: `https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${company_info.logo}`,
            }
          ])
        }
        form.setFieldsValue(company_info)
        setCompanySubscriptionId(company_info.session_id)
        if (company_info.bank_account) {
          setBankCheck(true)
        }
      }
    })
    getAdmins({ company_id: currentUser?.company_id }).then(res => {
      setCompanyAdmins(res)
    })
  }, [])

  const tog_center = () => {
    setmodal_center(!modal_center)
  }

  const tog_center1 = () => {
    setmodal_center1(!modal_center1)
  }

  const handleSubmit = (val) => {
    const data = val
    if (discountStatus || !data.discount || data.discount.length === 0) {
      delete data.discount
    }
    if (!data.initial_rate) {
      data.initial_rate = 0
    }
    if (!data.additional_rate) {
      data.additional_rate = 0
    }
    if (!data.dop_certificate_start) {
      data.dop_certificate_start = 0
    }
    if (!data.invoice_start) {
      data.invoice_start = 0
    }
    data.id = currentUser.company_id

    updateCompany(data).then(res => {
      setmodal_center1(true)
    })
  }

  const addUser = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false);
  }

  const onFinish = (values) => {
    setSendButton(true)
    inviteUser({ company_id: currentUser.company_id, inviter: currentUser.sub, requester_email: values.email, inviter_email: currentUser.email, message: values.message, role_id: values.role_id}).then((res) => {
      if (res?.message === 'success') {
        openNotificationWithIcon('success', 'Note', 'Sent your invitation successfully')
        setIsModalVisible(false)
      } else if (res?.message === 'stuff') {
        openNotificationWithIcon('error', 'Note', 'Can`t send your invitation message because he is a stuff of company!')
        setIsModalVisible(false)
        setSendButton(false)
      }
    }).catch(err => {
      openNotificationWithIcon('error', 'Note', 'Failed')
      setSendButton(false)
    })
  }
  
  //----------upload feature
  const handlePreviewCancel = () => setPreviewVisible(false);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    })

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  }

  const handleChange = ({ fileList: newFileList }) => {
    if (newFileList && newFileList.length) {
      const params = {
        Body: newFileList[0].originFileObj,
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: newFileList[0].uid + '.' + newFileList[0].name.split('.')[newFileList[0].name.split('.').length - 1]
      };
      myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
        form.setFieldsValue({ logo: params.Key })
      })
      .send((err) => {
          if (err) console.log(err)
      })
    } else {
      if (fileList[0]?.url) {
        // const params = {
        //   Bucket: process.env.REACT_APP_BUCKET_NAME,
        //   Key: fileList[0].url.split(`https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/`)[1]
        // }
        // myBucket.deleteObject(params).promise()
      }
      form.setFieldsValue({ logo: '' })
    } 
    setFileList(newFileList)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Company Logo
      </div>
    </div>
  )
  //----------upload feature
  
  const discountChange = val => {
    if (val === 'enabled') {
      setDiscountStatus(false)
      setDiscountSelect('enabled')
    } else {
      setDiscountStatus(true)
      setDiscountSelect('disabled')
    }
  }

  const createBankAccount = () => {
    SetBankCreateButtonStatus(true)
    getAccount().then(res => {
      window.location.href = res.url
      // SetBankCreateButtonStatus(false)
    }) 
  }
  

  const createSubscription = async val => {
    setPayProgress(true)
    try {
      
      // create a payment method
      const paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: elements?.getElement(CardNumberElement),
        billing_details: {
          name: val?.name,
          email: val?.email,
        },
      })

      // call the backend to create subscription
      const response = await CreateSubscription({
        paymentMethod: paymentMethod?.paymentMethod?.id,
        name: val?.name,
        email: val?.email
      })

      const confirmPayment = await stripe?.confirmCardPayment(
        response.clientSecret
      );

      if (confirmPayment?.error) {
        openNotificationWithIcon('error', 'Note', confirmPayment.error.message)
        setPayProgress(false)
      } else {
        openNotificationWithIcon('success', 'Note', 'Success! Check your email for the invoice.')
        setPayProgress(false)
        SetSubscriptionModal(false)
        updateCompany({ id: currentUser.company_id, session_id: response.subscriptionId }).then(() => {
          // setSubscriptionLevel(query.get('subscription'))
          setCompanySubscriptionId(response.subscriptionId)
        })
      }
    } catch (error) {
      console.log(error);
      setPayProgress(false)
    }
  }
  const cancelSubscription = () => {
    var con = window.confirm('Are you sure to stop your current subscription?')
    if (con) {
      setPayProgress(true)
      CancelSubscription({ subscriptionId: companySubscriptionId }).then(res => {
        // setSubscriptionLevel(query.get('subscription'))
        updateCompany({ id: currentUser.company_id, session_id: '' }).then(() => {
          // setSubscriptionLevel(query.get('subscription'))
          openNotificationWithIcon('success', 'Note', 'Stopped your subscription!')
          SetSubscriptionModal(false)
          setCompanySubscriptionId(null)
          setPayProgress(false)
        })
      })
    }
  }
  const handleChangeStripeInput = (event) => {
    // Set error message to be shown when the user inputs incorrect payment data
    if (event.error) {
      setError(event.error.message);
    } else {
      setError('');
    }
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Company | DOP Test Network</title>
        </MetaTags>
        <ST.CompanyWrapper>
          <Container fluid>
            <Breadcrumbs title="DOP" breadcrumbItem="Company Admistration" />
            {!currentUser?.company_id && currentUser?.role_id === 10 && (
                <div>
                  <Button className='newCustomer' onClick={() => tog_center()}>Create a Company</Button>
                </div>
            )}
            {currentUser?.role_id === 2 ? (
              <div>
                <Button type="primary"  className='newCustomer' size='large' onClick={() => addUser()}>Invite Users</Button>
                <Form
                  form={form}
                  onFinish={handleSubmit}
                >
                  <Row>
                    <Col span={8}></Col>
                    <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
                      <Form.Item>
                        <ImgCrop
                          rotate
                          aspect={156/60}
                          grid
                        >
                          <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                          >
                            {fileList.length > 0 ? null : uploadButton}
                          </Upload>
                        </ImgCrop>
                      </Form.Item>
                      <Form.Item name='logo' style={{ display: 'none' }}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}></Col>
                  </Row>
                  <Row>
                    <Col span={10}></Col>
                    <Col span={4} className='subscriptionLevel'>
                      {bankCheck ? (
                        <>
                          <div style={{ marginBottom: 0 }}></div>
                          <div>Bank Connected</div>
                          <div></div>
                          <div  style={{ marginTop: 15, marginBottom: 5, }}>
                            <Button type='primary' disabled={bankCreateButtonStatus} onClick={createBankAccount}>Change bank</Button>
                          </div>
                        </>
                      ) : (
                        <div>
                          <Button type='primary' disabled={bankCreateButtonStatus} onClick={createBankAccount}>Connect bank</Button>
                        </div>
                      )}
                    </Col>
                    <Col span={10}></Col>
                  </Row>
                  <Row>
                    <Col span={8}></Col>
                    <Col span={8} className='subscriptionLevel'>
                      {bankCheck && (
                        <>
                          <nav style={{ display: 'flex', justifyContent: 'center' }}>
                            <Form.Item name='fee_status' label='Credit Card Fees Paid By:'>
                              <Radio.Group>
                                <Space>
                                  <Radio value={true}>Customer</Radio>
                                  <Radio value={false}>Company</Radio>
                                </Space>
                              </Radio.Group>
                            </Form.Item>
                          </nav>
                        </>
                      )}
                    </Col>
                    <Col span={8}></Col>
                  </Row>
                  <Row>
                    <Col span={10}></Col>
                    <Col span={4} className='subscriptionLevel'>
                      {/* <div>Subscription Level</div> */}
                      {/* <div>{subscriptionLevel}</div> */}
                      <div onClick={() => SetSubscriptionModal(true)}>SUBSCRIPTION</div>
                    </Col>
                    {/* <Col span={10}>
                      <Form.Item name='subscription_level' style={{ display: 'none' }}>
                        <Input />
                      </Form.Item>
                    </Col> */}
                  </Row>
                  <Row>
                    <Col span={6}></Col>
                    <Col span={12}>
                      <Form.Item name="company_name" rules={[{ required: true, message: 'This field is required' }]}>
                        <Input placeholder='Company Name' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                      </Form.Item>
                    </Col>
                    <Col span={6}></Col>
                  </Row>
                  <Row gutter={[18, 0]}>
                    <Col span={6}></Col>
                    <Col span={6}>
                      <Form.Item
                        name="phone"
                        rules={[
                          {
                            validator(_, value) {
                              if (value && !phoneCheck.test(value)) {
                                return Promise.reject('Invalid phone number!')
                              }
                              return Promise.resolve()
                            }
                          }
                        ]}
                      >
                        <Input placeholder='Phone Number' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        name="website"
                        rules={[
                          {
                            validator(_, value) {
                              if (value && !websiteCheck.test(value)) {
                                return Promise.reject('Invalid website url!')
                              }
                              return Promise.resolve()
                            }
                          }
                        ]}
                      >
                        <Input placeholder='Website' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                      </Form.Item>
                    </Col>
                    <Col span={6}></Col>
                  </Row>
                  <Row>
                    <Col span={6}></Col>
                    <Col span={12}>
                      <Form.Item name="street">
                        <Input placeholder='Street Address' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                      </Form.Item>
                    </Col>
                    <Col span={6}></Col>
                  </Row>
                  <Row gutter={[18, 0]}>
                    <Col span={6}></Col>
                    <Col span={4}>
                      <Form.Item name="city">
                        <Input placeholder='City' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item name="state">
                        <Input placeholder='State' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item name="zip">
                        <Input placeholder='Zip' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                      </Form.Item>
                    </Col>
                    <Col span={6}></Col>
                  </Row>
                  <Row gutter={[18, 0]} style={{ marginTop: 20 }}>
                    <Col span={6}></Col>
                    <Col span={6}>
                      <header className='labelHeader'>
                        <div>INITIAL RATE</div>
                        <div>(4) UNITS TESTED</div>
                      </header>
                      <Form.Item
                        name='initial_rate'
                        rules={[
                          {
                            validator(_, value) {
                              if (value && !numberCheck.test(value)) {
                                return Promise.reject('Invalid number!')
                              }
                              return Promise.resolve()
                            }
                          }
                        ]}
                      >
                        <Input style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <header className='labelHeader'>
                        <div>ADDITIONAL</div>
                        <div>RER UNIT RATE</div>
                      </header>
                      <Form.Item
                        name='additional_rate'
                        rules={[
                          {
                            validator(_, value) {
                              if (value && !numberCheck.test(value)) {
                                return Promise.reject('Invalid number!')
                              }
                              return Promise.resolve()
                            }
                          }
                        ]}
                      >
                        <Input style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                      </Form.Item>
                    </Col>
                    <Col span={6}></Col>
                  </Row>
                  <Row gutter={[18, 0]} style={{ marginBottom: 20 }}>
                    <Col span={6}></Col>
                    <Col span={4}>
                      <header className='labelHeader'>
                        <div>DOP Certificate #</div>
                        <div>Starting Value</div>
                      </header>
                      <Form.Item
                        name='dop_certificate_start'
                        rules={[
                          {
                            validator(_, value) {
                              if (value && !numberCheck.test(value)) {
                                return Promise.reject('Invalid number!')
                              }
                              return Promise.resolve()
                            }
                          }
                        ]}
                      >
                        <Input style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <header className='labelHeader'>
                        <div>Company Invoice Prefix#</div>
                        <div>Prefix Value</div>
                      </header>
                      <Form.Item name="invoice_start_prefix">
                        <Input placeholder='(optional)' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <header className='labelHeader'>
                        <div>Company Invoice #</div>
                        <div>Starting Value</div>
                      </header>
                      <Form.Item
                        name='invoice_start'
                        rules={[
                          {
                            validator(_, value) {
                              if (value && !numberCheck.test(value)) {
                                return Promise.reject('Invalid number!')
                              }
                              return Promise.resolve()
                            }
                          }
                        ]}
                      >
                        <Input style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                      </Form.Item>
                    </Col>
                   
                    <Col span={6}></Col>
                  </Row>
                  <Row gutter={[18, 0]} style={{ marginBottom: 20 }}>
                    <Col span={6}></Col>
                    <Col span={6}>
                      <header className='labelHeader'>
                        <div></div>
                        <div>Send copies of invoices to:</div>
                      </header>
                      <Form.Item
                        name='copy_invoices_user'
                      >
                        <Select
                          showSearch
                          className='antdSelect'
                          defaultValue='N/A'
                          optionFilterProp="children"
                          filterOption={(input, option) => {
                            return (
                              option.title?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            );
                          }}
                        >
                          {companyUsers && companyUsers.map(res => (
                            <Option key={[res.email]} title={`${res.firstname} ${res.lastname}`} value={res.email}>{res.firstname} {res.lastname}</Option>
                          ))}
                          <Option value='N/A'>N/A</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <header className='labelHeader'>
                        <div></div>
                        <div>Send copies of reports to:</div>
                      </header>
                      <Form.Item
                        name='copy_reports_user'
                      >
                        <Select
                          showSearch
                          className='antdSelect'
                          defaultValue='N/A'
                          optionFilterProp="children"
                          filterOption={(input, option) => {
                            return (
                              option.title?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            );
                          }}
                        >
                          {companyUsers && companyUsers.map(res => (
                            <Option key={[res.email]} title={`${res.firstname} ${res.lastname}`} value={res.email}>{res.firstname} {res.lastname}</Option>
                          ))}
                          <Option value='N/A'>N/A</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={6}></Col>
                  </Row>
                  <Row>
                    <Col span={6}></Col>
                    <Col span={12}>
                      {companyAdmins && companyAdmins.map(res => (
                        <Form.Item key={res?.id}>
                          <Input disabled style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} value={res.email} />
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Select className='antdSelect' value={discountSelect} onChange={discountChange}>
                          <Select.Option value='enabled'>Discounts: Enabled</Select.Option>
                          <Select.Option value='disabled'>Discounts: Disabled</Select.Option>
                        </Select>
                      </Form.Item>
                      <div style={{ textAlign: 'center', fontWeight: 700, marginBottom: 5 }}>Discount Teirs</div>
                      <Form.Item name='discount'>
                        <Checkbox.Group options={discountOptions} disabled={discountStatus}  />
                      </Form.Item>
                    </Col>
                    <Col span={6}></Col>
                  </Row>
                  
                  <div className='row'>
                    <div className='col-md-5'>
                      <Button type="primary" htmlType="submit">Save Settings</Button>
                    </div>
                  </div>
                </Form>
              </div>
              )
              : (
                <>Only administrators have access to this page, if you require changes to the company page, please contact your administrator.
                </>
              )
            }
          </Container>
          <ComfirmModal
            content='Are you sure you would like to create a company?'
            modal_center={modal_center}
            setmodal_center={setmodal_center}
            tog_center={tog_center}
            type={'create-company'}
            data={{ create_user_id: currentUser?.sub, create_user_email: currentUser?.email }}
          />
          <SuccessModal
            title='Updated Successfully!'
            content='Your company information upadated'
            modal_center={modal_center1}
            setmodal_center={setmodal_center1}
            tog_center={tog_center1}
          />
          <ST.StyleModal title="Users" visible={isModalVisible}  onCancel={handleCancel}>
            <p>
              {/* <Form form={form} name="control-hooks" onFinish={onFinish}> */}
              <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                initialValues={{ message: 'Join the rest of your team at DOP Test Network!' }}
              >
                <Form.Item name="email" label="User Email"
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
                  <Input style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                </Form.Item>
                <Form.Item name="message" label="Message"
                  rules={[{ required: true, message: 'This field is required' }]}
                >
                  <TextArea
                    rows={4}
                    style={{ width: '100%', borderRadius: '0.25rem' }}
                  />
                </Form.Item>
                <Form.Item name="role_id" label="Role"
                  rules={[{ required: true, message: 'This field is required' }]}
                >
                  <Select
                    style={{ width: 200 }}
                  >
                    {roleList.map(res => (
                      res.id !== 1 && (
                        <Option key={res.id} value={res.id}>{res.name}</Option>
                      )
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 5, span: 19 }} style={{ textAlign: 'left' }}>
                  <Button htmlType="button" onClick={() => setIsModalVisible(false)}>
                    Cancel
                  </Button>
                  <Button disabled={sendButton} type="primary" htmlType="submit" >
                    Send
                  </Button>
                </Form.Item>
              </Form>
            </p>
          </ST.StyleModal>
          <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handlePreviewCancel}>
            <img
              alt="example"
              style={{
                width: '100%',
              }}
              src={previewImage}
            />
          </Modal>
          <Modal visible={subscriptionModal} width='900px' footer={null} onCancel={() => SetSubscriptionModal(false)}>
            {/* <div  style={{ display: 'flex', justifyContent: 'center', gap: '40px', padding: '30px' }}>
              <ST.SubscriptionCard className={subscriptionLevel === 'basic' ? 'selected' : ''}>
                <div className='basic'>
                  <header>
                    Basic
                  </header>
                  <nav>
                    $2.99
                  </nav>
                  <section>
                    <div>
                      <CheckOutlined />
                      Sample Text Here
                    </div>
                    <div>
                      <CheckOutlined />
                      Sample Text Here
                    </div>
                    <div>

                      <CheckOutlined />
                      Sample Text Here
                    </div>
                    <div>
                      <CloseOutlined />
                      Sample Text Here
                    </div>
                    <div>
                      <CloseOutlined />
                      Sample Text Here
                    </div>
                  </section>
                  {!subscriptionLevel && (
                    <footer onClick={() => subscriptionSelect('basic')}>
                      Buy Now
                    </footer>
                  )}
                  {subscriptionLevel && subscriptionLevel !== 'basic' && (
                    <footer onClick={() => subscriptionSelect('basic')}>
                      Downgrade
                    </footer>
                  )}
                </div>
              </ST.SubscriptionCard>
              <ST.SubscriptionCard className={subscriptionLevel === 'standard' ? 'selected' : ''}>
                <div className='standard'>
                  <header>
                    Standard
                  </header>
                  <nav>
                    $5.99
                  </nav>
                  <section>
                    <div>
                      <CheckOutlined />
                      Sample Text Here
                    </div>
                    <div>
                      <CheckOutlined />
                      Sample Text Here
                    </div>
                    <div>
                      <CheckOutlined />
                      Sample Text Here
                    </div>
                    <div>
                      <CheckOutlined />
                      Sample Text Here
                    </div>
                    <div>
                      <CloseOutlined />
                      Sample Text Here
                    </div>
                  </section>
                  {!subscriptionLevel && (
                    <footer onClick={() => subscriptionSelect('standard')}>
                      Buy Now
                    </footer>
                  )}
                  {subscriptionLevel === 'premium' && (
                    <footer onClick={() => subscriptionSelect('standard')}>
                      Downgrade
                    </footer>
                  )}
                  {subscriptionLevel === 'basic' && (
                    <footer onClick={() => subscriptionSelect('standard')}>
                      Upgrade
                    </footer>
                  )}
                </div>
              </ST.SubscriptionCard>
              <ST.SubscriptionCard className={subscriptionLevel === 'premium' ? 'selected' : ''}>
              <div className='premium'>
                <header>
                  Premium
                </header>
                <nav>
                  $9.99
                </nav>
                <section>
                  <div>
                    <CheckOutlined />
                    Sample Text Here
                  </div>
                  <div>
                    <CheckOutlined />
                    Sample Text Here
                  </div>
                  <div>
                    <CheckOutlined />
                    Sample Text Here
                  </div>
                  <div>
                    <CheckOutlined />
                    Sample Text Here
                  </div>
                  <div>
                    <CheckOutlined />
                    Sample Text Here
                  </div>
                </section>
                {!subscriptionLevel && (
                  <footer onClick={() => subscriptionSelect('premium')}>
                    Buy Now
                  </footer>
                )}
                {subscriptionLevel && subscriptionLevel !== 'premium' && (
                  <footer onClick={() => subscriptionSelect('premium')}>
                    Upgrade
                  </footer>
                )}
              </div>
            </ST.SubscriptionCard>
            </div> */}
            {/* <div className="grid gap-4 m-auto">
              <Input
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <Input
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <CardElement />
              <Button onClick={createSSubscription} disabled={!stripe}>
                Pay Now
              </Button>
            </div> */}
            <ST.SubscriptionModal>
              <nav>
                $99.99
              </nav>
              {!companySubscriptionId ? (
                <Row>
                  <Col span={2}></Col>
                  <Col span={20}>
                    <Form
                      form={formStripe}
                      onFinish={createSubscription}
                    >
                      <Form.Item name="name" rules={[{ required: true, message: 'This field is required' }]}>
                        <Input placeholder='Name' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                      </Form.Item>
                      <Form.Item
                        name="email"
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
                        <Input placeholder='Email' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                      </Form.Item>
                      {error && <span className="error">{error}</span>}
                      <div className='cardInfoRow'>
                        <label>Card number</label>
                        <CardNumberElement
                          options={CARD_ELEMENT_OPTIONS}
                          onChange={handleChangeStripeInput}
                        />
                      </div>
                      <div className='cardInfoRow'>
                        <label>Expiration date</label>
                        <CardExpiryElement
                          options={CARD_ELEMENT_OPTIONS}
                          onChange={handleChangeStripeInput}
                        />
                      </div>
                      <div className='cardInfoRow'>
                        <label>CVC</label>
                        <CardCvcElement
                          options={CARD_ELEMENT_OPTIONS}
                          onChange={handleChangeStripeInput}
                        />
                      </div>
                      <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Button type="primary" htmlType="submit" disabled={payProgress}>
                          Buy Now
                        </Button>
                      </div>
                    </Form>
                  </Col>
                  <Col span={2}></Col>
                </Row>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Button danger type='primary' disabled={payProgress} onClick={() => cancelSubscription()}>Stop Subscription</Button>
                </div>
              )}
            </ST.SubscriptionModal>
          </Modal>
        </ST.CompanyWrapper>
      </div>
    </React.Fragment>
  )
}

export default Company