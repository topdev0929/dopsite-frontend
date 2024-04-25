import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useParams } from 'react-router-dom'
import getCustomers from '../../data/swr/customers/getCustomers.js'
import { useSelector } from "react-redux"
import moment from 'moment';
import {
  Container,
} from "reactstrap";
import * as ST from './styles'
import { getDopsInfo } from '../../data/project.js'
import PdfComponent from '../../components/Projects/pdf/PdfComponent.js'

const PrintDops = () => {
  const [editData, setEditData] = useState()
  const { id } = useParams();
  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))
  const { result } = getCustomers({ company_id: currentUser?.company_id })
  useEffect(() => {
    getDopsInfo({project_id: id}).then(res => {
      var arr =  []
      for(var i in res) {
        var params = {
          customer_email: res[i].customer_email,
          customer_name: res[i].customer_name,
          project_name: res[i].project_name,
          customer_id: res[i].customer_id,
          ses_project_id: res[i].ses_project_id,
          reference_id: res[i].reference_id,
          project_id: res[i].project_id,

          certificate_id: res[i].certificate_id,
          equipment_type: res[i].equipment_type,
          make: res[i].make,
          model: res[i].model,
          serial_id: res[i].serial_id,
          cause_failure: res[i].cause_failure,
          equipment_test: res[i].equipment_test,
          
          project_city: res[i].project_city,
          project_state: res[i].project_state,
          project_street: res[i].project_street,
          project_zip: res[i].project_zip,

          technician: res[i].firstname + ' ' + res[i].lastname,
          city: res[i].city,
          state: res[i].state,
          street: res[i].street,
          zip: res[i].zip,
          logo: res[i].logo,
          phone: res[i].phone,
          signature: res[i].signature,
          signature_level: res[0].signature_level,
          signature_logo: res[0].signature_logo
        }
        if (params.equipment_test) {
          params.equipment_test = true
        } else {
          params.equipment_test = false
        }
        params.date = moment().format('MM/DD/YYYY')
        arr.push(params)
      }
      setEditData(arr)
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

export default PrintDops;