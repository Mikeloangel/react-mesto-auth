
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

   //getting proper error message from JSON response {'message':''}
   const isJSON = res.headers.get('content-type')?.includes('application/json');
   const data = isJSON ? await res.json() : null;
   const error = (data && data.error) || res.status;

   return Promise.reject(error);
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
