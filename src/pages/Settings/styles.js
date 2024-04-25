import styled from 'styled-components'
import { Modal } from 'antd'

export const Wrapper = styled.div`
  button.newCustomer {
    background: linear-gradient(90deg, #D14124 -0.05%, #B02509 99.95%);
    box-shadow: 0px 4px 25px rgba(255, 0, 0, 0.2);
    border-radius: 4px;
    color: white;
    margin-bottom: 20px;
    padding-left: 25px;
    padding-right: 25px;
  }
  table {
    .statusBadge {
      padding: 5px 10px;
      border-radius: 3px;
      color: white;
      font-weight: 500;
    }
    .statusBadge.Active {
      background: hsl(102, 53%, 61%);
    }
    .statusBadge.Disabled {
      background: #f50;
    }
    .statusBadge.Invitation.sent {
      background: hwb(205 6% 9%);
    }
    .statusBadge.Invitation.expired {
      background: #a6a0a0;
    }
    thead {

    }
    tr {
      border-style: hidden !important;
      th {
        background: #ccc;
      }
      td:not(:last-child), th:not(:last-child) {
        position: relative;
        &::after {
          height: 50%;
          border-right: 1px solid gainsboro;
          content: '';
          position: absolute;
          right: 0;
        }
      }
      td:last-child a {
        color: #D14124 !important;
        font-weight: 700;
      }
      td.greenBg {
        color: #00B031;
        font-weight: 700;
      }
    }
  }
`

export const CompanyWrapper = styled.div`
  header.labelHeader {
    div:first-child {
      color: rgb(217, 217, 217);
    }
    div:last-child {
      font-weight: 700;
      margin-bottom: 5px;
    }
  }
  .subscriptionLevel {
    text-align: center;
    & > div:first-child {
      margin-bottom: 20px;
    }
    & > div:nth-child(2) {
      border: 1px solid rgb(217, 217, 217);
      padding: 14px 0;
      border-radius: 0.25rem;
      font-weight: 700;
      text-transform: uppercase;
    }
    & > div:last-child {
      margin-top: 20px;
      margin-bottom: 30px;
      text-decoration: underline;
      color: #D14124;
      cursor: pointer;
    }
  }
  .antdSelect .ant-select-selector {
    height: 38px;
    border-radius: 0.25rem;
  }
  div.ant-checkbox-group {
    display: flex;

    > label.ant-checkbox-wrapper {
      font-size: 14px;
      align-items: center;
      margin: 0;
      width: auto;
      padding: 0 15px;
      border: 1px solid rgb(217, 217, 217);
      height: 38px;
      width: 24.24999%;
      text-aligin: center;
      display: flex;
      justify-content: center;
      margin-right: 1%;

      > span:first-child {
        display: none;
      }
      > span:last-child {
        padding: 0;
      }
    }

    > label.ant-checkbox-wrapper-checked {
      // border: 1px solid #1890ff;
      background: linear-gradient(90deg, #D14124 -0.05%, #B02509 99.95%);
      color: white;
    }
    > label.ant-checkbox-wrapper-checked + label.ant-checkbox-wrapper {
      border-left-width: 0;
    }

    > label.ant-checkbox-wrapper:last-child {
      margin-right: 0;
    }
  }


  button.newCustomer {
    background: linear-gradient(90deg, #D14124 -0.05%, #B02509 99.95%);
    box-shadow: 0px 4px 25px rgba(255, 0, 0, 0.2);
    border-radius: 4px;
    color: white;
    margin-bottom: 20px;
    padding-left: 25px;
    padding-right: 25px;
  }
  .form-group {
    margin-bottom: 15px;
    position: relative;
    span.inputTitle {
      position: absolute;
      top: -10px;
      left: 15px;
      padding: 0 8px;
      background: white;
    }
    img {
      position: absolute;
      top: 12px;
      right: 10px;
      width: 12px;
      height: auto;
    }
  }
  .profileImg img {
    border-radius: 100%;
  }
  #signature {
    display: flex;
    height: 100%;
  }
  #signature ~ img {
    top: calc(50% - 5px) !important;
  }
  .row {
      display: flex;
      justify-content: center;
      margin-top: 30px;
  }
  .col-md-5 button {
    width: 100%;
    background: linear-gradient(90deg, #D14124 -0.05%, #B02509 99.95%);
    box-shadow: 0px 4px 25px rgba(255, 0, 0, 0.2);
    border-radius: 4px;
    color: white;
  }
`

