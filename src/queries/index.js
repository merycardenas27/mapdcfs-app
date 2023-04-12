/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export const getInterpretes = async () => {
  try {
    const { data } = await axios.get('https://h1h6ip1eb9.execute-api.us-east-1.amazonaws.com/LisInterprete');
    return JSON.parse(data);
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

export default getInterpretes;