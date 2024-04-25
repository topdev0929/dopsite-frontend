import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import { useSelector } from "react-redux"
import { Table, Button, Row, Col, Select, Spin } from 'antd'
import { getTransactions, getRootAmount, getCompany } from '../../../data/comany'

//import Breadcrumbs
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
  Container
} from "reactstrap";
import * as ST from './styles'

const { Option } = Select
const Transactions = () => {
  const [previousButton, setPreviousButton] = useState(true);
  const [nextButton, setNextButton] = useState(false);
  const [companyData, setCompanyData] = useState([]);
  const [companyLists, setCompanyLists] = useState([]);
  const [direction, setDirection] = useState('next')
  const [limit, setLimit] = useState(20)
  const [start, setStart] = useState()
  const [bankAmount, setBankAmount] = useState()
  const [totalCount, setTotalCount] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [buttonStatus, setButtonStatus] = useState(false)
  const [filterType, setFilterType] = useState()
  const [loading, setLoading] = useState(true)

  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))
  
  useEffect(() => {
    getCompany().then(res => {
      setCompanyLists(res)
    })
  }, [])

  useEffect(() => {
    setButtonStatus(true)
    setLoading(true)
    getTransactions({ limit: limit, start: start, direction: direction, type: filterType }).then(res => {
      if (res && res?.length) {
        setCompanyData(res)
        setLoading(false)
      }
      setButtonStatus(false)
      setNextButton(false)
    })
  }, [start, filterType])

  useEffect(() => {
    setLimit(20)
    setPageNumber(1)
    setDirection('next')
    setStart('')
  }, [filterType])

  useEffect(() => {
    getRootAmount({ type: filterType }).then(res => {
      setBankAmount(res?.amount)
      setTotalCount(res?.total_count.total_count)
      if (limit > res?.total_count.total_count) {
        setLimit(res?.total_count.total_count)
        setNextButton(true)
        setPreviousButton(true)
        setPageNumber(1)
      }
    })
  }, [filterType])

  useEffect(() => {
    if (totalCount) {
      if (totalCount > pageNumber * limit) {
        setNextButton(false)
      } else {
        setLimit(totalCount % limit) 
        setNextButton(true)
      }
    }
    if (pageNumber > 1) {
      setPreviousButton(false)
    } else {
      setPreviousButton(true)
    }
  }, [pageNumber])
  const changeDate = dateString => {
    let currentDate = new Date(dateString * 1000)
    return [currentDate.toLocaleDateString(), currentDate.toLocaleTimeString()]
  }
  
  const getCompanyByAccount = val => {
    return "To " + companyLists.find(res => res.bank_account === val)?.company_name
  }
  const getAccount = val => {
    const strCopy = val.split(' ');
    const account = strCopy[strCopy.length - 2]
    return "From " + companyLists.find(res => res.bank_account === account)?.company_name
  }
  const columns = [
    {
      title: 'TYPE',
      key: 'type',
      dataIndex: 'type',
      render: data => {
        return <div style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{data}</div>
      }
    },
    {
      title: 'NET',
      key: 'net',
      render: data => 
      <>
        {data.type === 'transfer' ? (
          <div style={{ color: '#ccc' }}>${(Math.abs(data.net / 100)).toFixed(2)}</div>
        ) : (
          <div style={{ fontWeight: 'bold' }}>${(data.net / 100).toFixed(2)}</div>
        )}
      </>
    },
    {
      title: 'AMOUNT',
      key: 'amount',
      render: data => 
      <>
        {data.type === "transfer" ? (
          <div style={{ color: '#ccc' }}>${(Math.abs(data.amount / 100)).toFixed(2)}</div>
        ) : (
          <div>${(data.amount / 100).toFixed(2)}</div>
        )}
      </>
    },
    {
      title: 'FEE',
      dataIndex: 'fee',
      key: 'fee',
      render: fee => <>{fee ? `$${(fee / 100).toFixed(2)}` : '-'}</>
    },
    {
      title: '',
      key: 'currency',
      dataIndex: 'currency',
      render: data => <div style={{ textTransform: 'uppercase' }}>{data}</div>
    },
    {
      title: 'DESCRIPTION',
      key: 'description',
      render: data => 
      <>
        {data?.custom_description ? (
          <>
            {data?.type === 'charge' && (
              <>By {data?.custom_description.email}</>
            )}
            {data?.type === 'transfer' && (
              <>{getCompanyByAccount(data?.custom_description)}</>
            )}
          </>
          ) :  (
            <>
              {data?.type === "application_fee" ? (
                <>{getAccount(data?.description)}</>
              ) : (
                <>{data.source}</>
              )}
            </>
          )
        }
      </>
    },
    {
      title: 'STATUS',
      key: 'status',
      dataIndex: 'status',
      render: data => <>{data }</>
    },
    {
      title: 'CREATED',
      key: 'created',
      dataIndex: 'created',
      render: data => {
        return (
          <>{changeDate(data)[0]}<br />{changeDate(data)[1]}</>
        )
      }
    },
    {
      title: 'AVAILABLE ON',
      key: 'available_on',
      dataIndex: 'available_on',
      render: data => {
        return (
          <>{changeDate(data)[0]}<br />{changeDate(data)[1]}</>
        )
      }
    },
  ]
  
  const pagination = val => {
    if (val === 'next') {
      if(totalCount / (pageNumber * 20) >= 1) {
        setStart(companyData[companyData.length - 1]['id'])
        setDirection('next')
        setPageNumber(pageNumber + 1)
      } else {
        setLimit(20)
        setNextButton(true)
      }
    } else {
      if (pageNumber - 1 >= 1) {
        setDirection('previous')
        setLimit(20)
        setStart(companyData[0]['id'])
        setPageNumber(pageNumber - 1)
      }
    }
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Company | DOP Test Network</title>
        </MetaTags>
        <ST.CompanyWrapper>
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="DOP" breadcrumbItem="Transactions" />
            <Row style={{ marginBottom: 20 }}>
              <Col span={4}>
                Total avaiable: <b>${(bankAmount?.available[0]['amount'] / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b>
              </Col>
              <Col span={4}>
                Pending: <b>${(bankAmount?.pending[0]['amount'] / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b>
              </Col>
              <Col span={16} style={{ textAlign: 'right' }}>
                Filter by: 
                <Select
                  showSearch
                  style={{ width: '120px', marginLeft: 10 }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  onChange={val => setFilterType(val)}
                >
                  <Option value={''}>All</Option>
                  <Option value={'charge'}>Charge</Option>
                  <Option value={'application_fee'}>Application_fee</Option>
                  <Option value={'transfer'}>Transfer</Option>
                </Select>
              </Col>
            </Row>
            {loading ? (
              <div style={{ textAlign: 'center' }}>
                <Spin tip="Loading..." />
              </div>
            ) : (
              <Table dataSource={companyData} columns={columns} pagination={false} />
            )}
            <Row style={{ margin: '20px 15px' }}>
              <Col span={12}>
                <b>{totalCount}</b> results
              </Col>
              <Col span={12}>
                <div style={{ textAlign: 'right' }}>
                  <Button onClick={() => pagination('previous')} style={{ marginRight: 10 }} disabled={previousButton || buttonStatus}>Previous</Button>
                  <Button onClick={() => pagination('next')} type='primary' disabled={nextButton || buttonStatus}>Next</Button>
                </div>
              </Col>
            </Row>
          </Container>
        </ST.CompanyWrapper>
      </div>
    </React.Fragment>
  )
}

export default Transactions