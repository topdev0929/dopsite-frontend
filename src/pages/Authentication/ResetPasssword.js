import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import MetaTags from 'react-meta-tags';
import { Link } from "react-router-dom"

//import images
import logo from '../../assets/images/logo-sm-full.png'
import { checkResetPassword, sendPass } from '../../data/user'
import { Form, Button, Input } from 'antd'
import { Alert } from "reactstrap"

const VerifyEmail = props => {
  const [message, setMessage] = useState()
  const [sendMessage, setSendMessage] = useState()
  const { token } = useParams();
  const [form] = Form.useForm()

  useEffect(() => {
    checkResetPassword({ token: token }).then(res => {
      if (res) {
        setMessage('success')
      } else {
        setMessage('failed')
      }
    })
  }, [])
  const onFinish = val => {
    const data = val
    data.token = token
    sendPass(data).then(res => {
      setSendMessage('Reset your password successfully, you can sign in now.')
    })
  }
  return (
    <>
      <MetaTags>
        <title>Reset Password | DOP Test Network</title>
      </MetaTags>
      <div
        style={{
          textAlign: 'center',
          marginTop: 50,
        }}
      >
        <img src={logo} alt='' width='200' />
      </div>
      <div
      style={{
        fontFamily: 'PoppinsBold',
        fontStyle: 'normal',
        fontWeight: '500',
        textAlign: 'center',
        fontSize: '45px',
        width: '50%',
        margin: '0 auto',
        marginTop: 50
      }}
    >
      {message && (
        message === 'failed' && (
          <>
            <div className="alert alert-danger" role="alert">
              Email Verification was failed!
            </div>
            <Link style={{ fontSize: '25px' }} to='/login'>Sign In</Link>
            <span style={{ marginLeft: 30 }}>
              <Link style={{ fontSize: '25px', color: '#ccc' }} to='/admin'>Admin Sign In</Link>
            </span>
          </>
        )
      )}
      {message && (
        message === 'success' && (
          <>
            <div className="alert alert-primary" role="alert">
              Verified successfully
            </div>
            <div style={{ marginTop: 30 }}>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
              >
                {sendMessage ? (
                  <Alert color="success">
                    {sendMessage}
                  </Alert>
                ) : null}
                <Form.Item
                  label="Reset password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password
                    style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} >
                    Reset
                  </Button>
                </Form.Item>
              </Form>
              <Link style={{ fontSize: '25px' }} to='/login'>Sign In</Link>
              <span style={{ marginLeft: 30 }}>
                <Link style={{ fontSize: '25px', color: '#ccc' }} to='/admin'>Admin Sign In</Link>
              </span>
            </div>
          </>
        )
      )}
    </div>
    </>
  )
}

export default VerifyEmail;