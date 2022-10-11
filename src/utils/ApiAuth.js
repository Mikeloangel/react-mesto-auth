
export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then((response) => {
      // console.log(response);
      try {
        if (response.status === 200) {
          return response.json();
        }
      } catch (e) {
        return (e)
      }
    })
    .then((res) => {
      // console.log(res)
      return res;
    })
    .catch((err) => console.log(err));
}

export const authorization = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then((res => {
      if (res.ok) return res.json();

      return Promise.reject(res.json());
    }))
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      }
    })
    .catch(err => console.log(err))
}

export const checkToken = (token) => {
  return fetch(
    `${BASE_URL}/users/me`,
    {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.json());
    })
  // .then(data => {
  //   if(data.data){
  //     return data.data;
  //   }
  //   return data;
  // })
  // .catch(e =>{
  //   return e;
  // })
}

export const forgetToken = () => {
  localStorage.removeItem('token');
}
