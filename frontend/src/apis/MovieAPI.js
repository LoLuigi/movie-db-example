
const baseUrl = 'http://127.0.0.1:3030/movies'

async function jsonFetch(url) {
  return fetch(url)
    .then((response) => response.json())
}

async function getAll() {
  return jsonFetch(baseUrl);
}

async function getAllBatch(page, size) {
  const url = `${baseUrl}?size=${size}&page=${page}`;
  return jsonFetch(url);
}

async function getMovie(movieId) {
  throw new Error('Not yet implemented');
}

const API = {
  getAll,
  getAllBatch,
  jsonFetch,
};

export default API;
