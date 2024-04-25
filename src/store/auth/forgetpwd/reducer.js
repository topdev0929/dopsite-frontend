import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
} from "./actionTypes"

const initialState = {
  forgetSuccessMsg: null,
  forgetError: null,
}

const forgetPassword = (state = initialState, action) => {
  switch (action.type) {
    case FORGET_PASSWORD:
      state = {
        ...state,
        forgetSuccessMsg: null,
        forgetError: null,
      }
      break
    case FORGET_PASSWORD_SUCCESS:
      state = {
        ...state,
        forgetSuccessMsg: action.payload,
      }
      break
    case FORGET_PASSWORD_ERROR:
      state = { ...state, forgetError: action.payload }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default forgetPassword
