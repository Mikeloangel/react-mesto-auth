import React from "react";
import { useState } from "react";
import updateFieldSetter from "../utils/updateFormFieldSetter";


function Login(props) {
  const [mailInput, setMailInput] = useState('');
  const [passwordInput, setPasswrodInput] = useState('');

  const fieldSetters = {
    'mail': setMailInput,
    'password': setPasswrodInput
  }

  function handleInputChange(e) {
    updateFieldSetter(fieldSetters, e.target.name, e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className="section section-sign">
      <h2 className="section-sign__title">Вход</h2>
      <form name="signup" className="section-sign__form" onSubmit={handleSubmit}>
        <input name="mail" type="email" required className="section-sign__input" placeholder="Email" value={mailInput} onChange={handleInputChange} />
        <input name="password" type="password" required className="section-sign__input" placeholder="Пароль" value={passwordInput} onChange={handleInputChange} />
        <button type="submit" className="section-sign__submit">Войти</button>
      </form>
    </section>
  );
}

export default Login;
