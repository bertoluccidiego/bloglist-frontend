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

async function update(blogObj, id) {
  const config = {
    headers: {
      Authorization: userToken,
    },
  };

  const response = await axios.put(`${baseUrl}/${id}`, blogObj, config);
  return response.data;
}

async function remove(id) {
  const config = {
    headers: {
      Authorization: userToken,
    },
  };

  await axios.delete(`${baseUrl}/${id}`, config);
}

const exportObj = {
  setToken,
  getAll,
  create,
  update,
  remove,
};

export default exportObj;