export const StyleModal = styled(Modal)`
  & {
    .ant-modal-footer {
      display: none !important;
    }
    .ant-modal-header {
      display: none !important;
    }
    .ant-modal-close {
      display: none !important;
    }
    .ant-modal-body {
      p {
        margin-top: 20px;
        form>div:last-child {
          text-align: right;
        }
        button:first-child {
          margin-right: 10px;
        }
      }
    }
  }
`

export const ProfileWrapper = styled.div`
  & {
    .form-group {
      margin-bottom: 15px;
      position: relative;
      span.inputTitle {
        position: absolute;
        top: -10px;
        left: 15px;
        padding: 0 8px;
        background: white;
      }
      img {
        position: absolute;
        top: 12px;
        right: 10px;
        width: 12px;
        height: auto;
      }
    }
    .profileImg img {
      border-radius: 100%;
    }
    #signature {
      display: flex;
      height: 100%;
    }
    #signature ~ img {
      top: calc(50% - 5px) !important;
    }
    .col-md-5 button {
      width: 100%;
      background: linear-gradient(90deg, #D14124 -0.05%, #B02509 99.95%);
      box-shadow: 0px 4px 25px rgba(255, 0, 0, 0.2);
      border-radius: 4px;
      color: white;
    }
    .row:nth-child(2) {
      margin-top: 30px;
      font-family: 'Montserrat';
      font-style: normal;
      font-size: 22px;
      text-align: center;
      margin-bottom: 30px;
    }
    .row:last-child {
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }
  }
  .signature {
    height: 70px;
    border: 1px solid rgb(204, 204, 204);
    cursor: pointer;
    border-radius: 0.25rem;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 100%;
      width: auto;
    }
  }
`

export const SubscriptionCard = styled.div`
  & > .basic {
    header, footer {
      color: #004B85;
    }
    nav {
      background: #004B85;
      color: white;
    }
  }
  & > .standard {
    header, footer {
      color: #01944D;
    }
    nav {
      background: #01944D;
      color: white;
    }
  }
  & > .premium {
    header, footer {
      color: #FF2468;
    }
    nav {
      background: #FF2468;
      color: white;
    }
  }
  &.selected {
    box-shadow: 0px 0px 20px 5px gainsboro;
  }
  & {
    border: 1px solid gainsboro;
    border-top-right-radius: 80px;
    border-bottom-left-radius: 80px;
    &>div {
      padding: 0 25px;
    }
    header {
      font-weight: 700;
      font-size: 27px;
      padding: 10px 0;
    }
    section {
      &>div {
        display: flex;
        align-items: center;
      }
      padding: 10px 0;
      span.anticon-check svg {
        color: #01944D;
        margin-right: 10px;
      }
      span.anticon-close svg {
        color: #FF2468;
        margin-right: 10px;
      }
    }
    nav {
      padding: 10px 35px;
      border-top-right-radius: 50px;
      border-bottom-left-radius: 50px;
      position: relative;
      left: -50px;
      font-size: 35px;
    }
    footer {
      text-align: right;
      padding: 10px 0;
      font-weight: 700;
      font-size: 22px;
      cursor: pointer;
    }
  }
`

export const SubscriptionModal = styled.div`
  margin-top: 20px;
  .StripeElement {
    height: 40px;
    padding: 10px 12px;
    width: 100%;
    color: #32325d;
    background-color: white;
    border: 1px solid transparent;
    border-radius: 4px;
  
    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }
  
  .StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }
  
  .StripeElement--invalid,
  .invalid {
    border-color: #fa755a;
  }
  
  .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }
  .cardInfoRow {
    label {
      margin: 5px 0;
    }
  }
  .error {
    color: tomato;
    margin-bottom: 5px;
  }
  nav {
    // background: #01944D;
    color: tomato;
    font-size: 50px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 30px;
  }
`
