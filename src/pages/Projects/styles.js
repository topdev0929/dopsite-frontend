import styled from 'styled-components'
import { Modal } from 'antd'

export const Wrapper = styled.div`
  .newProject>div {
    cursor: pointer;
  }
  .newProject>div:first-child {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    color: #7F7F7F;
    background: #FFFFFF;
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    transition: box-shadow 0.7s;
    padding: 30px;
    &>div {
      margin-top: 10px;
    }
  }
  .newProject:hover {
    &>div:first-child {
      box-shadow: 0px 4px 25px 10px rgb(0 0 0 / 6%);
    }
    .plusIcon svg path:first-child {
      fill: #D14124;
    }
    .plusIcon svg path:nth-child(2) {
      fill: white;
    }
  }
  .newProject {
    display: inline-block;
    position: relative;
    margin-bottom: 20px;
  }
  .plusIcon {
    position: absolute;
    bottom: -18px;
    right: -12px;
    svg path:first-child {
      transition: fill 0.7s;
    }
    svg path:nth-child(2) {
      fill: #D14124;
    }
  }
  table {
    tr {
      border-style: none !important;
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
      td.greenBg {
        color: #00B031;
        font-weight: 700;
      }
      td:last-child {
        span:first-child {
          color: #7d7dd5;
          cursor: pointer;
          font-weight: 700;
        }
        span:nth-child(2) {
          color: #00B031;
          cursor: pointer;
          font-weight: 700;
          margin-left: 10px;
        }
        span:last-child {
          color: #D14124 !important;
          font-weight: 700;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
  }
`

export const AddMachineWrapper = styled.div`
  .antdSelect .ant-select-selector {
    height: 38px;
    border-radius: 0.25rem;
  }
  .ant-radio-group>label {
    margin-right: 10px;
  }
  .back {
    margin-bottom: 10px;
    color: black;
    font-size: 20px;
    display: inline-block;
    align-items: center;
    cursor: pointer;
    span {
      margin-left: 10px;
    }
    i {
      line-height: 20px;
    }
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
  header {
    font-style: normal;
    font-weight: 500;
    color: #7F7F7F;
    margin-bottom: 20px;
    span {
      font-weight: 700;
      color: #000000;
    }
  }
  footer {
    .row:last-child {
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }
    button {
      width: 100%;
      background: linear-gradient(90deg, #D14124 -0.05%, #B02509 99.95%);
      box-shadow: 0px 4px 25px rgba(255, 0, 0, 0.2);
      border-radius: 4px;
      color: white;
    }
  }
  .signature {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      border: 1px solid gainsboro;
      min-width: 100%;
    }
    span {
      cursor: pointer;
      color: #40a9ff;
      padding: 10px 35px;
      border: 1px solid gainsboro;
    }
  }
`

export const EditWrapper = styled.div`
  & {
    .ant-form-item-explain-error {
      margin-top: -10px;
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
    .col-md-5 button {
      width: 100%;
      background: linear-gradient(90deg, #D14124 -0.05%, #B02509 99.95%);
      box-shadow: 0px 4px 25px rgba(255, 0, 0, 0.2);
      border-radius: 4px;
      color: white;
    }
    .row.header {
      margin-top: 10px;
      font-family: 'Montserrat';
      font-weight: 700;
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
  .back {
    margin-bottom: 10px;
    color: black;
    font-size: 20px;
    display: inline-block;
    align-items: center;
    cursor: pointer;
    span {
      margin-left: 10px;
      line-height: 20px;
    }
    i {
      line-height: 20px;
    }
  }
  .antdSelect .ant-select-selector {
    height: 38px;
    border-radius: 0.25rem;
  }
`

