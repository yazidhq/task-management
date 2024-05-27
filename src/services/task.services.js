import axios from "axios";

export const store = (data, token, callback) => {
  axios
    .post("http://127.0.0.1:8000/api/task", data, {
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

export const get = (token, callback) => {
  axios
    .get("http://127.0.0.1:8000/api/task/get", {
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

export const update = (id, data, token, callback) => {
  axios
    .put("http://127.0.0.1:8000/api/task/update/" + id, data, {
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

export const destroy = (id, token, callback) => {
  axios
    .delete("http://127.0.0.1:8000/api/task/delete/" + id, {
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
