import styled from 'styled-components'

export const Wrapper = styled.div`
  .containerFix {
    padding: 0 80px;
  }
  header {
    margin-top: 50px;
    margin-bottom: 30px;
    text-align: center;
  }
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
`