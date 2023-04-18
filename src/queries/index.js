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

export const getInterpreterProfiles = async (itemId) => {
  try {
    const { data } = await axios.post('https://0yluem4whb.execute-api.us-east-1.amazonaws.com/BusInterprete', {
      Id_Interprete: itemId,
      Metodo: '2',
    });
    return JSON.parse(data);
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

const queries = {
  getInterpreterProfiles,
  getInterpreters,
};

export default queries;
