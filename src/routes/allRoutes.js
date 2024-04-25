import React from "react"
import { Redirect } from "react-router-dom"

//Dashboard
import Dashboard from "../pages/Dashboard/index";
import Projects from '../pages/Projects/index'
import ProjectsMachines from '../pages/Projects/machines'
import AddMachine from '../pages/Projects/addMachine'
import MachineEdit from '../pages/Projects/editMachine'
import ProjectsEdit from '../pages/Projects/edit'
import ProjectsPrint from '../pages/Projects/print'
import ProjectsPrintDops from '../pages/Projects/printDops'

import Invoices from '../pages/Invoices/index'
import InvoicesGenerated from '../pages/Invoices/generated'
import InvoicesView from '../pages/Invoices/view'
import Reports from '../pages/Reports/index'
import ReportGenerated from '../pages/Reports/generated'
import ReportView from '../pages/Reports/view'
import NewProject from '../pages/NewProject/index'
import Settings from '../pages/Settings/index'
import ComapanyTracsactions from '../pages/Settings/transactions'
import Companies from '../pages/Settings/Companies'
import CompaniesBankInfo from '../pages/Settings/CompaniesBankCheck'
import Affairs from '../pages/Settings/Affairs'
import NewCoustomer from '../pages/NewCoustomer/index'
import Customers from '../pages/Customers/index'
import CustomerDetail from '../pages/Customers/detail.js'
import CustomerEdit from '../pages/Customers/edit.js'

//admin pages
import SettingsManage from '../pages/Settings/setting-manage'
import AffairsManage from '../pages/Settings/affairs-manage'
import CompanyManage from '../pages/Settings/comapnay-manage'
import Transactions from '../pages/Admin/Transactions'

// Authentication related pages
import userProfile from "../pages/Authentication/user-profile"
import Login from "../pages/Authentication/Login"
import AdminLogin from "../pages/Authentication/AdminLogin"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import VerifyEmail from '../pages/Authentication/VerifyEmail'
import ResetPasssword from '../pages/Authentication/ResetPasssword'

//Utility page
import Homepage from "../pages/Homepage"

//stripe page
import Stripe from "../pages/Stripe"

import PrintReport from '../pages/Pdf/report'
import PrintInvoiceNew from '../pages/Pdf/invoice_new'


const userRoutes = [

  { path: "/dashboard", component: Dashboard },
  { path: "/profile", component: userProfile },
  { path: "/projects", component: Projects },
  { path: "/projects/machines/:id", component: ProjectsMachines },
  { path: "/projects/addMachine/:id", component: AddMachine },
  { path: "/projects/machines/edit/:id", component: MachineEdit },
  { path: "/projects/edit/:id", component: ProjectsEdit },
  { path: "/projects/print/:id", component: ProjectsPrint },
  { path: "/projects/printDops/:id", component: ProjectsPrintDops },
  { path: "/invoices", component: Invoices },
  { path: "/invoices/:id", component: InvoicesGenerated },
  { path: "/invoices/view/:id", component: InvoicesView },
  { path: "/reports", component: Reports },
  { path: "/reports/:id", component: ReportGenerated },
  { path: "/reports/view/:id", component: ReportView },
  { path: "/newProject", component: NewProject },
  { path: "/setting", component: Settings },
  { path: "/settings/transactions", component: ComapanyTracsactions },
  { path: "/settings/company", component: Companies },
  { path: "/settings/company/:id", component: CompaniesBankInfo },
  { path: "/settings/usermanagement", component: Affairs },
  { path: "/newCustomer", component: NewCoustomer },
  { path: "/customers", component: Customers },
  { path: "/customers/detail/:id", component: CustomerDetail },
  { path: "/customers/edit/:id", component: CustomerEdit },

  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/admin", component: AdminLogin },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/register/:company_id", component: Register },
  { path: "/verify-email/:token", component: VerifyEmail },
  { path: "/change-pass/:token", component: ResetPasssword },

  { path: "/homepage", component: Homepage },
  { path: "/stripe/:id", component: Stripe },
  { path: "/print-reports/:id", component: PrintReport },
  { path: "/print-invoice/:id", component: PrintInvoiceNew },


  { path: "/", exact: true, component: () => <Redirect to="/homepage" /> }
]

const adminRoutes = [
  { path: "/setting-manage", component: SettingsManage },
  { path: "/affairs-manage", component: AffairsManage },
  { path: "/company-manage", component: CompanyManage },
  { path: "/transactions", component: Transactions },
]

export { userRoutes, authRoutes, adminRoutes }
