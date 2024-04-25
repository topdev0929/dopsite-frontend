import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useParams } from 'react-router-dom'
// import getCustomers from '../../data/swr/customers/customers.js'
import { useSelector } from "react-redux"
import moment from 'moment';
import {
  Container,
} from "reactstrap";
import * as ST from './styles'
import { getDopInfo } from '../../data/project.js'
import PdfComponent from '../../components/Projects/pdf/PdfComponent.js'

const Print = () => {
  const [editData, setEditData] = useState()
  const { id } = useParams();
  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))
  // const { result } = getCustomers({ company_id: currentUser?.company_id })
  useEffect(() => {
    getDopInfo({id: id}).then(res => {
      var params = {
        customer_email: res[0].customer_email,
        customer_name: res[0].customer_name,
        project_name: res[0].project_name,
        customer_id: res[0].customer_id,
        ses_project_id: res[0].ses_project_id,
        reference_id: res[0].reference_id,
        project_id: res[0].project_id,

        certificate_id: res[0].certificate_id,
        equipment_type: res[0].equipment_type,
        make: res[0].make,
        model: res[0].model,
        serial_id: res[0].serial_id,
        cause_failure: res[0].cause_failure,
        equipment_test: res[0].equipment_test,
        
        project_city: res[0].project_city,
        project_state: res[0].project_state,
        project_street: res[0].project_street,
        project_zip: res[0].project_zip,

        technician: res[0].firstname + ' ' + res[0].lastname,
        city: res[0].city,
        state: res[0].state,
        street: res[0].street,
        zip: res[0].zip,
        logo: res[0].logo,
        phone: res[0].phone,
        signature: res[0].signature,
        signature_level: res[0].signature_level,
        signature_logo: res[0].signature_logo
      }
      if (params.equipment_test) {
        params.equipment_test = true
      } else {
        params.equipment_test = false
      }
      params.date = moment().format('MM/DD/YYYY')
      setEditData(params)
    })
  }, [id])
  const goMachine = () => {
    window.history.back()
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Print | DOP Test Network</title>
        </MetaTags>
        {currentUser?.role_id !== 10 && (
          <ST.EditWrapper>
            <Container fluid>
              {/* Render Breadcrumbs */}
              <Breadcrumbs title="DOP" breadcrumbItem="Print DOP" />
              <div className='back' onClick={() => goMachine()}>
                <i className='dripicons-arrow-thin-left'></i>
                <span>Back</span>
              </div>
              
              <PdfComponent data={editData} />
            </Container>
          </ST.EditWrapper>
        )}
      </div>
    </React.Fragment>
  )
}

export default Print;