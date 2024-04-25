import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { useSelector } from "react-redux";
import moment from "moment";
import { Table, Row, Col, Spin, Pagination, Alert } from "antd";
import { getCompanyBalance, getCompanyInfo } from "../../data/comany";
import { getInvoiceByCompany } from "../../data/invoice";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Container } from "reactstrap";
import * as ST from "./styles";

const Transactions = () => {
  const [companyData, setCompanyData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [bankAmount, setBankAmount] = useState();
  const [loading, setLoading] = useState(true);

  const { currentUser } = useSelector((state) => ({
    currentUser: state.Login.user,
  }));

  useEffect(() => {
    getCompanyInfo({ id: currentUser?.company_id }).then((res) => {
      getCompanyBalance({ bank: res[0]?.bank_account }).then((res) => {
        setBankAmount(res);
      });
    });
  }, [currentUser]);

  useEffect(() => {
    setLoading(true);
    if (currentUser?.company_id) {
      getInvoiceByCompany({
        id: currentUser?.company_id,
        limit: limit,
        page: page,
      }).then((res) => {
        setCompanyData(res);
        setLoading(false);
      });
    } else {
      setCompanyData();
      setLoading(false);
    }
  }, [limit, page, currentUser]);

  const chargeFun = (data) => {
    if (data.fee_status) {
      return data.amount;
    } else {
      return (
        data.amount -
        ((Number(data.amount) + 0.3) / (1 - 0.035) - Number(data.amount))
      ).toFixed(2);
    }
  };
  const siteFee = (data) => {
    return (
      (Number(data.amount) + 0.3) / (1 - 0.035) -
      Number(data.amount) -
      ((Number(data.amount) + 0.3) / (1 - 0.029) - Number(data.amount))
    ).toFixed(2);
  };
  const columns = [
    {
      title: "Charge",
      key: "amount",
      render: (data) => {
        return (
          <div style={{ fontWeight: "bold" }}>
            {data && <>${chargeFun(data)}</>}
          </div>
        );
      },
    },
    {
      title: "Application Fee",
      key: "fee_status",
      render: (data) => {
        return (
          <div>
            {data && (
              <>
                $
                {(
                  (Number(data.amount) + 0.3) / (1 - 0.035) -
                  Number(data.amount)
                ).toFixed(2)}
              </>
            )}
            {data && data.fee_status ? (
              <> (From curstomer)</>
            ) : (
              <>
                {" "}
                (<b>From company</b>)
              </>
            )}
          </div>
        );
      },
    },
    {
      title: "Stripe Fee",
      key: "fee_status",
      render: (data) => {
        return (
          <div>
            {data && (
              <>
                $
                {(
                  (Number(data.amount) + 0.3) / (1 - 0.029) -
                  Number(data.amount)
                ).toFixed(2)}
              </>
            )}
          </div>
        );
      },
    },
    {
      title: "Site Fee",
      key: "fee_status",
      render: (data) => {
        return <div>{data && <>${siteFee(data)}</>}</div>;
      },
    },
    {
      title: "Paider Name",
      key: "paider_name",
      dataIndex: "paider_name",
    },
    {
      title: "Paider Email",
      key: "paider_email",
      dataIndex: "paider_email",
    },
    {
      title: "Charge Date",
      key: "paid_date",
      dataIndex: "paid_date",
      render: (data) => <>{data && moment(data).format("MM/DD/YYYY")}</>,
    },
  ];

  const onShowSizeChange = (page, limit) => {
    setLimit(limit);
    setPage(page);
  };
  const showTotal = (total) => `Total ${total} items`;
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Company | DOP Test Network</title>
        </MetaTags>
        {currentUser.role_id === 2 || currentUser.role_id === 1 ? (
          <ST.CompanyWrapper>
            <Container fluid>
              <Breadcrumbs title="DOP" breadcrumbItem="Transactions" />
              <Row style={{ marginBottom: 20 }}>
                <Col span={4}>
                  Total avaiable:{" "}
                  <b>
                    $
                    {(bankAmount?.available[0]["amount"] / 100)
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </b>
                </Col>
                <Col span={4}>
                  Pending:{" "}
                  <b>
                    $
                    {(bankAmount?.pending[0]["amount"] / 100)
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </b>
                </Col>
              </Row>
              {loading ? (
                <div style={{ textAlign: "center" }}>
                  <Spin tip="Loading..." />
                </div>
              ) : (
                <Table
                  dataSource={companyData?.lists}
                  columns={columns}
                  pagination={false}
                />
              )}
              <Pagination
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                onChange={onShowSizeChange}
                defaultCurrent={page}
                total={companyData?.total_count}
                showTotal={showTotal}
                pageSizeOptions={[10, 20, 30, 40, 50]}
                style={{ marginTop: 30 }}
              />
            </Container>
          </ST.CompanyWrapper>
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

export default Transactions;
