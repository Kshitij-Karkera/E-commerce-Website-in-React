import React from 'react'
import './ForgotPassword.css'

function ForgotPassword() {
  return (
    <div className='forgotPasswordContainer'>
      <div className='forgotPassword'>
        <h2>Forgot Password</h2>
        <form className='form' method='post' autoComplete='off'>
          <div className='forms_container'>
            <div className='forms_subContainer'>
              <input type='text' className='inputField' required pattern='[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}' placeholder='Current Email ID' name="currentEmailID" autoComplete='off' />
            </div>
            <div className='forms_subContainer'>
              <input type='password' className='inputField' required pattern='[A-Za-z0-9#!@$%&*]{8,}' placeholder='Current Password' name="currentPassword" autoComplete='off' />
            </div>
            <div className='forms_subContainer'>
              <input type='text' className='inputField' required pattern='[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}' placeholder='New Email ID' name="newEmailID" autoComplete='off' />
            </div>
          </div>
          <input type="submit" value="SUBMIT" className="submitButton" name="SUBMIT" />
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword