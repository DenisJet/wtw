import React, {useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';

import {login} from '../../store/api-action';

import {AppRoute, AuthorizationStatus} from '../../const';

const LoginPage = () => {
  const {authorizationStatus} = useSelector((state) => state.USER);

  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      history.push(`/`);
    }
  }, [authorizationStatus]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(login({
      login: emailRef.current.value,
      password: passwordRef.current.value,
    }));
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.MAIN} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" ref={emailRef} data-testid="email" />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" ref={passwordRef} data-testid="password" />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" data-testid="submit-button" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
