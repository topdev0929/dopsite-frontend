import React, { useState } from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import { Button } from 'antd'
import SimpleBar from "simplebar-react"
import notificationSiteAdminData from '../../../data/swr/notifications/notificationSiteAdminData'
import notificationCompanyAdminData from '../../../data/swr/notifications/notificationCompanyAdminData'
import notificationCompanyUserData from '../../../data/swr/notifications/notificationCompanyUserData'
import { joinToCompany, joinToCompanyApprove } from '../../../data/user'
//Import Icons
import FeatherIcon from "feather-icons-react";
import { useSelector, useDispatch } from "react-redux"
import { openNotificationWithIcon } from '../../../components/Modal/notification'
import { changeUserInfo } from "../../../store/actions"

//i18n
import { withTranslation } from "react-i18next"

const NotificationDropdown = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))
  const dispatch = useDispatch()
  const { result: siteAdiminResult }  = notificationSiteAdminData()
  const { result: companyAdiminResult, mutate: mutateCompanyAdmin }  = notificationCompanyAdminData({ company_id: currentUser?.company_id || 'no_company', id: currentUser?.sub })
  const { result: companyUserResult, mutate: mutateCompanyUser }  = notificationCompanyUserData({ id: currentUser?.sub })
  
  const joinCompany = (company_id, id) => {
    joinToCompany({ company_id: company_id, id: currentUser.sub, notificate_id: id }).then(res => {
      openNotificationWithIcon('success', 'Note', 'Approved successfully')
      dispatch(changeUserInfo({ company_id: company_id }))
      mutateCompanyUser()
    })
  }
  const joinCompanyApprove = (id, company_id, ID) => {
    joinToCompanyApprove({ company_id: currentUser.company_id, id: currentUser.sub, requester_id: id, notificate_id: ID }).then(res => {
      openNotificationWithIcon('success', 'Note', 'Approved successfully')
      mutateCompanyAdmin()
    })
  }
  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon position-relative"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <FeatherIcon
            icon="bell"
            className="icon-lg"
          />
          {currentUser?.role_id === 1 && (
            <>
              {siteAdiminResult && siteAdiminResult.length > 0 && (
                <span className="badge bg-danger rounded-pill">{siteAdiminResult.length}</span>
              )}
            </>
          )}
          {currentUser?.role_id === 2 && (
            <>
              {companyAdiminResult && companyAdiminResult.length > 0 && (
                <span className="badge bg-danger rounded-pill">{companyAdiminResult.length}</span>
              )}
            </>
          )}
          {currentUser?.role_id === 10 && (
            <>
              {companyUserResult && companyUserResult.length > 0 && (
                <span className="badge bg-danger rounded-pill">{companyUserResult.length}</span>
              )}
            </>
          )}
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {props.t("Notifications")} </h6>
              </Col>
              <div className="col-auto">
                {/* <Link to="#" className="small">
                  {" "} */}
                  View All
                {/* </Link> */}
              </div>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            {/* <Link to="" className="text-reset notification-item">
              <div className="d-flex">
                <div className="avatar-sm me-3">
                  <span className="avatar-title bg-primary rounded-circle font-size-16">
                    <i className="bx bx-cart" />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">
                    {props.t("Your order is placed")}
                  </h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {props.t("If several languages coalesce the grammar")}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />{" "}
                      {props.t("3 min ago")}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link> */}
            {currentUser?.role_id === 1 && (
              <>
                {siteAdiminResult?.map((res, index) => (
                  <Link key={index} to="/company-manage" className="text-reset notification-item">
                    <div className="d-flex">
                        {res.logo ? (
                          <img
                            src={`https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${res.logo}`}
                            className="me-3 rounded-circle avatar-sm"
                            alt="user-pic"
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <span 
                            className="me-3 rounded-circle avatar-sm"
                            style={{
                              background: '#C03304',
                              color: 'white',
                              borderRadius: '20% !important',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              textTransform: 'uppercase'
                            }}
                          >
                            {res.firstname[0]}{res.lastname[0]}
                          </span>
                        )}
                      <div className="flex-grow-1">
                        <h6 className="mt-0 mb-1">{res.firstname} {res.lastname} ({res.email})</h6>
                        <div className="font-size-12 text-muted">
                          <p className="mb-1">
                            {props.t("has requested a new company account") + "."}
                          </p>
                          <p className="mb-0">
                            <i className="mdi mdi-clock-outline" />{' '}
                            {res.created_at}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            )}
            {currentUser?.role_id === 2 && (
              <>
                {companyAdiminResult?.map((res, index) => (
                  res?.ID ? (
                    <a key={index} href="javascript:;" className="text-reset notification-item">
                      <div className="d-flex">
                          {res.logo ? (
                            <img
                              src={`https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${res.logo}`}
                              className="me-3 rounded-circle avatar-sm"
                              alt="user-pic"
                              style={{ objectFit: 'cover' }}
                            />
                          ) : (
                            <span
                              className="me-3 rounded-circle avatar-sm"
                              style={{
                                background: '#C03304',
                                color: 'white',
                                borderRadius: '20% !important',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textTransform: 'uppercase'
                              }}
                            >
                              {res.firstname[0]}{res.lastname[0]}
                            </span>
                          )}
                        <div className="flex-grow-1">
                          <h6 className="mt-0 mb-1">{res.firstname} {res.lastname} ({res.email})</h6>
                          <div className="font-size-12 text-muted">
                            <p className="mb-1">
                              {props.t("has requested to join your company") + "."}
                            </p>
                            <p className="mb-0">
                              <i className="mdi mdi-clock-outline" />{' '}
                              {res.created_at}
                            </p>
                            <p className="mb-0" style={{marginTop: 5}}>
                              <Button size='small' onClick={() => joinCompanyApprove(res.id, res.company_id, res.ID)}>Approve</Button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  ) : (
                    <Link key={index} to="/settings/usermanagement" className="text-reset notification-item">
                      <div className="d-flex">
                          {res.logo ? (
                            <img
                              src={`https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${res.logo}`}
                              className="me-3 rounded-circle avatar-sm"
                              alt="user-pic"
                              style={{ objectFit: 'cover' }}
                            />
                          ) : (
                            <span
                              className="me-3 rounded-circle avatar-sm"
                              style={{
                                background: '#C03304',
                                color: 'white',
                                borderRadius: '20% !important',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textTransform: 'uppercase'
                              }}
                            >
                              {res.firstname[0]}{res.lastname[0]}
                            </span>
                          )}
                        <div className="flex-grow-1">
                          <h6 className="mt-0 mb-1">{res.firstname} {res.lastname} ({res.email})</h6>
                          <div className="font-size-12 text-muted">
                            <p className="mb-1">
                              {props.t("You have to change the status of this user.") + "."}
                            </p>
                            <p className="mb-0">
                              <i className="mdi mdi-clock-outline" />{' '}
                              {res.created_at}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                ))}
              </>
            )}
            {currentUser?.role_id === 10 && (
              <>
                {companyUserResult?.map((res, index) => (
                  <Link key={index} to="/settings/usermanagement" className="text-reset notification-item">
                    <div className="d-flex">
                        {res.logo ? (
                          <img
                            src={`https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${res.logo}`}
                            className="me-3 rounded-circle avatar-sm"
                            alt="user-pic"
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <span
                            className="me-3 rounded-circle avatar-sm"
                            style={{
                              background: '#C03304',
                              color: 'white',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: '20% !important',
                              textTransform: 'uppercase'
                            }}
                          >
                            {res?.firstname[0]}{res?.lastname[0]}
                          </span>
                        )}
                      <div className="flex-grow-1">
                        <h6 className="mt-0 mb-1">{res.firstname} {res.lastname} ({res.email})</h6>
                        <div className="font-size-12 text-muted">
                          <p className="mb-1">
                            {props.t("has invited to join his company(") + res.company_name + ")."}
                          </p>
                          <p className="mb-0">
                            <i className="mdi mdi-clock-outline" />{' '}
                            {res.created_at}
                          </p>
                          <p className="mb-0" style={{marginTop: 5}}>
                            <Button size='small' onClick={() => joinCompany(res.company_id, res.ID)}>Approve</Button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            )}
            {/* <Link to="" className="text-reset notification-item">
              <div className="d-flex">
                <div className="avatar-sm me-3">
                  <span className="avatar-title bg-success rounded-circle font-size-16">
                    <i className="bx bx-badge-check" />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">
                    {props.t("Your item is shipped")}
                  </h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {props.t("If several languages coalesce the grammar")}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />{" "}
                      {props.t("3 min ago")}
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="" className="text-reset notification-item">
              <div className="d-flex">
                <img
                  src={avatar4}
                  className="me-3 rounded-circle avatar-sm"
                  alt="user-pic"
                />
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">Salena Layfield</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {props.t(
                        "As a skeptical Cambridge friend of mine occidental"
                      ) + "."}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />
                      {props.t("1 hours ago")}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link> */}
          </SimpleBar>
          <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 btn-block text-center"
              to="#"
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>
              {" "}
              {props.t("View all")}{" "}
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any
}