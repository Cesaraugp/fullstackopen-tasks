const axios = require("axios");
const baseUrl = "/api/login";

const login = async (credentials) => {
  const result = await axios.post(baseUrl, credentials);
  return result.data;
};

module.exports = { login };
