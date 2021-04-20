import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";


const register = (name, username, email, password, phoneNumber, riderPass) => {
  return axios.post(API_URL + "signup", {
    name,
    username,
    email,
    password,
    phoneNumber,
    riderPass
  });
};


const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentClient = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentClient,
};
