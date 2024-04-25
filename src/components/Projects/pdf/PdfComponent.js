import React from 'react';
import ReactToPrint from 'react-to-print';
import { PrintWrapper } from './styles'
import { Checkbox, Row, Col } from 'antd'

const equipment_type = [
  {
    label: 'Negative Air Machine',
    value: 'Neg Air Machine',
  },
  {
    label: 'HEPA Vacuum',
    value: 'HEPA Vacuum',
  }
]
const equipment_test = [
  {
    label: 'Pass',
    value: true,
  },
  {
    label: 'Fail',
    value: false,
  }
]
const cause_failure = [
  {
    label: 'Leaks/Poor Seal',
    value: '1',
  },
  {
    label: 'Electrical Malfunction',
    value: '2',
  },
  {
    label: 'Damaged Filter',
    value: '3',
  },
  {
    label: 'Damaged Case/Missing Parts',
    value: '4',
  }
]
class PdfComponent extends React.Component {
  
  render() {
    return (
      <div>
        <div style={{ marginBottom: 30, marginTop: 20 }}>
          <ReactToPrint
            content={() => this.componentRef}
            trigger={() => <button className="btn btn-primary">Print label(DOP)</button>}
          />
        </div>
        <div ref={(response) => (this.componentRef = response)} >
          {Array.isArray(this.props.data) ? (
            <>
              {this.props.data.map((res, index) => (
                <PrintWrapper key={[index]}>
                  <Row gutter={[8, 0]} className='header'>
                    <Col span={10}>
                      <img src={`https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${res.logo}`}  alt='' />
                    </Col>
                    <Col span={9}>
                      <div>{res.street}</div>
                      <div>{res.city}, {res.state} {res.zip}</div>
                      <div>PHONE: {res.phone}</div>
                      <div>FAX: {res.fax}</div>
                    </Col>
                    <Col span={5}>
                      <div>Date:</div>
                      <div className='underline'>{res.date}</div>
                    </Col>
                  </Row>
                  <div className='title'>
                    HEPA FILTER TESTING CERTIFICATION
                  </div>
                  <Row gutter={[8, 0]} className='body'>
                    <Col span={10}>
                      DOP Test Certificate No:
                    </Col>
                    <Col span={5} className='underline'>
                      {res.certificate_id}
                    </Col>
                    <Col span={5}>
                      PROJECT #:
                    </Col>
                    <Col span={4} className='underline'>
                      {res.ses_project_id}
                    </Col>
                  </Row>
                  <Row gutter={[8, 0]} className='body'>
                    <Col span={6}>
                      Client:
                    </Col>
                    <Col span={18} className='underline'>
                      {res.customer_name}
                    </Col>
                  </Row>
                  <Row gutter={[8, 0]} className='body'>
                    <Col span={6}>
                      Project Name:
                    </Col>
                    <Col span={18} className='underline'>
                      {res.project_name}
                    </Col>
                  </Row>
                  <Row gutter={[8, 0]} className='body'>
                    <Col span={6}>
                      Address:
                    </Col>
                    <Col span={18} className='underline'>
                      {res.project_street} {res.project_city}, {res.project_state} {res.project_zip}
                    </Col>
                  </Row>
                  <Row gutter={[8, 0]} className='body'>
                    <Col span={8}>
                      Equipment Type:
                    </Col>
                    <Col span={16}>
                      <Checkbox.Group
                        options={equipment_type}
                        value={[res.equipment_type]}
                      />
                    </Col>
                  </Row>
                  <Row gutter={[8, 0]} className='body'>
                    <Col span={4}>
                      Make:
                    </Col>
                    <Col span={20} className='underline'>
                      {res.make}
                    </Col>
                  </Row>
                  <Row gutter={[8, 0]} className='body'>
                    <Col span={4}>
                      Model:
                    </Col>
                    <Col span={8} className='underline'>
                      {res.model}
                    </Col>
                    <Col span={4}>
                      Serial #:
                    </Col>
                    <Col span={8} className='underline'>
                      {res.serial_id}
                    </Col>
                  </Row>
                  <Row gutter={[8, 0]} className='body'>
                    <Col span={10}>
                      Equipment PASS/FAIL:
                    </Col>
                    <Col span={14}>
                      <Checkbox.Group
                        options={equipment_test}
                        value={[res.equipment_test]}
                      />
                    </Col>
                  </Row>
                  <Row gutter={[8, 0]} className='body' style={{ lineHeight: '13px' }}>
                    <Col span={24}>
                      Cause of Failure:
                    </Col>
                    <Col span={24}>
                      <Checkbox.Group
                        className='dopFailure'
                        options={cause_failure}
                        value={!res.equipment_test ? res.cause_failure : []}
                      />
                    </Col>
                  </Row>
                  <Row gutter={[8, 0]} className='body' style={{ lineHeight: '13px', marginTop: '2px' }}>
                    <Col span={5}>
                      Technician:
                    </Col>
                    <Col span={10} className='underline'>
                      {res.technician}
                    </Col>
                    <Col span={3}>
                      Signed:
                    </Col>
                    <Col span={6} className='underline'>
                      {res.signature_level ? (
                        <>
                          {res.signature && (
                            <img style={{ width: '100%', position: 'absolute', bottom: '-5px', right: '1.6mm' }} src={res.signature} alt='' />
                          )}
                        </>
                      ) : (
                        <>
                          {res.signature_logo && (
                            <img style={{ width: '100%', position: 'absolute', bottom: 0, right: '1.6mm' }} src={`https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${res.signature_logo}`} alt='' />
                          )}
                        </>
                      )}
                    </Col>
                  </Row>
                  <div className='title'>
                    ANSI / ASME N510-2007
                  </div>
                </PrintWrapper>
              ))}
            </>
          ) : (
            <>
              <PrintWrapper>
                <Row gutter={[8, 0]} className='header'>
                  <Col span={10}>
                    <img src={`https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${this.props.data?.logo}`}  alt='' />
                  </Col>
                  <Col span={9}>
                    <div>{this.props.data?.street}</div>
                    <div>{this.props.data?.city}, {this.props.data?.state} {this.props.data?.zip}</div>
                    <div>PHONE: {this.props.data?.phone}</div>
                    <div>FAX: {this.props.data?.fax}</div>
                  </Col>
                  <Col span={5}>
                    <div>Date:</div>
                    <div className='underline'>{this.props.data?.date}</div>
                  </Col>
                </Row>
                <div className='title'>
                  HEPA FILTER TESTING CERTIFICATION
                </div>
                <Row gutter={[8, 0]} className='body'>
                  <Col span={10}>
                    DOP Test Certificate No:
                  </Col>
                  <Col span={5} className='underline'>
                    {this.props.data?.certificate_id}
                  </Col>
                  <Col span={5}>
                    PROJECT #:
                  </Col>
                  <Col span={4} className='underline'>
                    {this.props.data?.ses_project_id}
                  </Col>
                </Row>
                <Row gutter={[8, 0]} className='body'>
                  <Col span={6}>
                    Client:
                  </Col>
                  <Col span={18} className='underline'>
                    {this.props.data?.customer_name}
                  </Col>
                </Row>
                <Row gutter={[8, 0]} className='body'>
                  <Col span={6}>
                    Project Name:
                  </Col>
                  <Col span={18} className='underline'>
                    {this.props.data?.project_name}
                  </Col>
                </Row>
                <Row gutter={[8, 0]} className='body'>
                  <Col span={6}>
                    Address:
                  </Col>
                  <Col span={18} className='underline'>
                    {this.props.data?.project_street} {this.props.data?.project_city}, {this.props.data?.project_state} {this.props.data?.project_zip}
                  </Col>
                </Row>
                <Row gutter={[8, 0]} className='body'>
                  <Col span={8}>
                    Equipment Type:
                  </Col>
                  <Col span={16}>
                    <Checkbox.Group
                      options={equipment_type}
                      value={[this.props.data?.equipment_type]}
                    />
                  </Col>
                </Row>
                <Row gutter={[8, 0]} className='body'>
                  <Col span={4}>
                    Make:
                  </Col>
                  <Col span={20} className='underline'>
                    {this.props.data?.make}
                  </Col>
                </Row>
                <Row gutter={[8, 0]} className='body'>
                  <Col span={4}>
                    Model:
                  </Col>
                  <Col span={8} className='underline'>
                    {this.props.data?.model}
                  </Col>
                  <Col span={4}>
                    Serial #:
                  </Col>
                  <Col span={8} className='underline'>
                    {this.props.data?.serial_id}
                  </Col>
                </Row>
                <Row gutter={[8, 0]} className='body'>
                  <Col span={10}>
                    Equipment PASS/FAIL:
                  </Col>
                  <Col span={14}>
                    <Checkbox.Group
                      options={equipment_test}
                      value={[this.props.data?.equipment_test]}
                    />
                  </Col>
                </Row>
                <Row gutter={[8, 0]} className='body' style={{ lineHeight: '13px' }}>
                  <Col span={24}>
                    Cause of Failure:
                  </Col>
                  <Col span={24}>
                    <Checkbox.Group
                      className='dopFailure'
                      options={cause_failure}
                      value={!this.props.data?.equipment_test ? this.props.data?.cause_failure : []}
                    />
                  </Col>
                </Row>
                <Row gutter={[8, 0]} className='body' style={{ lineHeight: '13px', marginTop: '2px' }}>
                  <Col span={5}>
                    Technician:
                  </Col>
                  <Col span={10} className='underline'>
                    {this.props.data?.technician}
                  </Col>
                  <Col span={3}>
                    Signed:
                  </Col>
                  <Col span={6} className='underline'>
                    {this.props.data?.signature_level ? (
                      <>
                        {this.props.data?.signature && (
                          <img style={{ width: '100%', position: 'absolute', bottom: '-5px', right: '1.6mm' }} src={this.props.data?.signature} alt='' />
                        )}
                      </>
                    ) : (
                      <>
                        {this.props.data?.signature_logo && (
                          <img style={{ width: '100%', position: 'absolute', bottom: 0, right: '1.6mm' }} src={`https://s3.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${this.props.data?.signature_logo}`} alt='' />
                        )}
                      </>
                    )}
                  </Col>
                </Row>
                <div className='title'>
                  ANSI / ASME N510-2007
                </div>
              </PrintWrapper>
            </>
          )}
        </div>
      </div>
    )
  }

}
 
export default PdfComponent;