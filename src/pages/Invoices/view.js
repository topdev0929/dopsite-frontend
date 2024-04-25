import React, { useState, useEffect, useRef } from "react";
import MetaTags from "react-meta-tags";
import { useHistory, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Checkbox, Button, Select, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { PDFExport } from "@progress/kendo-react-pdf";
import { Container, Table, Input, FormGroup } from "reactstrap";
import * as ST from "./styles";
import { getCompanyInfo } from "../../data/comany";
import { SendInvoice, getInvoiceNum } from "../../data/invoice.js";
import SuccessModal from "../../components/Modal/successModal";
import { getS3Image } from "../../data/report.js";
import { getInvoiceHisotryByProject } from "../../store/actions.js";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment'

const { Option } = Select;
const Projects = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [modal_center, setmodal_center] = useState(false);
  const [companyInfo, setCompanyInfo] = useState();
  const [companyDiscount, setCompanyDiscount] = useState();
  const [discountStatus, setDiscountStatus] = useState(true);
  const [discountValue, setDiscountValue] = useState();
  const [invoiceId, setInvoiceId] = useState();
  const [invoiceButtonLoading, setInvoiceButtonLoading] = useState();
  const [layoutSelection, setLayoutSelection] = useState("size-a4");
  const { id } = useParams();
  const pdfExportComponent = useRef(null);

  const { currentUser } = useSelector((state) => ({
    currentUser: state.Login.user,
  }));

  const { invoiceHisotry } = useSelector((state) => state.invoices);

  useEffect(() => {
    getCompanyInfo({ id: currentUser?.company_id }).then((res) => {
      if (res) {
        setCompanyInfo(res[0]);
        setCompanyDiscount(res[0].discount.split(","));
      }
    });
  }, []);

  useEffect(() => {
    getInvoiceNum({ id: currentUser?.company_id }).then((res) => {
      setInvoiceId(Number(Number(res[0].num) + 1));
    });
  }, []);

  useEffect(() => {
    dispatch(getInvoiceHisotryByProject(id));
  }, [id]);

  useEffect(() => {
    if (invoiceHisotry?.discount !== 'N/A') {
      setDiscountStatus(false)
      setDiscountValue(invoiceHisotry?.discount)
    } else {
      setDiscountStatus(true)
    }
  }, [invoiceHisotry])

  const tog_center = () => {
    setmodal_center(!modal_center);
  };
  const goMachine = () => {
    history.push(`/invoices`);
  };
  const onChangeCheckbox = (val) => {
    if (val.target.checked) {
      setDiscountStatus(false);
    } else {
      setDiscountStatus(true);
    }
  };
  const onChangeDiscount = (val) => {
    setDiscountValue(val.target.value);
  };
  const sendInvoice = () => {
    setInvoiceButtonLoading(true);
    const params = {
      project_id: id,
      discount: !discountStatus && discountValue ? discountValue : 0,
      subtotal:
      invoiceHisotry?.company_initial_rate +
      invoiceHisotry?.extra_test_num * invoiceHisotry?.company_additional_rate,
      resend: true,
    };
    SendInvoice(params).then((res) => {
      if (res) {
        setmodal_center(true);
        setInvoiceButtonLoading(false);
      }
    });
  };

  const handleExportWithComponent = async () => {
    setLoading(true);
    getS3Image({ url: companyInfo.logo }).then((res) => {
      if (res.success) {
        setImage(
          process.env.REACT_APP_SERVER_URL + `/uploads/${companyInfo.logo}`
        );
        pdfExportComponent.current.save();
        setLoading(false);
      }
    });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Project/Invoice | DOP Test Network</title>
        </MetaTags>
        {currentUser?.role_id !== 10 && (
          <ST.GeneratedWrapper>
            <Container fluid>
              <Breadcrumbs title="DOP" breadcrumbItem="Project/Invoice" />
              <div className="back d-print-none" onClick={() => goMachine()}>
                <i className="dripicons-arrow-thin-left"></i>
                <span>Back</span>
              </div>
              {invoiceHisotry && (
                <>
                  <Select
                    defaultValue={layoutSelection}
                    onChange={(e) => setLayoutSelection(e)}
                    style={{ marginLeft: "calc( 50% - 200px )", width: 200 }}
                  >
                    <Option value="size-a4">A4</Option>
                    <Option value="size-letter">Letter</Option>
                    <Option value="size-executive">Execution</Option>
                  </Select>
                  <PDFExport ref={pdfExportComponent}>
                    <div className={`pdf-page ${layoutSelection}`}>
                      <Row
                        className="panelFirst"
                        style={{ paddingBottom: 5, borderBottom: "3px solid" }}
                      >
                        <Col span={12}>
                          <div style={{ minHeight: 70 }}>
                            <img
                              src={
                                image
                                  ? image
                                  : `https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${invoiceHisotry?.company_logo}`
                              }
                              height="70"
                              alt=""
                            />
                          </div>
                        </Col>
                        <Col
                          span={12}
                          style={{
                            fontSize: 9,
                            display: "flex",
                            alignItems: "flex-end",
                          }}
                        >
                          ENVIRONMENTAL SOLUTIONS WITH A SENSIBLE APPROACH
                        </Col>
                      </Row>
                      <div
                        style={{
                          textAlign: "center",
                          margin: 10,
                          fontWeight: "600",
                        }}
                      >
                        DOP AEROSOL TEST CERTIFICATION INVOICE
                      </div>
                      <Row
                        className="title"
                        gutter={[8, 8]}
                        style={{ fontSize: 12 }}
                      >
                        <Col span={12}>
                          <Row gutter={[8, 8]}>
                            <Col span={10}>Invoice Date:</Col>
                            <Col span={14}>
                              <div style={{ borderBottom: "1px solid" }}>
                                { moment(invoiceHisotry?.invoice_date).format('MM/DD/YYYY')}
                              </div>
                            </Col>
                          </Row>
                          <Row gutter={[8, 8]}>
                            <Col span={10}>Invoice NO.:</Col>
                            <Col span={14}>
                              <div style={{ borderBottom: "1px solid" }}>
                                {invoiceHisotry?.company_invoice_start_prefix
                                  ? invoiceHisotry.company_invoice_start_prefix +
                                    "-" +
                                    invoiceHisotry?.invoice_id
                                  : invoiceHisotry?.invoice_id}
                              </div>
                            </Col>
                          </Row>
                        </Col>
                        <Col span={12}>
                          <Row gutter={[8, 8]}>
                            <Col span={10}>SES Job No.:</Col>
                            <Col span={14}>
                              <div style={{ borderBottom: "1px solid" }}>
                                DOP-{invoiceHisotry?.ses_project_id}
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="panel" gutter={[8, 8]}>
                        <Col span={12}>
                          <section>
                            <div>Client:</div>
                            <div>{invoiceHisotry?.customer_name}</div>
                            <div>{invoiceHisotry?.street}</div>
                            <div>
                              {invoiceHisotry?.city}, {invoiceHisotry?.state}
                            </div>
                            <div>Phone: {invoiceHisotry?.phone}</div>
                            <div>Email: {invoiceHisotry?.customer_email}</div>
                            <div>Attention: {invoiceHisotry?.attention}</div>
                          </section>
                        </Col>
                        <Col span={12}>
                          <section>
                            <div>Project Information:</div>
                            <div>{invoiceHisotry?.project_name}</div>
                            <div>{invoiceHisotry?.project_street}</div>
                            <div>
                              {invoiceHisotry?.project_city},{" "}
                              {invoiceHisotry?.project_state}
                            </div>
                            <div>
                              Client Reference No.: {invoiceHisotry?.reference_id}
                            </div>
                          </section>
                        </Col>
                      </Row>
                      <div className="table-responsive">
                        <Table className="table table-bordered">
                          <thead>
                            <tr>
                              <th width="60%">DESCRIPTION</th>
                              <th>QTY</th>
                              <th>RATE</th>
                              <th>AMOUNT</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>EQUIPMENT TESTING-4 units</td>
                              <td>1</td>
                              <td>{invoiceHisotry?.company_initial_rate}</td>
                              <td>{invoiceHisotry?.company_initial_rate.toFixed(2)}</td>
                            </tr>
                            {invoiceHisotry?.extra_test_num !== 0 && (
                              <tr>
                                <td>Extra units tested</td>
                                <td>{invoiceHisotry?.extra_test_num}</td>
                                <td>{invoiceHisotry?.company_additional_rate}</td>
                                <td>
                                  {(
                                    invoiceHisotry?.extra_test_num *
                                    invoiceHisotry?.company_additional_rate
                                  ).toFixed(2)}
                                </td>
                              </tr>
                            )}
                            <tr>
                              <td className="colorNone">'</td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td className="colorNone">'</td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td className="colorNone">'</td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr className="grayTr">
                              <td></td>
                              <td colSpan="2">SUBTOTAL</td>
                              <td>
                                {(
                                  invoiceHisotry?.company_initial_rate +
                                  invoiceHisotry?.extra_test_num *
                                    invoiceHisotry?.company_additional_rate
                                ).toFixed(2)}
                              </td>
                            </tr>
                            {!discountStatus && (
                              <tr className="grayTr">
                                <td></td>
                                <td colSpan="2">
                                  DISCOUNT{" "}
                                  {discountValue ? `${discountValue}%` : ""}
                                </td>
                                <td>
                                  {discountValue
                                    ? (
                                        (invoiceHisotry?.company_initial_rate +
                                          invoiceHisotry?.extra_test_num *
                                            invoiceHisotry?.company_additional_rate) *
                                        (discountValue / 100)
                                      ).toFixed(2)
                                    : 0}
                                </td>
                              </tr>
                            )}
                            <tr>
                              <td></td>
                              <td colSpan="2">INVOICE TOTAL</td>
                              <td>
                                {!discountStatus && discountValue
                                  ? (
                                      invoiceHisotry?.company_initial_rate +
                                      invoiceHisotry?.extra_test_num *
                                        invoiceHisotry?.company_additional_rate -
                                      (invoiceHisotry?.company_initial_rate +
                                        invoiceHisotry?.extra_test_num *
                                          invoiceHisotry?.company_additional_rate) *
                                        (discountValue / 100)
                                    ).toFixed(2)
                                  : (
                                      invoiceHisotry?.company_initial_rate +
                                      invoiceHisotry?.extra_test_num *
                                        invoiceHisotry?.company_additional_rate
                                    ).toFixed(2)}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                        <div
                          style={{
                            textAlign: "center",
                            marginTop: 20,
                            marginBottom: 20,
                          }}
                        >
                          <span>
                            {invoiceHisotry?.company_street}, {invoiceHisotry?.company_city},{" "}
                            {invoiceHisotry?.company_state} {invoiceHisotry?.company_zip}
                          </span>
                          <span style={{ marginLeft: 40 }}>
                            {invoiceHisotry?.company_phone}
                          </span>
                        </div>
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          width: "calc(100% - 0.6in)",
                          bottom: "0.4in",
                        }}
                      >
                        <Row>
                          <Col span={12}>
                            <div
                              style={{
                                fontSize: 11,
                                border: "1px solid",
                                textAlign: "center",
                                padding: 5,
                              }}
                            >
                              <div style={{ marginBottom: 10 }}>
                                Remit Payment to:
                              </div>
                              <div>{invoiceHisotry?.company_name}</div>
                              <div>{invoiceHisotry?.company_street}</div>
                              <div>
                                {invoiceHisotry?.company_city}, {invoiceHisotry?.company_state}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </PDFExport>
                  <footer className="d-print-none">
                    <div style={{ textAlign: "center" }}>
                      <Checkbox
                        onChange={onChangeCheckbox}
                        checked={!discountStatus}
                        disabled
                      >
                        Enable Discount
                      </Checkbox>
                      <FormGroup>
                        <Input
                          type="select"
                          value={discountValue}
                          disabled
                          onChange={onChangeDiscount}
                        >
                          <option value="">N/A</option>
                          {companyDiscount &&
                            companyDiscount.map((res) => (
                              <>
                                {invoiceHisotry?.discount && (
                                  <>
                                    {Number(res) <=
                                    Number(invoiceHisotry.discount) ? (
                                      <option key={res} value={res}>
                                        {res}%
                                      </option>
                                    ) : (
                                      <option
                                        style={{ background: "gainsboro" }}
                                        key={res}
                                        value={res}
                                        disabled="disabled"
                                      >
                                        {res}%
                                      </option>
                                    )}
                                  </>
                                )}
                              </>
                            ))}
                        </Input>
                        <DownOutlined />
                      </FormGroup>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      {!invoiceHisotry?.status && (
                        <Button
                          disabled={invoiceButtonLoading}
                          className="newCustomer"
                          onClick={() => sendInvoice()}
                        >
                          Resend
                        </Button>
                      )}
                      <Button
                        style={{ marginRight: 20 }}
                        className="newCustomer"
                        onClick={() => handleExportWithComponent()}
                      >
                        {!loading ? "Download PDF" : "loading..."}
                      </Button>
                    </div>
                  </footer>
                </>
              )}
            </Container>
            <SuccessModal
              title="Successfully!"
              content="Your sent invoice to customer"
              modal_center={modal_center}
              setmodal_center={setmodal_center}
              tog_center={tog_center}
            />
          </ST.GeneratedWrapper>
        )}
      </div>
    </React.Fragment>
  );
};

export default Projects;
