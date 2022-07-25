import axios from 'axios';

const baseUrl = '/api/blogs';

let userToken = null;

function setToken(token) {
  userToken = `Bearer ${token}`;
}

async function getAll() {
  const response = await axios.get(baseUrl);
  return response.data;
}

async function create(blogObj) {
  const config = {
    headers: {
      Authorization: userToken,
    },
  };

  const response = await axios.post(baseUrl, blogObj, config);
  return response.data;
}

const exportObj = {
  setToken,
  getAll,
  create,
};

export default exportObj;
