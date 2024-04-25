import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import MetaTags from 'react-meta-tags';
import { useSelector, useDispatch } from "react-redux";

//import images
import logo from '../../assets/images/logo-sm-full.png'
import { verifyUser } from "../../store/actions"

const VerifyEmail = props => {
  const { token } = useParams();
  const dispatch = useDispatch()

  const { message } = useSelector(state => ({
    message: state.Login.verifyMessage,
  }))
  useEffect(() => {
    dispatch(verifyUser(token, props.history));
  }, [dispatch]);

  return (
    <>
      <MetaTags>
        <title>Verifying | DOP Test Network</title>
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
          <div className="alert alert-danger" role="alert">
            Email Verification was failed!
          </div>
        )
      )}
      {message && (
        message === 'verifying' && (
          <div className="alert alert-primary" role="alert">
            Verifying your email....
          </div>
        )
      )}
      {message && (
        message === 'success' && (
          <div className="alert alert-primary" role="alert">
            Verified successfully
          </div>
        )
      )}
    </div>
    </>
  )
}

export default VerifyEmail;