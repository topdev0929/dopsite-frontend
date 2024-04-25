import styled from 'styled-components'

export const PrintWrapper = styled.div`
  padding: 1.2mm 2mm 1mm 2.6mm;
  font-family: Myriad !important;
  width: 101.6mm;
  height: 75.94mm;
  color: black;
  .header {
    font-size: 12px;
    line-height: 15px;
    img {
      max-width: 100%;
    }
  }
  .body {
    line-height: 15px;
    font-size: 12px;
  }
  .title {
    text-align: center;
    line-height: 16px;
  }
  .underline {
    border-bottom: 1px solid black;
  }
  .ant-checkbox + span {
    font-size: 10px;
  }
  .ant-checkbox-group {
    line-height: 10px;
    
  }
  .dopFailure{
    label:first-child, label:nth-child(3) {
      width: 35%;
    } 
  }
  .ant-checkbox-inner {
    width: 12px;
    height: 12px;
    border-color: black !important;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: black;
  }
  .ant-checkbox-wrapper span {
    color: black;
  }
  .ant-checkbox + span {
    font-size: 11px;
    font-weight: 600;
  }
`