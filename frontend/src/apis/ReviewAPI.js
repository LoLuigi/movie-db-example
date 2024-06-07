
const baseUrl = 'http://127.0.0.1:3030/reviews'

async function jsonFetch(url) {
  return fetch(url)
    .then((response) => response.json())
}

async function getAll() {
  return jsonFetch(baseUrl);
}

async function getReview(reviewId) {
  throw new Error('Not yet implemented');
}

const API = {
  getAll,
  jsonFetch,
};

export default API;
