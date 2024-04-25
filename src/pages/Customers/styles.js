import styled from 'styled-components'

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
  .newCustomer>div {
    cursor: pointer;
  }
  .newCustomer>div:first-child {
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
  .newCustomer:hover {
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
  .newCustomer {
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
` 

export const EditWrapper = styled.div`
  & {
    .ant-form-item {
      margin-bottom: 10px;
    }
    .ant-form-item-explain-error {
      margin-top: -10px;
    }
    header {
      font-size: 15px;
      cursor: pointer;
      display: inline-block;
      span {    
        line-height: 15px;
        margin-left: 4px;
      }
      i, span {
        line-height: 15px;
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
      img, .anticon.anticon-down {
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
    .row.header:nth-child(3) {
      margin-top: 30px;
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
`

export const DetailWrapper = styled.div`
  header.back {
    margin-bottom: 10px;
    font-size: 15px;
    cursor: pointer;
    display: inline-block;
    span {    
      line-height: 15px;
      margin-left: 4px;
    }
    i, span {
      line-height: 15px;
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
  .panel {
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
      }
      div {
        font-style: normal;
        font-weight: 500;
        color: #7F7F7F;
      }
      nav {
        font-style: normal;
        font-weight: 700;

        color: #000000;
      }
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
    }
  }
`