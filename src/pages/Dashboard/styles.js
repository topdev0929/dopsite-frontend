import styled from 'styled-components'

export const Wrapper = styled.div`
  .plusIcon {
    position: absolute;
    bottom: -15px;
    right: -5px;
    svg path:first-child {
      transition: fill 0.7s;
    }
    svg path:nth-child(2) {
      fill: #D14124;
    }
  }
  .btnLinkGroup {
    margin-bottom: 30px;
    .col-md-2>div {
      cursor: pointer;
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
      &>div {
        margin-top: 10px;
      }
    }
    .col-md-2:hover {
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
    .col-md-2:not(:last-child) {
      padding-right: 0px 10px;
    }
  }
  .tableTitle {
    font-weight: 700;
    font-size: 18px;
    letter-spacing: -0.02em;
    color: #333333;
    margin-bottom: 15px;
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