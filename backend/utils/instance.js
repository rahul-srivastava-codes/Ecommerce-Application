const axios = require("Axios");

const instance = axios.create({
  baseURL: "https://fakestoreapi.com",
});
module.exports = instance;
