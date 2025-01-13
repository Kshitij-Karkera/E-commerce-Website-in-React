import React from 'react'
import './YourAccount.css'
import { auth } from '../firebaseHandler'
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { useEffect } from 'react';
import { useState } from 'react';

function YourAccount() {
  const length = Number(localStorage.getItem('item'))

  const user = auth.currentUser
  const [name, setName] = useState('')

  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [reAuthCurrentEmail, setreAuthCurrentEmail] = useState('')
  const [reAuthCurrentPassword, setreAuthCurrentPassword] = useState('')

  useEffect(() => {
    const editButton = document.querySelectorAll('.editDetails')
    const formCont = document.querySelectorAll('.form')

    for(let i = 0; i <= editButton.length - 1; i++) {
      editButton[i].addEventListener('click', () => {
        formCont[i].style.display === 'flex' ?
          formCont[i].style.display = 'none' :
          formCont[i].style.display = 'flex'
      })
    }
  }, [])

  const updateUserName = (e) => {
    e.preventDefault()
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      window.location.reload()
    }).catch((error) => {alert(error)})
  }

  const updateUserEmail = (e) => {
    e.preventDefault()
    const cred = EmailAuthProvider.credential(reAuthCurrentEmail, reAuthCurrentPassword)
    reauthenticateWithCredential(auth.currentUser, cred)
    .then(() => {
      updateEmail(auth.currentUser, newEmail).then(() => {
        alert('Email has been updated')
        window.location.reload()
      }).catch((error) => {
        alert(error.message)
      })
    }).catch((error) => {
      alert(error.message)
    })
  }

  const updateUserPassword = (e) => {
    e.preventDefault()
    localStorage.setItem('item', e.target.name.length)
    const cred = EmailAuthProvider.credential(reAuthCurrentEmail, reAuthCurrentPassword)
    reauthenticateWithCredential(auth.currentUser, cred)
    .then(() => {
      updatePassword(auth.currentUser, newPassword).then(() => {
        alert('Password has been updated')
        window.location.reload()
      }).catch((error) => {
        alert(error.message)
      })
    }).catch((error) => {
      alert(error.message)
    })
  }

  const updateUserPasswordLocal = (e) => {
    setNewPassword(e.target.value)
  }

  return (
    <div className='yourAccountContainer'>
      <h2>Your Account Details</h2>
      <div className='details'>
        <div className='subDetails'>
          <div className='userDetailsContainer'>Name : &nbsp;
            <div className='userDetails'>{user?.displayName ? user.displayName : 'User'}</div>
          </div>
          <div className='functions'>
          <form className='form' method='post' autoComplete='off'>
            <div className='forms_container'>
              <input type='text' className='inputField' onChange={e => setName(e.target.value)} required pattern='^(\w\w+)\s(\w+)$' placeholder='First & Last name' name="fname_lname" autoComplete='off' />
              <input type="submit" value="SUBMIT" className="submitButton" name="SUBMIT" onClick={updateUserName}/>
            </div>
          </form>
          <button className='editDetails'>Edit</button>
          </div>
        </div>

        <div className='subDetails'>
          <div className='userDetailsWithNote'>
            <div className='userDetailsContainer'>Email : &nbsp;
              <div className='userDetails'>{user?.email}</div>
            </div>
            <div className='Note'>
              <div>Note : To update your current Email-ID you new to re-authenticate with your current details.</div>
            </div>
          </div>
          <div className='functions'>
          <form className='form' method='post' autoComplete='off'>
            <div className='forms_container'>
              <div className='forms_subContainer'>
                <input type='text' className='inputField' onChange={e => setreAuthCurrentEmail(e.target.value)} required pattern='[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}' placeholder='Current Email ID' name="currentEmailID" autoComplete='off' />
              </div>
              <div className='forms_subContainer'>
                <input type='password' className='inputField' onChange={e => setreAuthCurrentPassword(e.target.value)} required pattern='[A-Za-z0-9#!@$%&*]{8,}' placeholder='Current Password' name="currentPassword" autoComplete='off' />
              </div>
              <div className='forms_subContainer'>
                <input type='text' className='inputField' onChange={e => setNewEmail(e.target.value)} required pattern='[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}' placeholder='New Email ID' name="newEmailID" autoComplete='off' />
              </div>
            </div>
            <input type="submit" value="SUBMIT" className="submitButton" name="SUBMIT" onClick={updateUserEmail} />
          </form>
          <button className='editDetails'>Edit</button>
          </div>
        </div>

        <div className='subDetails'>
          <div className='userDetailsWithNote'>
            <div className='userDetailsContainer'>Password : &nbsp;
              <div className='passwordValueContainer'>
                {
                  Array(length).fill().map((_, i) => {
                    return (
                      <div className='userDetails' key={i}>*</div>
                    )
                  })
                }
              </div>
            </div>
            <div className='Note'>
              <div>Note : To update your current Password you new to re-authenticate with your current details.</div>
            </div>
          </div>
          <div className='functions'>
          <form className='form' method='post' autoComplete='off'>
            <div className='forms_container'>
              <div className='forms_subContainer'>
                <input type='text' className='inputField' onChange={e => setreAuthCurrentEmail(e.target.value)} required pattern='[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}' placeholder='Current Email ID' name="currentEmailID" autoComplete='off' />
              </div>
              <div className='forms_subContainer'>
                <input type='password' className='inputField' onChange={e => setreAuthCurrentPassword(e.target.value)} required pattern='[A-Za-z0-9#!@$%&*]{8,}' placeholder='Current Password' name="currentPassword" autoComplete='off' />
              </div>
              <div className='forms_subContainer'>
                <input type='password' className='inputField' onChange={updateUserPasswordLocal} required pattern='[A-Za-z0-9#!@$%&*]{8,}' placeholder='New Password' name="newPassword" autoComplete='off' />
              </div>
            </div>
            <input type="submit" value="SUBMIT" className="submitButton" name={newPassword} onClick={updateUserPassword} />
          </form>
          <button className='editDetails'>Edit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YourAccount