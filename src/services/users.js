import axios from 'axios';

const baseUrl = '/api/users';

async function getAll() {
  const response = await axios.get(baseUrl);
  return response.data;
}

const exportObj = {
  getAll,
};

export default exportObj;
