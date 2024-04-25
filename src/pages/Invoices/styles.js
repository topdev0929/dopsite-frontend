import styled from 'styled-components'

export const Wrapper = styled.div`
  table {
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

export const GeneratedWrapper = styled.div`

.pdf-page.size-a4 {
  width: 6.2in;
  height: 8.7in;
  .invoiceDateTable {
    margin-top: 0;
    font-size: 12px;
  }
  td, th {
    padding: 5px;
  }
  td {
    font-size: 12px;
  }
}

.pdf-page.size-letter {
  width: 6.3in;
  height: 8.2in;
  .invoiceDateTable {
    margin-top: 0;
    font-size: 12px;
  }
  td, th {
    padding: 5px;
  }
  td {
    font-size: 12px;
  }
}

.pdf-page.size-executive {
  width: 5.4in;
  height: 7.8in;
  font-size: 12px;
  .invoiceDateTable {
    margin-top: 0;
    font-size: 11px;
  }
  td, th {
    padding: 5px;
  }
  td {
    font-size: 12px;
  }
}
.size-executive  .pdf-header {
  margin-bottom:  .1in;
}
.pdf-page {
  position:  relative;
  margin:  0  auto;
  padding:  .4in  .3in;
  color:  #333;
  background-color:  #fff;
  box-shadow:  0  5px  10px  0  rgba(0,0,0,.3);
  box-sizing:  border-box;
  font-family: "DejaVu Sans";
  @font-face {
    font-family: "DejaVu Sans";
    src: url("https://kendo.cdn.telerik.com/2021.2.511/styles/fonts/DejaVu/DejaVuSans.ttf") format("truetype");
  }
  margin-top: 30px;
  margin-bottom: 30px;
  .panelFirst {
    margin-top: 0;
  }
}

.panelFirst {
  margin-top: 30px;
  .col-md-6:last-child {
    font-size: 16px;
    &>div:first-child {
      font-weight: 700;
      font-size: 22px;
    }
  }
}
.invoiceDateTable {
  margin-top: 10px;
  div {
    width: 50%;
    margin-left: 50%;
    text-align: center;
    section {
      display: inline-block;
      width: 49.99%;
      border: 1px solid black;
      background: #D9D9D9;
      border-bottom: none;
      border-right: none;
    }
    section:last-child {
      border-right: 1px solid black;
    }
  }
  div:last-child section {
    border-bottom: 1px solid black;
  }
}
.plusIcon {
  position: absolute;
  bottom: 10px;
  right: -4px;
  svg path:first-child {
    transition: fill 0.7s;
  }
}
.col-md-2>div {
  cursor: pointer;
}
.col-md-2:hover {
  &>div:first-child {
    box-shadow: 0px 4px 25px 10px rgb(0 0 0 / 6%);
  }
  .plusIcon svg path:first-child {
    fill: #D14124;
  }
}
.col-md-2>div:first-child {
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
  padding: 30px 0;
  transition: box-shadow 0.7s;
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
  margin-top: 10px;
  // font-size: 11px;
  line-height: 14px;
  margin-bottom: 10px;
  button {
    background: linear-gradient(90deg, #D14124 -0.05%, #B02509 99.95%);
    box-shadow: 0px 4px 25px rgba(255, 0, 0, 0.2);
    border-radius: 4px;
    color: white;
    margin-bottom: 20px;
    padding-left: 25px;
    padding-right: 25px;
  }
  .ant-col-12 {
    section {
      border: 1px solid;
      padding: 5px 0;
      height: 100%;
      div:first-child {
        border-bottom: 1px solid;
        font-weight: 600;
        margin-bottom: 3px;
      }
      div {
        padding-left: 5px;
        padding-right: 5px;
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
table {
  thead tr th {
    background: black;
    color: white;
    font-weight: 500;
    text-align: center;
  }
  tr td {
    text-align: center;
  }
  tr:last-child td {
    background: #737272 !important;
    color: white;
  }
  .grayTr td {
    background: #D9D9D9 !important;
  }
  tr td.colorNone {
    color: transparent;
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
.form-group {
  display: inline-block;
  width: 100px;
  margin-bottom: 15px;
  position: relative;
  margin-left: 10px;
  span.inputTitle {
    position: absolute;
    top: -10px;
    left: 15px;
    padding: 0 8px;
    background: white;
  }
  .anticon.anticon-down {
    position: absolute;
    top: 12px;
    right: 10px;
    width: 12px;
    height: auto;
  }
}
`