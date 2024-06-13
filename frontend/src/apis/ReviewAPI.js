
const baseUrl = 'http://127.0.0.1:3030/reviews';

async function jsonFetch(url) {
  return fetch(url)
    .then((response) => response.json());
}

async function getAll() {
  return jsonFetch(baseUrl);
}

async function getReview(reviewId) {
  const url = `${baseUrl}?id=${reviewId}`;
  return jsonFetch(url);
}

const API = {
  getAll,
  getReview,
  jsonFetch,
};

export default API;
