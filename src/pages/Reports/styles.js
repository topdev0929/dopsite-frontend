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
button.newCustomer {
  background: linear-gradient(90deg, #D14124 -0.05%, #B02509 99.95%);
  box-shadow: 0px 4px 25px rgba(255, 0, 0, 0.2);
  border-radius: 4px;
  color: white;
  margin-bottom: 20px;
  padding-left: 25px;
  padding-right: 25px;
}
// .panelFirst {
//   margin-top: 5px;
//   .ant-col-12:last-child {
//     font-size: 16px;
//     &>div:first-child {
//       font-weight: 700;
//       font-size: 22px;
//     }
//   }
// }
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
footer {
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
  tr {
    th {
      background: #ccc;
      font-size: 10px;
      padding: 3px;
    }
    td {
      font-size: 10px;
      padding: 3px;
    }
    td:last-child {
      display: none;
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

.pdf-page.size-a4 {
  width: 6.2in;
  height: 8.7in;
}

.pdf-page.size-letter {
  width: 6.3in;
  height: 8.2in;
}

.pdf-page.size-executive {
  width: 5.4in;
  height: 7.8in;
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
  margin-top: 30px;

  font-family: "DejaVu Sans";
  @font-face {
    font-family: "DejaVu Sans";
    src: url("https://kendo.cdn.telerik.com/2021.2.511/styles/fonts/DejaVu/DejaVuSans.ttf") format("truetype");
  }

  .title {
    text-align: center;
    margin: 10px;
    font-weight: 600;
    font-size: 16px;
  }
}
.pdf-page .panelFirst {
  padding-bottom: 5px;
  border-bottom: 3px solid;
}
.pdf-page .headerTitle {
  display: flex;
  align-items: flex-end;
  font-family:  "DejaVu Sans";
  font-size: 8px;
}
`