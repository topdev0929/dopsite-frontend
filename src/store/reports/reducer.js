import {
  GET_REPORT_HISTORY_BYPROJECTID_SUCCESS,
  GET_REPORT_HISTORY_BYCOMPANY,
  GET_REPORT_HISTORY_BYCOMPANY_SUCCESS,
  GET_REPORT_HISTORY_BYID_SUCCESS,
} from "./actionTypes";

const INIT_STATE = {
  report_histories: [],
  report_history: null,
  loading: false,
};

const reports = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_REPORT_HISTORY_BYPROJECTID_SUCCESS:
      return {
        ...state,
        report_history: action.payload,
      };
    case GET_REPORT_HISTORY_BYID_SUCCESS:
      return {
        ...state,
        report_history: action.payload,
      };
    case GET_REPORT_HISTORY_BYCOMPANY:
      return {
        ...state,
        loading: true,
      };
    case GET_REPORT_HISTORY_BYCOMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        report_histories: action.payload,
      };
    default:
      return state;
  }
};

export default reports;
