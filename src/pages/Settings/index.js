import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import SuccessModal from '../../components/Modal/successModal'
//import Breadcrumbs
import { PlusOutlined } from '@ant-design/icons';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useSelector, useDispatch } from "react-redux"
import { openNotificationWithIcon } from '../../components/Modal/notification'
import { Button, Form, Input, Row, Col, Upload, Modal, Radio, Space } from 'antd';
import ImgCrop from 'antd-img-crop';
import {
  Container
} from "reactstrap";
import { requestCompanyFromRequester } from '../../data/notificate_invite';
import * as ST from './styles'
// import { getAllCompany } from '../../data/comany'
import { changeUserProfile, getUserCompanyInfo } from '../../data/user'
import { changeUserInfo } from "../../store/actions"
import AWS from 'aws-sdk'
import Signature from './Signature'

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
})
const myBucket = new AWS.S3({
  params: { Bucket: process.env.REACT_APP_BUCKET_NAME},
  region: process.env.REACT_APP_REGION,
})

const { TextArea } = Input
const validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const Settings = () => {
  const [modal_center, setmodal_center] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [signatureVisible, setSignatureVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  
  const [previewVisible_signature, setPreviewVisible_signature] = useState(false);
  const [previewImage_signature, setPreviewImage_signature] = useState('');
  const [previewTitle_signature, setPreviewTitle_signature] = useState('');
  const [fileList_signature, setFileList_signature] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [signatureBasePath, setSignatureBasePath] = useState()
  const [requestButtonLoading, setRequestButtonLoading] = useState(false)
  const [signatureLevel, setSignatureLevel] = useState()

  const [form] = Form.useForm()
  
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))

  useEffect(() => {
    getUserCompanyInfo({id: currentUser?.sub}).then((res) => {
      const params = {
        firstname: currentUser?.firstname,
        lastname: currentUser?.lastname, 
        email: currentUser?.email,
        company_name: res[0].company_name,
        role_name: res[0].name,
        logo: res[0].logo,
        signature_logo: res[0].signature_logo,
        signature: res[0].signature,
        signature_level: res[0].signature_level
      }
      if (params.signature_level) {
        setSignatureLevel(true)
      } else {
        setSignatureLevel(false)
      }
      if (params.logo) {
        setFileList([
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: `https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${params.logo}`,
          }
        ])
      }
      if (params.signature_logo) {
        setFileList_signature([
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: `https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${params.signature_logo}`,
          }
        ])
      }
      form.setFieldsValue(params)
      setSignatureBasePath(params.signature)
    })
  }, [currentUser])

  const [formModal] = Form.useForm();
  const tog_center = () => {
    setmodal_center(!modal_center)
  }
  const onFinish = (values) => {
    const reData = values
    delete reData.email
    delete reData.company_name
    delete reData.role_name
    if (!reData) {
      delete reData.password
    }
    if (values.signature_level) {
      values.signature_level = true 
    } else {
      values.signature_level = false 
    }
    reData.id = currentUser.sub

    changeUserProfile(reData).then(res => {
      dispatch(changeUserInfo(res.user))
      openNotificationWithIcon('success', 'Note', 'Changed your profile successfully')
    }).catch(err => {
      openNotificationWithIcon('error', 'Note', 'Failed')
    })
  }

  const onFinishModal = values => {
    const params = {
      requester: currentUser.sub,
      requester_email: currentUser.email,
      inviter_email: values.email,
      message: values.message
    }
    setRequestButtonLoading(true)
    requestCompanyFromRequester(params).then(res => {
      if (res?.message && res.message === 'not found' ) {
        openNotificationWithIcon('error', 'Note', 'Not found that email')
      } else {
        setIsModalVisible(false)
        openNotificationWithIcon('success', 'Note', 'Sent requested message successfully')
      }
      setRequestButtonLoading(false)
    }).catch(err => {
      openNotificationWithIcon('error', 'Note', 'Failed')
    })
  }

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

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
      // if (fileList[0]?.url) {
      //   const params = {
      //     Bucket: process.env.REACT_APP_BUCKET_NAME,
      //     Key: fileList[0].url.split(`https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/`)[1]
      //   }
      //   myBucket.deleteObject(params).promise()
      // }
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
        Upload Picture
      </div>
    </div>
  )

  const handlePreview_signature = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage_signature(file.url || file.preview);
    setPreviewVisible_signature(true);
    setPreviewTitle_signature(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange_signature = ({ fileList: newFileList }) => {
    if (newFileList && newFileList.length) {
      const params = {
        Body: newFileList[0].originFileObj,
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: newFileList[0].uid + '.' + newFileList[0].name.split('.')[newFileList[0].name.split('.').length - 1]
      };
      myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
        form.setFieldsValue({ signature_logo: params.Key })
      })
      .send((err) => {
          if (err) console.log(err)
      })
    } else {
      // if (fileList[0]?.url) {
      //   const params = {
      //     Bucket: process.env.REACT_APP_BUCKET_NAME,
      //     Key: fileList[0].url.split(`https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/`)[1]
      //   }
      //   myBucket.deleteObject(params).promise()
      // }
      form.setFieldsValue({ signature_logo: '' })
    }
    setFileList_signature(newFileList)
  }
  const uploadButton_signature = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload<br />Signature
      </div>
    </div>
  );
  
  const requestCompany = () => {
    if (!currentUser.company_id) {
      setIsModalVisible(true)
    } else {
      openNotificationWithIcon('error', 'Note', 'Failed: You are a stuff of company')
    }
  }

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };
  const signature = val => {
    setSignatureBasePath(val)
    form.setFieldsValue({ signature: val })
    setSignatureVisible(false)
  }
  const onChangeSignatureLevel = e => {
    if (e.target.value) {
      setSignatureLevel(true)
    } else {
      setSignatureLevel(false)
    }
    form.setFieldsValue({ signature_level: e.target.value })
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Settings | DOP Test Network</title>
        </MetaTags>
        <ST.ProfileWrapper>
          <Container fluid>
            <Breadcrumbs title="DOP" breadcrumbItem="Settings" />
            <Form
              form={form}
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Row>
                <Col span={19}></Col>
                <Col span={5} style={{ textAligin: 'right' }}>
                  {!currentUser?.company_id && (
                    <Button type="primary" style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }}  onClick={() => requestCompany()}>
                      Request Company
                    </Button>
                  )}
                </Col>
              </Row>
              <Row>
                <Col span={8}></Col>
                <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Form.Item>
                    <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                    >
                      {fileList.length > 0 ? null : uploadButton}
                    </Upload>
                  </Form.Item>
                  <Form.Item name='logo' style={{ display: 'none' }}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}></Col>
              </Row>
              <Row>
                <Col span={8}></Col>
                {signatureLevel ? (
                  <Col
                    span={8}
                    className='signature'
                    onClick={() => setSignatureVisible(true)}
                  >
                      {signatureBasePath ? (
                        <img alt='' src={signatureBasePath} />
                      ) : (
                        <span>Signature</span>
                      )}
                  </Col>
                ) : (
                  <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Form.Item>
                      <ImgCrop
                        rotate
                        aspect={170/50}
                        grid
                      >
                        <Upload
                          listType="picture-card"
                          fileList={fileList_signature}
                          onPreview={handlePreview_signature}
                          onChange={handleChange_signature}
                        >
                          {fileList_signature.length > 0 ? null : uploadButton_signature}
                        </Upload>
                      </ImgCrop>
                    </Form.Item>
                  </Col>
                )}
                <Col span={8}>
                  <Form.Item name='signature' style={{ display: 'none' }}>
                    <Input />
                  </Form.Item>
                  <Form.Item name='signature_logo' style={{ display: 'none' }}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[24, 0]}>
                <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Form.Item name='signature_level'>
                    <Radio.Group onChange={onChangeSignatureLevel}>
                      <Space>
                        <Radio value={1}>Signature</Radio>
                        <Radio value={0}>Upload</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[24, 0]}>
                <Col span={4}></Col>
                <Col span={8}>
                  <Form.Item
                    label="First Name"
                    name="firstname"
                    rules={[{ required: true, message: 'Please input your firstname!' }]}
                  >
                    <Input style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="lastname"
                    rules={[{ required: true, message: 'Please input your lastname!' }]}
                  >
                    <Input style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                  >
                    <Input disabled style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Company"
                    name="company_name"
                  >
                    <Input disabled style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                  </Form.Item>
                  <Form.Item
                    label="Role"
                    name="role_name"
                  >
                    <Input disabled style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                  >
                    <Input.Password style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                  </Form.Item>
                </Col>
                <Col span={4}></Col>
              </Row>
              <Row>
                <Col span={8}></Col>
                <Col span={8}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} >
                      Save
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={8}></Col>
              </Row>
            </Form>
          </Container>
          <SuccessModal
            title='Successfully!'
            content='Your profile updated'
            modal_center={modal_center}
            setmodal_center={setmodal_center}
            tog_center={tog_center}
          />
          <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img
              alt="example"
              style={{
                width: '100%',
              }}
              src={previewImage}
            />
          </Modal>
          <Modal visible={previewVisible_signature} title={previewTitle_signature} footer={null} onCancel={() => setPreviewVisible_signature(false)}>
            <img
              alt="example"
              style={{
                width: '100%',
              }}
              src={previewImage_signature}
            />
          </Modal>
        </ST.ProfileWrapper>
      </div>
      <ST.StyleModal title="Users" visible={isModalVisible}  onCancel={handleModalCancel}>
        <p>
          <Form
            form={formModal}
            name="control-hooks"
            onFinish={onFinishModal}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            initialValues={{ message: 'I`d like to join in your team at DOP Test Network!' }}
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
            <Form.Item wrapperCol={{ offset: 5, span: 19 }} style={{ textAlign: 'left' }}>
              <Button htmlType="button" onClick={() => setIsModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" disabled={requestButtonLoading}>
                Send
              </Button>
            </Form.Item>
          </Form>
        </p>
      </ST.StyleModal>
      <Modal visible={signatureVisible} title='Signature' footer={null} onCancel={() => setSignatureVisible(false)}>
        <Signature signature={signature} />
      </Modal>
    </React.Fragment>
  )
}

export default Settings;