export const EditMachineWrapper = styled.div`
  .antdSelect .ant-select-selector {
    height: 38px;
    border-radius: 0.25rem;
  }
  .ant-radio-group>label {
    margin-right: 10px;
  }
  .back {
    margin-bottom: 10px;
    color: black;
    font-size: 20px;
    display: inline-block;
    align-items: center;
    cursor: pointer;
    span {
      margin-left: 10px;
    }
    i {
      line-height: 20px;
    }
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
  header {
    font-style: normal;
    font-weight: 500;
    color: #7F7F7F;
    margin-bottom: 20px;
    span {
      font-weight: 700;
      color: #000000;
    }
  }
  footer {
    .row:last-child {
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }
    button {
      width: 100%;
      background: linear-gradient(90deg, #D14124 -0.05%, #B02509 99.95%);
      box-shadow: 0px 4px 25px rgba(255, 0, 0, 0.2);
      border-radius: 4px;
      color: white;
    }
  }
  .signature {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      border: 1px solid gainsboro;
      min-width: 100%;
    }
    span {
      cursor: pointer;
      color: #40a9ff;
      padding: 10px 35px;
      border: 1px solid gainsboro;
    }
  }
`

export const MachinesWrapper = styled.div`
.plusIcon {
  position: absolute;
  bottom: 25px;
  right: -4px;
  svg path:first-child {
    transition: fill 0.7s;
  }
  svg path:nth-child(2) {
    fill: #D14124;
    transition: fill 0.7s;
  }
}
.col-md-3.d-print-none {
  text-align: right;
}
.col-md-3.d-print-none>div {
  cursor: pointer;
  display: inline-block;
}
.col-md-3.d-print-none>div:last-child {
  display: block;
}
.col-md-3.d-print-none:hover {
  &>div:first-child {
    box-shadow: 0px 4px 25px 10px rgb(0 0 0 / 6%);

  }
  .plusIcon svg path:first-child {
    fill: #D14124;
  }
  .plusIcon svg path:nth-child(2) {
    fill: white;
  }
}
.col-md-3.d-print-none>div:first-child {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #7F7F7F;
  background: #FFFFFF;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  padding: 30px 30px;
  transition: box-shadow 0.7s;
}
.col-md-3.d-print-none>div:last-child {
  margin-top: 15px;
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
.panel {
  margin-top: 30px;
  .col-md-6 {
    text-align: right;
  }
  button {
    background: linear-gradient(90deg, #D14124 -0.05%, #B02509 99.95%);
    box-shadow: 0px 4px 25px rgba(255, 0, 0, 0.2);
    border-radius: 4px;
    color: white;
    margin-bottom: 20px;
    padding-left: 25px;
    padding-right: 25px;
  }
  .col-md-3 {
    margin-bottom: 20px;
    header {
      font-style: normal;
      font-weight: 700;
      color: #D14124;
      margin-bottom: 10px;
    }
    div {
      font-style: normal;
      font-weight: 500;
      color: #7F7F7F;
      span {
        font-weight: 700;
        color: #000000;
      }
    }
  }
}
.table-responsive footer {
  margin-top: 20px;
  text-align: right;
  button {
    background: linear-gradient(90deg,#D14124 -0.05%,#B02509 99.95%);
    box-shadow: 0px 4px 25px rgb(255 0 0 / 20%);
    border-radius: 4px;
    color: white;
    margin-bottom: 20px;
    padding-left: 30px;
    padding-right: 30px;
    margin-right: 15px;
  }
}
.table-responsive header {
  font-family: 'Montserrat';
  font-weight: 700;
  font-style: normal;
  font-size: 22px;
  text-align: center;
  margin-bottom: 30px;
  padding-top: 30px;
  border-top: 1px solid #cccccc;
}
table {
  tr {
    border-style: none !important;
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
    td.greenBg {
      color: #00B031;
      font-weight: 700;
    }
    td:last-child {
      span:first-child {
        color: #00B031;
        cursor: pointer;
        font-weight: 700;
        margin-left: 10px;
      }
      span:last-child {
        color: #D14124 !important;
        font-weight: 700;
        margin-left: 10px;
        cursor: pointer;
      }
      span:nth-child(2) {
        color: blue !important;
        font-weight: 700;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
}
.back {
  color: black;
  font-size: 20px;
  display: inline-block;
  align-items: center;
  cursor: pointer;
  span {
    margin-left: 10px;
  }
  i {
    line-height: 20px;
  }
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
    header {
      font-weight: 700;
      font-size: 30px;
      text-align: center;
      margin-bottom: 20px;
    }
    nav, aside, div {
      text-align: center;
      margin-bottom: 20px;
    }
    aside span {
      color: #7F7F7F;
    }
  }
`