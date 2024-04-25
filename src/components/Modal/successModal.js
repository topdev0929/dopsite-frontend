import React from 'react'
import { Modal } from "reactstrap";
import SuccessIcon from '../../assets/images/successIcon.png'
import styled from 'styled-components'

const Wrapper = styled(Modal)`
  & {
    padding: 30px;
    .modal-body {
      text-align: center;
      nav {
        font-weight: 700;
        font-size: 26px;
        margin: 15px 0 10px 0;
      }
    }
  }
`
const successModal = ({ title, content, modal_center, tog_center }) => {
  return (
    <Wrapper
      isOpen={modal_center}
      toggle={() => {
        tog_center()
      }}
      centered={true}
    >
      <div className="modal-body">
        <div>
          <img width={120} src={SuccessIcon} alt='' />
        </div>
        <nav>{title}</nav>
        <section>{content}</section>
      </div>
    </Wrapper>
  )
}

export default successModal
