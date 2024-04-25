import {
  GET_INVOICES_FAIL,
  GET_INVOICES_SUCCESS,
  GET_INVOICE_DETAIL_SUCCESS,
  GET_INVOICE_DETAIL_FAIL,
  GET_INVOICE_HISTORY_BYID_SUCCESS,
  GET_INVOICE_HISTORY_SUCCESS,
  GET_INVOICE_HISTORY_BY_COMPANYID_SUCCESS,
  GET_INVOICE_HISTORY_BY_PROJECTID_SUCCESS,
} from "./actionTypes";

const INIT_STATE = {
  invoices: [],
  invoiceDetail: {},
  error: {},
  invoiceHisotry: null,
  allInvoiceHistories: [],
};

const Invoices = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: action.payload,
      };

    case GET_INVOICES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVOICE_DETAIL_SUCCESS:
      return {
        ...state,
        invoiceDetail: action.payload,
      };

    case GET_INVOICE_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVOICE_HISTORY_BYID_SUCCESS:
      return {
        ...state,
        invoiceHisotry: action.payload,
      };

    case GET_INVOICE_HISTORY_SUCCESS:
      return {
        ...state,
        allInvoiceHistories: action.payload,
      };

    case GET_INVOICE_HISTORY_BY_COMPANYID_SUCCESS:
      return {
        ...state,
        allInvoiceHistories: action.payload,
      };

    case GET_INVOICE_HISTORY_BY_PROJECTID_SUCCESS:
      return {
        ...state,
        invoiceHisotry: action.payload,
      };

    default:
      return state;
  }
};

export default Invoices;
