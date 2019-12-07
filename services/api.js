let axios;

function init({ $axios }) {
  axios = $axios;
  axios.defaults.baseURL = "http://localhost:3001";
}

function request(...args) {
  return axios.request(...args);
}

export default {
  init,
  request
};
