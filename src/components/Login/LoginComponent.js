import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './LoginComponent.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseHandler';
import 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function LoginComponent() {
  const navigate = useNavigate();

  // ── Form field state ───────────────────────────────────────
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ── View state: which form is shown ───────────────────────
  // 'login' | 'signup'
  const [activeForm, setActiveForm] = useState('login');

  // Tracks whether the user has toggled yet so we don't apply
  // an animation class on the very first render (no bounce-in on mount)
  const [hasToggled, setHasToggled] = useState(false);

  // ── Responsive ────────────────────────────────────────────
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 708);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 708);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Handlers: switch forms ─────────────────────────────────
  const switchToSignup = () => {
    setActiveForm('signup');
    setHasToggled(true);
  };

  const switchToLogin = () => {
    setActiveForm('login');
    setHasToggled(true);
  };

  // ── Animation class for the form card ─────────────────────
  // Desktop : bounceLeft  (login → signup) / bounceRight (signup → login)
  // Mobile  : bounceLeftSmall / bounceRightSmall
  const formsAnimClass = () => {
    if (!hasToggled) return '';
    if (isMobile) {
      return activeForm === 'signup' ? 'bounceLeftSmall' : 'bounceRightSmall';
    }
    return activeForm === 'signup' ? 'bounceLeft' : 'bounceRight';
  };

  // ── Firebase: log in ──────────────────────────────────────
  const logIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => { if (credentials) navigate('/'); })
      .catch((error) => alert(error.message));
  };

  // ── Firebase: sign up ─────────────────────────────────────
  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials) => { if (credentials) window.location.reload(); })
      .catch((error) => alert(error.message));
  };

  const setPasswordLength = (e) => {
    setPassword(e.target.value);
    localStorage.setItem('item', e.target.value.length);
  };

  // ── Render ────────────────────────────────────────────────
  return (
    <LoginContainer className="loginContainer">

      {/*
        Mobile-only toggle buttons.
        Shown above the form card when the side panel is hidden.
        Only one is visible at a time depending on activeForm.
      */}
      {isMobile && (
        activeForm === 'login'
          ? (
            <button
              className="user_unregistered-signup"
              onClick={switchToSignup}
            >
              Sign up
            </button>
          ) : (
            <button
              className="user_registered-login"
              onClick={switchToLogin}
            >
              Login
            </button>
          )
      )}

      <div className="user_options-container">

        {/*
          Desktop side panel.
          Hidden on mobile by CSS (display: none on .user_options-text ≤708px).
        */}
        <div className="user_options-text">
          <div className="user_options-unregistered">
            <h2 className="user_unregistered-title">Don't have an account?</h2>
            <button
              className="user_unregistered-signup"
              onClick={switchToSignup}
            >
              Sign up
            </button>
          </div>
          <div className="user_options-registered">
            <h2 className="user_registered-title">Have an account?</h2>
            <button
              className="user_registered-login"
              onClick={switchToLogin}
            >
              Login
            </button>
          </div>
        </div>

        {/*
          Form card.
          Animation class is driven by React state — no raw DOM classList calls.
          CSS keyframes (bounceLeft/Right/Small) are unchanged and still do the work.
        */}
        <div
          className={`user_options-forms ${formsAnimClass()}`}
          id="user_options-forms"
        >

          {/* ── Login form ──────────────────────────────────── */}
          <div className="user_forms-login">
            <h2 className="forms_title">Login</h2>
            <form className="forms_form" method="post" autoComplete="off">
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    type="email"
                    placeholder="Email : example@gmail.com"
                    className="forms_field-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    name="lemail"
                    pattern="[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}"
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    placeholder="Password : Must be at least 8 characters"
                    className="forms_field-input"
                    value={password}
                    onChange={setPasswordLength}
                    required
                    name="lpass"
                    pattern="[A-Za-z0-9#!@$%&*]{8,}"
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <Link
                  type="button"
                  className="forms_buttons-forgot"
                  to="forgotpassword"
                >
                  Forgot password?
                </Link>
                <input
                  type="submit"
                  value="Log In"
                  className="forms_buttons-action"
                  onClick={logIn}
                  name="login"
                />
              </div>
            </form>
          </div>

          {/* ── Sign up form ────────────────────────────────── */}
          <div className="user_forms-signup">
            <h2 className="forms_title">Sign Up</h2>
            <form className="forms_form" method="post" autoComplete="off">
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    type="text"
                    placeholder="Email : example@gmail.com"
                    className="forms_field-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    name="semail"
                    pattern="[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}"
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    placeholder="Password : Must be at least 8 characters"
                    className="forms_field-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    name="spass"
                    pattern="[A-Za-z0-9#!@$%&*]{8,}"
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <input
                  type="submit"
                  value="Sign up"
                  className="forms_buttons-action"
                  onClick={signUp}
                  name="signup"
                />
              </div>
            </form>
          </div>

        </div>
      </div>
    </LoginContainer>
  );
}

export default LoginComponent;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 7em auto;
`;