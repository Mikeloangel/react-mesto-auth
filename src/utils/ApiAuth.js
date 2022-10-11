import parseErrorMessage from "./parseErrorMessage";

export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  });

  if (res.status === 201) {
    return res.json();
  }

  const errorMessage = await parseErrorMessage(res,'error');
  return Promise.reject(errorMessage);
}

export const authorization = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  });

  if (res.status === 200) {
    const data = await res.json();

    localStorage.setItem('token',data.token);
    return data.token;
  }

  const errorMessage = await parseErrorMessage(res);
  return Promise.reject(errorMessage);
}

export const checkToken = async (token) => {
  const res = await fetch(
    `${BASE_URL}/users/me`,
    {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  );

  if (res.status === 200) {
    const userData = await res.json();
    return userData.data;
  }

  const errorMessage = await parseErrorMessage(res);
  return Promise.reject(errorMessage);
}

export const forgetToken = () => {
  localStorage.removeItem('token');
}
