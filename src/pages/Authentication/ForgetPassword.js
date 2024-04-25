import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useState } from "react"
import { Row, Col, Alert, Container } from "reactstrap"

//redux
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// action
import { sendEmail } from '../../data/user'

// import images
import logo from "../../assets/images/logo-sm-full.png"
import CarouselPage from "./CarouselPage"
import styled from 'styled-components'

const Wrapper = styled.div`
  .bg-primary {
    --bs-bg-opacity: 0.4 !important;
  }
`
const ForgetPasswordPage = props => {
  const [messageState, setMessageState] = useState()

  function handleValidSubmit(event, values) {
    sendEmail(values).then(res => {
      setMessageState(res)
    })
    // dispatch(userForgetPassword(values, props.history))
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>
          Forget Password | DOP Test Network
        </title>
      </MetaTags>
      <div className="auth-page">
        <Container fluid className="p-0">
          <Wrapper>
            <Row className="g-0">
              <Col lg={4} md={5} className="col-xxl-3">
                <div className="auth-full-page-content d-flex p-sm-5 p-4">
                  <div className="w-100">
                    <div className="d-flex flex-column h-100">
                      <div className="mb-4 mb-md-5 text-center">
                        <Link to="/dashboard" className="d-block auth-logo">
                          <img src={logo} alt="" width="200" />
                        </Link>
                      </div>
                      <div className="auth-content my-auto">
                        <div className="text-center">
                          <h5 className="mb-0">Reset Password</h5>
                        </div>

                        {messageState && !messageState?.success ? (
                          <Alert color="danger" style={{ marginTop: "13px" }}>
                            {messageState?.message}
                          </Alert>
                        ) : null}
                        {messageState && messageState?.success ? (
                          <Alert color="success" style={{ marginTop: "13px" }}>
                            {messageState?.message}
                          </Alert>
                        ) : null}

                        <AvForm className="custom-form mt-4"
                          onValidSubmit={(e, v) => handleValidSubmit(e, v)}
                        >
                          <div className="mb-3">
                            <AvField
                              name="email"
                              label="Email"
                              className="form-control"
                              placeholder="Enter email"
                              type="email"
                              required
                            />
                          </div>
                          <div className="mb-3 mt-4">
                            <button className="btn btn-primary w-100 waves-effect waves-light" type="submit">Reset</button>
                          </div>
                        </AvForm>

                        <div className="mt-5 text-center">
                          <p className="text-muted mb-0">Remember It ?  <Link to="/login"
                            className="text-primary fw-semibold"> Sign In </Link> </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <CarouselPage />
            </Row>
          </Wrapper>
        </Container>
      </div>
    </React.Fragment>
  )
}

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
}

export default withRouter(ForgetPasswordPage)
