import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Row, Col, Alert, Container } from "reactstrap"
import { useParams } from "react-router-dom";
// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
// action
import { registerUser, apiError } from "../../store/actions"
//redux
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
// import images
import logoFull from '../../assets/images/logo-sm-full.png'
import CarouselPage from "./CarouselPage"
import styled from 'styled-components'
import { getUserByToken, sendPass } from '../../data/user'

const Wrapper = styled.div`
  .bg-primary {
    --bs-bg-opacity: 0.4 !important;
  }
  .auth-full-page-content {
    .auth-content {
      h5 {
        font-family: 'Montserrat' !important;
        font-style: normal;
        font-weight: 700;
        font-size: 28px !important;
        line-height: 38px;
        color: #000000;
      }
      h5 ~ p {
        font-family: 'Montserrat' !important;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: #ACACAC;
      }
      input {
        
      }
    }
    button.btn-primary {
      background: linear-gradient(90deg, #D14124 -0.05%, #B02509 99.95%);
      border: 0;
    }
    a.text-primary {
      color: #D14124 !important;
    }
    .w-100>.h-100 {
      justify-content: center;
    }
  }
`
const Register = props => {
  const dispatch = useDispatch()
  const { company_id } = useParams();
  const [email, setEmail] = useState()
  const [error, setError] = useState()

  const { user, registrationError } = useSelector(state => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }))

  useEffect(() => {
    getUserByToken({ token: company_id }).then(res => {
      setEmail(res.email)
    })
  }, [company_id])
  
  // handleValidSubmit
  const handleValidSubmit = values => {
    if (!company_id) {
      dispatch(registerUser(values))
    } else if (email) {
      sendPass({password: values.password, token: company_id, firstname: values.firstname, lastname: values.lastname}).then(res => {
        if (res) {
          setError('Registrated successfully, you can login now.')
        }
      })
    }
  }

  useEffect(() => {
    dispatch(apiError(""))
  }, [dispatch])

  return (
    <React.Fragment>
      <MetaTags>
        <title>Register | DOP & Test Nestwork</title>
      </MetaTags>
      <Wrapper>
        <div className="auth-page">
          <Container fluid className="p-0">
            <Row className="g-0">
              <Col lg={4} md={5} className="col-xxl-4">
                <div className="auth-full-page-content d-flex p-sm-5 p-4">
                  <div className="w-100">
                    <div className="d-flex flex-column h-100">
                      <div className="mb-4 mb-md-5 text-center">
                        <Link to="/dashboard" className="d-block auth-logo">
                          <img src={logoFull} alt="" width="200" />
                        </Link>
                      </div>
                      <div className="auth-content my-auto">
                        <div className="text-center">
                          <h5 className="mb-0">Register Account</h5>
                          <p className="text-muted mt-2">Get your free DOP Test Network account now.</p>
                        </div>
                        <AvForm
                          className="needs-validation custom-form mt-4 pt-2"
                          onValidSubmit={(e, v) => {
                            handleValidSubmit(v)
                          }}>
                          {user && user ? (
                            <Alert color="success">
                              An email has been sent to you, please verify your email address.
                            </Alert>
                          ) : null}

                          {error ? (
                            <Alert color="success">
                              {error}
                            </Alert>
                          ) : null}

                          {registrationError && registrationError ? (
                            <Alert color="danger">{registrationError}</Alert>
                          ) : null}

                          <div className="mb-3">
                            <AvField
                              id="email"
                              name="email"
                              label="Email"
                              className="form-control"
                              placeholder="Enter email"
                              type="email"
                              required
                              value={email}
                              disabled={company_id ? true : false}
                            />
                          </div>

                          <div className="mb-3">
                            <AvField
                              name="firstname"
                              label="First Name"
                              type="text"
                              required
                              placeholder="Enter First Name"
                            />
                          </div>
                          <div className="mb-3">
                            <AvField
                              name="lastname"
                              label="Last Name"
                              type="text"
                              required
                              placeholder="Enter Last Name"
                            />
                          </div>
                          <div className="mb-3">
                            <AvField
                              name="password"
                              label="Password"
                              type="password"
                              required
                              placeholder="Enter Password"
                            />
                          </div>
                          <div className="mb-3">
                            <button className="btn btn-primary w-100 waves-effect waves-light" type="submit">Register</button>
                          </div>
                        </AvForm>

                        <div className="mt-5 text-center">
                          <p className="text-muted mb-0">Already have an account ? <Link to="/login"
                            className="text-primary fw-semibold"> Login </Link> </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <CarouselPage />
            </Row>
          </Container>
        </div>
      </Wrapper>
    </React.Fragment>
  )
}

export default Register
