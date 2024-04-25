import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import SuccessModal from "../../components/Modal/successModal";
import { PlusOutlined } from "@ant-design/icons";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { openNotificationWithIcon } from "../../components/Modal/notification";
import { Button, Form, Input, Row, Col, Upload, Modal } from "antd";
import { Container } from "reactstrap";
import * as ST from "./styles";
import { changeUserProfile } from "../../data/user";
import { changeUserInfo } from "../../store/actions";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
});
const myBucket = new AWS.S3({
  params: { Bucket: process.env.REACT_APP_BUCKET_NAME },
  region: process.env.REACT_APP_REGION,
});

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const Projects = () => {
  const [modal_center, setmodal_center] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const { currentUser } = useSelector((state) => ({
    currentUser: state.Login.user,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if(currentUser.logo)
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: `https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${currentUser.logo}`,
        }
      ])
  }, [currentUser]);

  const tog_center = () => {
    setmodal_center(!modal_center);
  };

  const onFinish = (values) => {
    const reData = values;
    delete reData.email;
    reData.id = currentUser.sub;
    changeUserProfile(reData)
      .then((res) => {
        dispatch(
          changeUserInfo({
            firstname: reData.firstname,
            lastname: reData.lastname,
            logo: reData.logo,
          })
        );
        localStorage.setItem("access_token", JSON.stringify(res.access_token));
        openNotificationWithIcon(
          "success",
          "Note",
          "Changed your profile successfully"
        );
      })
      .catch((err) => {
        openNotificationWithIcon("error", "Note", "Failed");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    if (newFileList && newFileList.length) {
      const params = {
        Body: newFileList[0].originFileObj,
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key:
          newFileList[0].uid +
          "." +
          newFileList[0].name.split(".")[
            newFileList[0].name.split(".").length - 1
          ],
      };
      myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          form.setFieldsValue({ logo: params.Key });
        })
        .send((err) => {
          if (err) console.log(err);
        });
    } else {
      if (fileList[0]?.url) {
        const params = {
          Bucket: process.env.REACT_APP_BUCKET_NAME,
          Key: fileList[0].url.split(
            `https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/`
          )[1],
        };
        myBucket.deleteObject(params).promise();
      }
      form.setFieldsValue({ logo: "" });
    }
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload Logo
      </div>
    </div>
  );
  // const handleOk = () => {
  //   // if (impotedUserId) {
  //   //   addUserToCompany({ company_id: currentUser.company_id, id: impotedUserId}).then(() => {
  //   //     setIsModalVisible(false);
  //   //     setmodal_center1(true)
  //   //   })
  //   // } else {
  //   //   alert('You have to choose user')
  //   // }
  // };

  // const handleModalCancel = () => {
  //   setIsModalVisible(false);
  // };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | DOP Test Network</title>
        </MetaTags>
        <ST.ProfileWrapper>
          <Container fluid>
            <Breadcrumbs title="DOP" breadcrumbItem="Profile" />
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                firstname: currentUser?.firstname,
                lastname: currentUser?.lastname,
                email: currentUser?.email,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Row>
                <Col span={8}></Col>
                <Col
                  span={8}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Form.Item>
                    <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                    >
                      {fileList.length > 0 ? null : uploadButton}
                    </Upload>
                  </Form.Item>
                  <Form.Item name="logo" style={{ display: "none" }}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}></Col>
              </Row>
              <Row gutter={[24, 0]}>
                <Col span={8}></Col>
                <Col span={8}>
                  <Form.Item
                    label="First Name"
                    name="firstname"
                    rules={[
                      {
                        required: true,
                        message: "Please input your firstname!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="lastname"
                    rules={[
                      {
                        required: true,
                        message: "Please input your lastname!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
                <Col span={8}></Col>
              </Row>
              <Row>
                <Col span={8}></Col>
                <Col span={8} style={{ padding: 7 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Save
                  </Button>
                </Col>
                <Col span={8}></Col>
              </Row>
            </Form>
          </Container>
          <SuccessModal
            title="Successfully!"
            content="Your profile updated"
            modal_center={modal_center}
            setmodal_center={setmodal_center}
            tog_center={tog_center}
          />
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{
                width: "100%",
              }}
              src={previewImage}
            />
          </Modal>
        </ST.ProfileWrapper>
      </div>
    </React.Fragment>
  );
};

export default Projects;
