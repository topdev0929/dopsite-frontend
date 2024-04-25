//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register"

//LOGIN
export const POST_FAKE_LOGIN = "/post-fake-login"
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login"
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd"
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd"
export const SOCIAL_LOGIN = "/social-login"

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile"
export const POST_EDIT_PROFILE = "/post-fake-profile"

//PRODUCTS
export const GET_PRODUCTS = "/products"
export const GET_PRODUCTS_DETAIL = "/product"

//Mails
export const GET_INBOX_MAILS = "/inboxmails"
export const ADD_NEW_INBOX_MAIL = "/add/inboxmail"
export const DELETE_INBOX_MAIL = "/delete/inboxmail"

//starred mail
export const GET_STARRED_MAILS = "/starredmails"

//important mails
export const GET_IMPORTANT_MAILS = "/importantmails"

//Draft mail
export const GET_DRAFT_MAILS = "/draftmails"

//Send mail
export const GET_SENT_MAILS = "/sentmails"

//Trash mail
export const GET_TRASH_MAILS = "/trashmails"

//CALENDER
export const GET_EVENTS = "/events"
export const ADD_NEW_EVENT = "/add/event"
export const UPDATE_EVENT = "/update/event"
export const DELETE_EVENT = "/delete/event"
export const GET_CATEGORIES = "/categories"

//CHATS
export const GET_CHATS = "/chats"
export const GET_GROUPS = "/groups"
export const GET_CONTACTS = "/contacts"
export const GET_MESSAGES = "/messages"
export const ADD_MESSAGE = "/add/messages"

//ORDERS
export const GET_ORDERS = "/orders"
export const ADD_NEW_ORDER = "/add/order"
export const UPDATE_ORDER = "/update/order"
export const DELETE_ORDER = "/delete/order"

//CART DATA
export const GET_CART_DATA = "/cart"

//CUSTOMERS
export const GET_CUSTOMERS = "/customers"
export const ADD_NEW_CUSTOMER = "/add/customer"
export const UPDATE_CUSTOMER = "/update/customer"
export const DELETE_CUSTOMER = "/delete/customer"

//SHOPS
export const GET_SHOPS = "/shops"

//CRYPTO
export const GET_WALLET = "/wallet"
export const GET_CRYPTO_ORDERS = "/crypto/orders"

//INVOICES
export const GET_INVOICES = "/invoices"
export const GET_INVOICE_DETAIL = "/invoice"
export const GET_INVOICE_HISTORY = '/invoice-history'
export const GET_INVOICE_HISTORY_BYCOMPANY = '/invoice-history/company'
export const GET_INVOICE_HISTORY_BYPROJECT = '/invoice-history/project'

//REPORTS
export const GET_REPORTS = "/reports"
// export const GET_INVOICE_DETAIL = "/invoice"
export const GET_REPORTS_HISTORY = '/report-history'
export const GET_REPORTS_HISTORY_BYCOMPANY = '/report-history/company'
export const GET_REPORTS_HISTORY_BYPROJECT = '/report-history/project'
export const GET_REPORTS_HISTORY_BYID = '/report-history/by-id'



//PROJECTS
export const GET_PROJECTS = "/projects"
export const GET_PROJECT_DETAIL = "/project"
export const ADD_NEW_PROJECT = "/add/project"
export const UPDATE_PROJECT = "/update/project"
export const DELETE_PROJECT = "/delete/project"

//TASKS
export const GET_TASKS = "/tasks"

//CONTACTS
export const GET_USERS = "/users"
export const GET_USER_PROFILE = "/user"
export const ADD_NEW_USER = "/add/user"
export const UPDATE_USER = "/update/user"
export const DELETE_USER = "/delete/user"

//dashboard charts data
export const GET_WEEKLY_DATA = "/weekly-data"
export const GET_YEARLY_DATA = "/yearly-data"
export const GET_MONTHLY_DATA = "/monthly-data"

export const TOP_SELLING_DATA = "/top-selling-data"

export const GET_EARNING_DATA = "/earning-charts-data"

export const GET_PRODUCT_COMMENTS = "/comments-product"

export const ON_LIKNE_COMMENT = "/comments-product-action"

export const ON_ADD_REPLY = "/comments-product-add-reply"

export const ON_ADD_COMMENT = "/comments-product-add-comment"


// start DopTestNetwork API
export const POST_LOGIN = '/auth/sign-in'
export const POST_REGISTER = '/auth/sign-up'
export const POST_VERIFY = '/verify-email'

// company API
export const REQUEST_COMPANY = '/company/create'
export const REQUEST_CHECK = '/company/check'
export const UPDATE_COMPANY = '/company/update'
