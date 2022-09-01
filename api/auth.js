import HTTP from "./commonHTTP";

export default {
  endpoint: "/auth/v1",

  /**
   * Function untuk login
   * @param {*} nama_pengguna
   * @param {*} kata_sandi
   * @returns
   */
  login: function (nama_pengguna, kata_sandi) {
    return HTTP.post(this.endpoint + "/login", {
      params: {
        nama_pengguna: nama_pengguna,
        kata_sandi: kata_sandi,
      },
    });
  },

  check_page_authorization: function (token, permission) {
    return HTTP.post(this.endpoint + "/check_page_authorization", {
      params: {
        token: token,
        permission: permission,
      },
    });
  },

  check_authorized_page: function (token) {
    return HTTP.post(this.endpoint + "/check_authorized_page", {
      params: {
        token: token,
      },
    });
  },
};
