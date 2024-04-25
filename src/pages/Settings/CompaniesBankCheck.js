import React, { useEffect } from 'react';
import { openNotificationWithIcon } from '../../components/Modal/notification'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from "react-redux"
import { setBankAccount } from '../../data/comany'

const CompanyBankCheck = () => {
  const { id } = useParams();
  const history = useHistory();

  const { currentUser } = useSelector(state => ({
    currentUser: state.Login.user
  }))

  useEffect(() => {
    if (id === 'error') {
      openNotificationWithIcon('error', 'Note', 'Occuring error while connecting bank account, please try again.')
        history.push('/settings/company')
      } else {
      setBankAccount({ company_id: currentUser.company_id, bank_account: id }).then(res => {
        openNotificationWithIcon('success', 'Note', 'Was connecting your bank account successfully')
        history.push('/settings/company')
      })
    }
  }, [id])
  
  return (
    <></>
  )
}

export default CompanyBankCheck