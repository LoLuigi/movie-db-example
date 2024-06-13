
const baseUrl = 'http://127.0.0.1:3030/users';

async function jsonFetch(url) {
  return fetch(url)
    .then((response) => response.json());
}

async function jsonPost(url, data) {
  return fetch(url, {
    method: 'POST',
    headers : {
      'Content-Type' : 'application/json',
      'body': data,
     },
     body: JSON.stringify(data),
    _body: true,
    Accept: 'application/json'
  })
    .then((response) => response.json());
};

async function postLogin(userData) {
const url = `${baseUrl}/login`;
  return jsonPost(url, userData);
};

async function postCreate(userData) {
  const url = `${baseUrl}/create`;
    return jsonPost(url, userData);
};

async function postEdit(userData) {
  const url = `${baseUrl}/edit`;
    return jsonPost(url, userData);
};

async function getUser(user) {
  const url = `${baseUrl}?useremail=${user}`;
  return jsonFetch(url);
};

const API = {
  postLogin,
  postEdit,
  getUser,
  postCreate,
  jsonFetch,
};

export default API;