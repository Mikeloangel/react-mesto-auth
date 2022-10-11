import React from "react";
import { useContext } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { AppContext } from '../contexts/AppContext';

function Header() {
  const appState = useContext(AppContext);

  return (
    <header className="section section-header">
      <Link to={'/'} className="section-header__logo-link">
        <div className="section-header__logo"></div>
      </Link>
      <div className="section-header__service">
        {appState.isLogged ? (
          <>
            <p className="section-header__info">{appState.userMail}</p>
            <Link to={'/sign-out'} className="section-header__link section-header__link_shaded">Выйти</Link>
          </>
        ) : (
          <Switch>
            <Route exact path={'/sign-up'}>
              <Link to={'/sign-in'} className="section-header__link">Войти</Link>
            </Route>
            <Route exact path={'/sign-in'}>
              <Link to={'/sign-up'} className="section-header__link">Регистрация</Link>
            </Route>
          </Switch>
        )}
      </div>
    </header>
  );
}

export default Header;
