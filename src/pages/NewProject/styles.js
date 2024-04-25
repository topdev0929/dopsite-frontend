import styled from 'styled-components'

export const Wrapper = styled.div`
  & {
    .customerSelect {
      .ant-form-item-explain-error {
        margin-top: 0px !important;
      }
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
    header ~ .row:nth-child(3) {
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
      margin-top: 50px;
    }
  }
  .antdSelect .ant-select-selector {
    height: 38px;
    border-radius: 0.25rem;
  }
`