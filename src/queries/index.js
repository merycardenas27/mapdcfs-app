/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export const getInterpreters = async () => {
  try {
    const { data } = await axios.get('https://h1h6ip1eb9.execute-api.us-east-1.amazonaws.com/LisInterprete');
    return JSON.parse(data);
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

export const getInterpreterProfiles = async (interpreterId) => {
  try {
    const { data } = await axios.post('https://0yluem4whb.execute-api.us-east-1.amazonaws.com/BusInterprete', {
      Id_Interprete: interpreterId,
      Metodo: '2',
    });
    return JSON.parse(data);
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

export const getPhonograms = async () => {
  try {
    const { data } = await axios.get('https://w8n8xg6w16.execute-api.us-east-1.amazonaws.com/LisFonograma');
    return JSON.parse(data);
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

const queries = {
  getInterpreterProfiles,
  getInterpreters,
  getPhonograms,
};

export default queries;
