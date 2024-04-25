import styled from 'styled-components'

export const Wrapper = styled.div`
  .containerFix {
    padding: 0 80px;
  }
  header {
    .containerFix .row {
      padding: 15px 0;
    }
    .linkSection {
      display: flex;
      justify-content: end;
      align-items: center;
      a {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        color: #7F7F7F;
        margin-left: 40px;
      }
      a: last-child {
        background: linear-gradient(90deg, #D14124 -0.05%, #B02509 99.95%);
        box-shadow: 0px 4px 25px rgba(255, 0, 0, 0.2);
        border-radius: 4px;
        padding: 10px 40px;
        color: white;
      }
    }
  }
  section {
    .containerFix {
      margin-top: -387px;
    }
    .polygon {
      background: linear-gradient(90deg,#D14124 -0.05%,#B02509 99.95%);
      clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 50%);
      height: 446px;
    }
    nav {
      position: relative;
      text-align: center;
      color: white;
      div:first-child {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 500;
        font-size: 30px;
        line-height: 50px;
      }
      div:last-child {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 700;
        font-size: 30px;
        line-height: 50px;
      }
      .dividerLeft {
        border: 1px solid #FFFFFF;
        position: absolute;
        top: 25px;
        width: 16%;
        left: 16%;
      }
      .dividerRight {
        border: 1px solid #FFFFFF;
        position: absolute;
        top: 25px;
        width: 16%;
        right: 16%;
      }
    }
  }
  .widget {
    background: #FFFFFF;
    box-shadow: 0px 4px 26px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    padding: 15px;
    &>div:last-child {
      text-align: center;
    }
    color: #7F7F7F;
    .title {
      background: #D14124;
      border-radius: 50%;
      color: white;
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      padding: 10px;
      display: inline-block;
      width: 47.12px;
      height: 47.12px;
      text-align: center;
      margin-bottom: 15px;
    }
  }
  .rightSection {
    background: #FFFFFF;
    border-radius: 67px;
    width: 80%;
    margin: 0 auto;
    margin-top: 70px;
    padding: 25px;
    text-aligin: center;
    .col-md-4 {
      text-align: center;
      margin-top: 10px;
      margin-bottom: 30px;
      img {
        width: 80%;
        hieght: auto;
      }
    }
    a {
      background: linear-gradient(90deg, #D14124 -0.05%, #B02509 99.95%);
      box-shadow: 0px 4px 25px rgba(255, 0, 0, 0.2);
      border-radius: 4px;
      padding: 10px 40px;
      color: white;
      font-size: 20px;
    }
    div:last-child {
      text-align: center;
    }
    .content {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      text-align: center;
      color: #7F7F7F;
      margin-bottom: 50px;
      text-align: center;
    }
    .title {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      color: #404656;
      margin-bottom: 20px;
      text-align: center;
      margin-bottom: 50px;
    }
  }
  .leftSection {
    margin-top: 100px;
    .col-md-6:last-child {
      margin-top: 90px;
    }
    .col-md-6:first-child .widget{
      margin-bottom: 20px;
    }
  }
`