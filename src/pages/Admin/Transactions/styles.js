import styled from 'styled-components'
import { Modal } from 'antd'

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