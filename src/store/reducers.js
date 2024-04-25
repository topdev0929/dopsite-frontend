import { combineReducers } from "redux"
import Layout from "./layout/reducer"
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"
import calendar from "./calendar/reducer"
import chat from "./chat/reducer"
import invoices from "./invoices/reducer"
import contacts from "./contacts/reducer"
import reports from "./reports/reducer"

const rootReducer = combineReducers({
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  calendar,
  chat,
  invoices,
  reports,
  contacts,
})

export default rootReducer
