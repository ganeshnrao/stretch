import orgs from "@/services/orgs";

export default function({ $axios, redirect, store }) {
  window.axios = $axios;
  window.store = store;

  orgs.setAxios($axios);

  $axios.defaults.headers.common.accesstoken = localStorage.getItem("token");
  $axios.defaults.baseURL = "http://localhost:1985";

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      redirect("/login");
      return;
    }
    if (code < 500) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    if (code >= 500) {
      redirect("/error");
    }
  });
}
