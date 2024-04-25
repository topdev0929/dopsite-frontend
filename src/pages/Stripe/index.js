import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js';
import { Button, Form, Input, Row, Col } from 'antd';

//import images
import * as ST from './styles'
import { getInvoice, paymentSecret, payed } from '../../data/invoice.js'
import SuccessModal from '../../components/Modal/successModal'

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

const getBillingDetails = (values) => {
  return {
    address: {
      // You can use select elements to accept more countries, cities, states
      // and retrieve the data from "values"
      city: values.city,
      country: values.country,
      state: values.state,
      line1: values.address,
      line2: null,
      postal_code: values.zip
    },
    email: values.email,
    name: values.name,
    phone: values.phone
  };
}
const validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PageMaintenance = props => {
  const [paymentInfo, setPaymentInfo] = useState()
  const [payProgress, setPayProgress] = useState(false)
  const [modal_center1, setmodal_center1] = useState(false);
  const [error, setError] = useState('')
  const [form] = Form.useForm()
  const { id } = useParams()

  // The useStripe hook returns a reference to the Stripe instance passed to the Elements provider.
  const stripe = useStripe();

  // To safely pass the payment information collected by an Element to the Stripe API, access the component’s underlying Element instance so that you can use it with other Stripe.js methods.
  const elements = useElements();

  useEffect(() => {
    getInvoice({ id: id }).then(res => {
      if (res && res.length) {
        setPaymentInfo(res[0])
      }
    })
  }, [id])

  const changeDate = dateString => {
    let currentDate = new Date(dateString * 1000)
    return currentDate.toLocaleDateString() + ' ' + currentDate.toLocaleTimeString()
  }

  const handleSubmit = async val => {
    const isStripeLoading = !stripe || !elements;
    setPayProgress(true)

    if (isStripeLoading) {
      // Make sure to disable form submission until Stripe has loaded
      return;
    }
    try {
      const param = {
        id: id,
        email: val.email
      }
      const data = await paymentSecret(param)

      // ------- simple cardpayment method (pay to site account)

      const cardPayment = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: getBillingDetails(val)
        }
      });
      if (cardPayment.error) {
        setError(cardPayment.error.message);
        setPayProgress(false)
      } else if (cardPayment.paymentIntent.status === 'succeeded') {
        payed({
          id: id,
          paider_name: val.name,
          paider_email: val.email,
          // amount: (cardPayment.paymentIntent.amount / 100).toFixed(2),
          fee_status: paymentInfo?.fee_status,
          paid_date: changeDate(cardPayment.paymentIntent.created)
        }).then(() => {
            setmodal_center1(true)
        })
        setPayProgress(false)
      }
    } catch (err) {
      console.log(err)
      setPayProgress(false)
    }
  }

  const handleChange = (event) => {
    // Set error message to be shown when the user inputs incorrect payment data
    if (event.error) {
      setError(event.error.message);
    } else {
      setError('');
    }
  }

  const tog_center1 = () => {
    setmodal_center1(!modal_center1)
  }

  return (
    <ST.Wrapper>
      <MetaTags>
        <title>Payment | DOP Test Network</title>
      </MetaTags>
      {paymentInfo ? (
        <>
          <header>
            <h1>Checkout</h1>
          </header>
          <Form
            form={form}
            onFinish={handleSubmit}
          >
            <Row gutter={[24, 24]}>
              <Col span={8}></Col>
              {/* <Col span={8}>
                <Form.Item name="name" rules={[{ required: true, message: 'This field is required' }]}>
                  <Input placeholder='Name' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                </Form.Item>
                <Form.Item
                  name="phone"
                  rules={[
                    { required: true, message: 'This field is required' },
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
                  <Input placeholder='Phone number' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
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
                <Form.Item name="country" rules={[{ required: true, message: 'This field is required' }]}>
                  <Input placeholder='Country' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                </Form.Item>
                <Form.Item name="city">
                  <Input placeholder='City' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                </Form.Item>
                <Form.Item name="state">
                  <Input placeholder='State' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                </Form.Item>
                <Form.Item name="zip">
                  <Input placeholder='Zip' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                </Form.Item>
                <Form.Item name="address">
                  <Input placeholder='Address' style={{ width: '100%', height: '38px', borderRadius: '0.25rem' }} />
                </Form.Item>
              </Col> */}
              <Col span={8}>
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
                    onChange={handleChange}
                  />
                </div>
                <div className='cardInfoRow'>
                  <label>Expiration date</label>
                  <CardExpiryElement
                    options={CARD_ELEMENT_OPTIONS}
                    onChange={handleChange}
                  />
                </div>
                <div className='cardInfoRow'>
                  <label>CVC</label>
                  <CardCvcElement
                    options={CARD_ELEMENT_OPTIONS}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <Button type="primary" htmlType="submit" disabled={payProgress}>
                    Pay ${paymentInfo.amount} 
                    {paymentInfo?.fee_status ? (
                      <>(+{((Number(paymentInfo.amount) + 0.3)/(1 - 0.035) - Number(paymentInfo.amount)).toFixed(1)})</>
                    ) : ''}
                  </Button>
                </div>
              </Col>
              <Col span={8}></Col>
            </Row>
          </Form>
        </>
      ) : null}
      <SuccessModal
        title='Successfully!'
        content={paymentInfo?.fee_status ? `You payed $${((Number(paymentInfo?.amount) + 0.3)/(1 - 0.029)).toFixed(1)}` : `You payed $${paymentInfo?.amount}`}
        modal_center={modal_center1}
        setmodal_center={setmodal_center1}
        tog_center={tog_center1}
      />
    </ST.Wrapper>
  )
}

export default PageMaintenance;