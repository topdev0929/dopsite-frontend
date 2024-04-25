import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { useSelector } from "react-redux";
import { Button, Form, Input, Select, Pagination, Spin, Alert } from "antd";
import { getRoles } from "../../data/role";
import { inviteUser } from "../../data/notificate_invite";
import ComfirmModal from "../../components/Modal/comfirmModal";
import SuccessModal from "../../components/Modal/successModal";
import { openNotificationWithIcon } from "../../components/Modal/notification";

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TrComponent from "../../components/Settings/TrComponent";
import { Container, Table } from "reactstrap";
import * as ST from "./styles";
import { getStuffs, requestCheck } from "../../data/comany";

const { TextArea } = Input;
const { Option } = Select;

const Affairs = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [modal_center, setmodal_center] = useState(false);
  const [modal_center1, setmodal_center1] = useState(false);
  const [outUserId, setOutUserId] = useState();
  const [stuffData, setStuffData] = useState([]);
  const [roleList, setLoleList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [companyData, setCompanyData] = useState(false);
  const [sendButton, setSendButton] = useState(false);

  const { currentUser } = useSelector((state) => ({
    currentUser: state.Login.user,
  }));

  useEffect(() => {
    requestCheck({ create_user_id: currentUser?.sub }).then((res) => {
      if (res.length && res[0].status) {
        setCompanyData(res[0]);
      }
    });
  }, []);

  const [form] = Form.useForm();
  const validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const tog_center = () => {
    setmodal_center(!modal_center);
  };
  const tog_center1 = () => {
    setmodal_center1(!modal_center1);
  };
  useEffect(() => {
    if (currentUser?.company_id) {
      getStuffs({
        company_id: currentUser?.company_id,
        data: { limit: limit, page: page },
      }).then((res) => {
        setStuffData(res);
        setLoading(false);
      });
    }
  }, [modal_center, modal_center1, page, limit]);
  useEffect(() => {
    getRoles().then((res) => {
      setLoleList(res);
    });
  }, []);
  const outUser = (id) => {
    setmodal_center(true);
    setOutUserId(id);
  };
  const addUser = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    setSendButton(true);
    inviteUser({
      company_id: currentUser.company_id,
      inviter: currentUser.sub,
      requester_email: values.email,
      inviter_email: currentUser.email,
      message: values.message,
      role_id: values.role_id,
    })
      .then((res) => {
        if (res?.message === "success") {
          openNotificationWithIcon(
            "success",
            "Note",
            "Sent your invitation successfully"
          );
          setIsModalVisible(false);
        } else if (res?.message === "stuff") {
          openNotificationWithIcon(
            "error",
            "Note",
            "Can`t send your invitation message because he is a stuff of company!"
          );
          setIsModalVisible(false);
        }
        setSendButton(false);
      })
      .catch((err) => {
        openNotificationWithIcon("error", "Note", "Failed");
        setSendButton(false);
      });
  };

  const onShowSizeChange = (page, limit) => {
    setLoading(true);
    setLimit(limit);
    setPage(page);
  };

  const showTotal = (total) => `Total ${total} items`;
  console.log("current user =>", currentUser);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Company | DOP Test Network</title>
        </MetaTags>
        {currentUser.role_id === 2 || currentUser.role_id === 1 ? (
          <ST.Wrapper>
            <Container fluid>
              <Breadcrumbs title="DOP" breadcrumbItem="User Management" />
              <div style={{ marginBottom: 15 }}>
                {currentUser?.role_id !== 9 &&
                  currentUser?.role_id !== 10 &&
                  (companyData?.status ? (
                    <Button
                      type="primary"
                      className="newCustomer"
                      size="large"
                      onClick={() => addUser()}
                    >
                      Invite Users
                    </Button>
                  ) : (
                    <div>
                      <Button
                        type="primary"
                        className="newCustomer"
                        disabled
                        size="large"
                        onClick={() => addUser()}
                      >
                        Sending invite
                      </Button>
                      <span style={{ marginLeft: 20 }}>
                        The user can't be invited because your company is not
                        authorized. Contact to doptestnetwork.com admin!
                      </span>
                    </div>
                  ))}
              </div>
              {!loading ? (
                <div className="table-responsive">
                  <Table className="table table-striped mb-0">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {stuffData &&
                        stuffData.lists.map(
                          (res, index) =>
                            currentUser.sub !== res.id && (
                              <TrComponent
                                key={index}
                                outUser={outUser}
                                currentUser={currentUser}
                                tableData={res}
                                roleList={roleList}
                              />
                            )
                        )}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <Spin tip="Loading..." />
                </div>
              )}
              <Pagination
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                onChange={onShowSizeChange}
                current={page || 1}
                total={stuffData?.total_count}
                showTotal={showTotal}
                pageSizeOptions={[10, 20, 30, 40, 50]}
                style={{ marginTop: 30 }}
              />
            </Container>
            <ComfirmModal
              content="Do you out this user from company?"
              modal_center={modal_center}
              setmodal_center={setmodal_center}
              tog_center={tog_center}
              type={"out-user"}
              data={{ id: outUserId }}
            />
            <SuccessModal
              title="Imported Successfully!"
              content="New User was imported in your company"
              modal_center={modal_center1}
              setmodal_center={setmodal_center1}
              tog_center={tog_center1}
            />
            <ST.StyleModal
              title="Users"
              visible={isModalVisible}
              onCancel={handleCancel}
            >
              <p>
                <Form
                  form={form}
                  name="control-hooks"
                  onFinish={onFinish}
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 19 }}
                  initialValues={{
                    message: "Join the rest of your team at DOP Test Network!",
                  }}
                >
                  <Form.Item
                    name="email"
                    label="User Email"
                    rules={[
                      { required: true, message: "This field is required" },
                      {
                        validator(_, value) {
                          if (value && !value.match(validRegex)) {
                            return Promise.reject("Invalid email address!");
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      style={{
                        width: "100%",
                        height: "38px",
                        borderRadius: "0.25rem",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="message"
                    label="Message"
                    rules={[
                      { required: true, message: "This field is required" },
                    ]}
                  >
                    <TextArea
                      rows={4}
                      style={{ width: "100%", borderRadius: "0.25rem" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="role_id"
                    label="Role"
                    rules={[
                      { required: true, message: "This field is required" },
                    ]}
                  >
                    <Select style={{ width: 200 }}>
                      {roleList.map(
                        (res) =>
                          res.id !== 1 && (
                            <Option key={res.id} value={res.id}>
                              {res.name}
                            </Option>
                          )
                      )}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{ offset: 5, span: 19 }}
                    style={{ textAlign: "left" }}
                  >
                    <Button
                      htmlType="button"
                      onClick={() => setIsModalVisible(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={sendButton}
                      type="primary"
                      htmlType="submit"
                    >
                      Send
                    </Button>
                  </Form.Item>
                </Form>
              </p>
            </ST.StyleModal>
          </ST.Wrapper>
        ) : (
          <Alert
            message="Forbidden"
            description="You don't have the permission to access this page!"
            type="error"
            closable
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default Affairs;
