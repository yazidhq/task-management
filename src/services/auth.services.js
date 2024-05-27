import axios from "axios";

export const register = (data, callback) => {
  axios
    .post("http://127.0.0.1:8000/api/user", data)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const login = (data, callback) => {
  axios
    .post("http://127.0.0.1:8000/api/user/login", data)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const get_current = (token, callback) => {
  axios
    .get("http://127.0.0.1:8000/api/user/current", {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      callback(true, res.data);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const update_current = (data, token, callback) => {
  axios
    .patch("http://127.0.0.1:8000/api/user/update", data, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      callback(true, res.data);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const logout_current = (token, callback) => {
  axios
    .delete("http://127.0.0.1:8000/api/user/logout", {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      callback(true, res.data);
    })
    .catch((err) => {
      callback(false, err);
    });
};
