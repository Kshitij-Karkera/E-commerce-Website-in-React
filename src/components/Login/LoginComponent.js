import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import './LoginComponent.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebaseHandler'
import 'firebase/auth'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

function LoginComponent() {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const logIn = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then((credentials) => {
      if(credentials) {
        navigate('/')
      }
    })
    .catch((error) => alert(error.mesage))
  }  

  const signUp = e => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
    .then((credentials) => {
      console.log(credentials.user)
      if(credentials) {
        window.location.reload()
      }
    })
    .catch((error) => alert(error.mesage))
  }

  const setPasswordLength = (e) => {
    setPassword(e.target.value)
    localStorage.setItem('item', e.target.value.length)
  }

  useEffect(() => {
    const signupButton1 = document.querySelector('.user_unregistered-signup'),
    signupButton2 = document.querySelector('.user_options-unregistered .user_unregistered-signup'),
    loginButton1 = document.querySelector('.user_registered-login'),
    loginButton2 = document.querySelector('.user_options-registered .user_registered-login'),
    userForms = document.getElementById('user_options-forms')
    const themeToggle = document.querySelector('#theme-toggle')
    let mainLoginButton = document.querySelector('.loginButton')
    let mainLoginButtonText = document.querySelector('.loginButton .text')
    let cartButton = document.querySelector('.cartButton')
    let forgotPasswordButton = document.querySelector('.forms_buttons-forgot')
    let actionButton = document.querySelector('.forms_buttons-action')
    let formFieldInput = document.querySelector('.forms_field-input')

    window.addEventListener('load', () => {
      let width = window.innerWidth
      if(width <= 708) {
        userForms.style.position = 'absolute';
        userForms.style.top = '50%';
        userForms.style.left = '50%';
        userForms.style.transform = 'translate(-50%, -50%)';
        userForms.classList.remove('bounceRight')
        userForms.classList.remove('bounceLeft')
        loginButton1.style.display = 'none'
        signupButton1.style.display = 'block'

        signupButton1.addEventListener('click', () => {
          userForms.classList.add('bounceLeftSmall')
          userForms.classList.remove('bounceRightSmall')
          signupButton1.style.display = 'none'
          loginButton1.style.display = 'block'
        }, false)

        loginButton1.addEventListener('click', () => {
          userForms.classList.add('bounceRightSmall')
          userForms.classList.remove('bounceLeftSmall')
          signupButton1.style.display = 'block'
          loginButton1.style.display = 'none'
        }, false)


      } else if(width > 708) {
        userForms.style.left = '30px';
        userForms.style.transform = 'translate3d(100%, -50%, 0)';
        loginButton1.style.display = 'none'
        signupButton1.style.display = 'none'

        signupButton2.addEventListener('click', () => {
          userForms.classList.remove('bounceRight')
          userForms.classList.add('bounceLeft')
        }, false)

        loginButton2.addEventListener('click', () => {
          userForms.classList.remove('bounceLeft')
          userForms.classList.add('bounceRight')
        }, false)
      }
    })

    window.addEventListener('resize', () => {
      let width = window.innerWidth
      if(width <= 708) {
        userForms.style.position = 'absolute';
        userForms.style.top = '50%';
        userForms.style.left = '50%';
        userForms.style.transform = 'translate(-50%, -50%)';
        userForms.classList.remove('bounceRight')
        userForms.classList.remove('bounceLeft')
        loginButton1.style.display = 'none'
        signupButton1.style.display = 'block'


        signupButton1.addEventListener('click', () => {
          userForms.classList.add('bounceLeftSmall')
          userForms.classList.remove('bounceRightSmall')
          signupButton1.style.display = 'none'
          loginButton1.style.display = 'block'
        }, false)

        loginButton1.addEventListener('click', () => {
          userForms.classList.add('bounceRightSmall')
          userForms.classList.remove('bounceLeftSmall')
          signupButton1.style.display = 'block'
          loginButton1.style.display = 'none'
        }, false)

      } else if(width > 708) {
        userForms.style.left = '30px';
        userForms.style.transform = 'translate3d(100%, -50%, 0)';
        loginButton1.style.display = 'none'
        signupButton1.style.display = 'none'

        signupButton2.addEventListener('click', () => {
          userForms.classList.remove('bounceRight')
          userForms.classList.add('bounceLeft')
        }, false)


        loginButton2.addEventListener('click', () => {
          userForms.classList.remove('bounceLeft')
          userForms.classList.add('bounceRight')
        }, false)
      }
    })

    window.addEventListener('popstate', () => {
      let width = window.innerWidth
      if(width <= 708) {
        userForms.style.position = 'absolute';
        userForms.style.top = '50%';
        userForms.style.left = '50%';
        userForms.style.transform = 'translate(-50%, -50%)';
        userForms.classList.remove('bounceRight')
        userForms.classList.remove('bounceLeft')
        loginButton1.style.display = 'none'
        signupButton1.style.display = 'block'

        signupButton1.addEventListener('click', () => {
          userForms.classList.add('bounceLeftSmall')
          userForms.classList.remove('bounceRightSmall')
          signupButton1.style.display = 'none'
          loginButton1.style.display = 'block'
        }, false)

        loginButton1.addEventListener('click', () => {
          userForms.classList.add('bounceRightSmall')
          userForms.classList.remove('bounceLeftSmall')
          signupButton1.style.display = 'block'
          loginButton1.style.display = 'none'
        }, false)


      } else if(width > 708) {
        userForms.style.left = '30px';
        userForms.style.transform = 'translate3d(100%, -50%, 0)';
        loginButton1.style.display = 'none'
        signupButton1.style.display = 'none'

        signupButton2.addEventListener('click', () => {
          userForms.classList.remove('bounceRight')
          userForms.classList.add('bounceLeft')
        }, false)

        loginButton2.addEventListener('click', () => {
          userForms.classList.remove('bounceLeft')
          userForms.classList.add('bounceRight')
        }, false)
      }
    })

    if(window.location.pathname === '/login') {
      let width = window.innerWidth
      if(width <= 708) {
        userForms.style.position = 'absolute';
        userForms.style.top = '50%';
        userForms.style.left = '50%';
        userForms.style.transform = 'translate(-50%, -50%)';
        userForms.classList.remove('bounceRight')
        userForms.classList.remove('bounceLeft')
        loginButton1.style.display = 'none'
        signupButton1.style.display = 'block'

        signupButton1.addEventListener('click', () => {
          userForms.classList.add('bounceLeftSmall')
          userForms.classList.remove('bounceRightSmall')
          signupButton1.style.display = 'none'
          loginButton1.style.display = 'block'
        }, false)

        loginButton1.addEventListener('click', () => {
          userForms.classList.add('bounceRightSmall')
          userForms.classList.remove('bounceLeftSmall')
          signupButton1.style.display = 'block'
          loginButton1.style.display = 'none'
        }, false)


      } else if(width > 708) {
        userForms.style.left = '30px';
        userForms.style.transform = 'translate3d(100%, -50%, 0)';
        loginButton1.style.display = 'none'
        signupButton1.style.display = 'none'

        signupButton2.addEventListener('click', () => {
          userForms.classList.remove('bounceRight')
          userForms.classList.add('bounceLeft')
        }, false)

        loginButton2.addEventListener('click', () => {
          userForms.classList.remove('bounceLeft')
          userForms.classList.add('bounceRight')
        }, false)
      }
    }

    forgotPasswordButton.addEventListener('click', () => {
      mainLoginButton.style.display = 'flex'
      if(window.innerWidth > 720) {
        mainLoginButton.style.right = '1.5em'
        cartButton.style.right = '13em'
        themeToggle.style.right = '25em'
        mainLoginButtonText.style.display = 'flex'
      } else if(window.innerWidth <= 620 && window.innerWidth > 350) {
        cartButton.style.right = '7em'
        mainLoginButton.style.right = '1.5em'
        mainLoginButtonText.style.display = 'none'
      } else if(window.innerWidth <= 350 && window.innerWidth > 280) {
        cartButton.style.right = '5.5em'
        mainLoginButton.style.right = '1.5em'
        mainLoginButtonText.style.display = 'none'
      } else if(window.innerWidth <= 280) {
        cartButton.style.right = '4.5em'
        mainLoginButton.style.right = '.5em'
        mainLoginButtonText.style.display = 'none'
      } else {
        mainLoginButton.style.right = '1.5em'
        cartButton.style.right = '13em'
        themeToggle.style.right = '1.5em'
        mainLoginButtonText.style.display = 'flex'
      }
    })

    if(formFieldInput.validity.valid) {
      actionButton.addEventListener('click', () => {
        if(window.innerWidth > 720) {
          mainLoginButton.style.display = 'flex'
          mainLoginButton.style.right = '1.5em'
          cartButton.style.right = '13em'
          themeToggle.style.right = '25em'
          mainLoginButtonText.style.display = 'flex'
        } else if(window.innerWidth <= 620 && window.innerWidth > 350) {
          cartButton.style.right = '7em'
          mainLoginButton.style.display = 'flex'
          mainLoginButton.style.right = '1.5em'
          mainLoginButtonText.style.display = 'none'
        } else if(window.innerWidth <= 350 && window.innerWidth > 280) {
          cartButton.style.right = '5.5em'
          mainLoginButton.style.display = 'flex'
          mainLoginButton.style.right = '1.5em'
          mainLoginButtonText.style.display = 'none'
        } else if(window.innerWidth <= 280) {
          cartButton.style.right = '4.5em'
          mainLoginButton.style.right = '.5em'
          mainLoginButton.style.display = 'flex'
          mainLoginButtonText.style.display = 'none'
        } else {
          mainLoginButton.style.display = 'flex'
          mainLoginButton.style.right = '1.5em'
          cartButton.style.right = '13em'
          themeToggle.style.right = '1.5em'
          mainLoginButtonText.style.display = 'flex'
        }
      })
    }
  })
  
  return (
    <LoginContainer className='loginContainer'>
      <button className="user_unregistered-signup" style={{display: 'none'}}>Sign up</button>
      <button className="user_registered-login" style={{display: 'none'}}>Login</button>
      <div className="user_options-container">
        <div className="user_options-text">
          <div className="user_options-unregistered">
            <h2 className="user_unregistered-title">Don't have an account?</h2>
            
            <button className="user_unregistered-signup">Sign up</button>
          </div>
    
          <div className="user_options-registered">
            <h2 className="user_registered-title">Have an account?</h2>
            
            <button className="user_registered-login">Login</button>
          </div>
        </div>
        
        <div className="user_options-forms" id="user_options-forms">
          <div className="user_forms-login">
            <h2 className="forms_title">Login</h2>
            <form className="forms_form" method="post" autoComplete="off">
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input type="email" placeholder="Email : example@gmail.com" className="forms_field-input" value={email} onChange={e => setEmail(e.target.value)} required name="lemail" pattern='[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}' />
                </div>
                <div className="forms_field">
                  <input type="password" placeholder="Password : Must be at least 8 characters" className="forms_field-input" value={password} onChange={setPasswordLength} required name="lpass" pattern='[A-Za-z0-9#!@$%&*]{8,}'/>
                </div>
              </fieldset>
              <div className="forms_buttons">
                <Link type="button" className="forms_buttons-forgot" to='forgotpassword'>Forgot password?</Link>
                <input type="submit" value="Log In" className="forms_buttons-action" onClick={logIn} name="login" />
              </div>
            </form>
          </div>
          <div className="user_forms-signup">
            <h2 className="forms_title">Sign Up</h2>
            <form className="forms_form" method="post" autoComplete="off">
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input type="text" placeholder="Email : example@gmail.com" className="forms_field-input" value={email} onChange={e => setEmail(e.target.value)} required name="semail" pattern='[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}'/>
                </div>
                <div className="forms_field">
                  <input type="password" placeholder="Password : Must be at least 8 characters" className="forms_field-input" value={password} onChange={e => setPassword(e.target.value)} required name="spass" pattern='[A-Za-z0-9#!@$%&*]{8,}'/>
                </div>
              </fieldset>
              <div className="forms_buttons">
                <input type="submit" value="Sign up" className="forms_buttons-action" onClick={signUp} name="signup" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </LoginContainer>
  )
}

export default LoginComponent

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 7em auto;
`