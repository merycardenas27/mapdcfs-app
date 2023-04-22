/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export const getCollections = async () => {
  try {
    const { data } = await axios.get('https://f88dl3e779.execute-api.us-east-1.amazonaws.com/LisRecaudacion');
    return JSON.parse(data);
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

export const getGenres = async () => {
  try {
    const { data } = await axios.get('https://9a3v0bkhd8.execute-api.us-east-1.amazonaws.com/LisGenero');
    return JSON.parse(data);
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

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

export const getPhonograms = async () => {
  try {
    const { data } = await axios.get('https://w8n8xg6w16.execute-api.us-east-1.amazonaws.com/LisFonograma');
    return JSON.parse(data);
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};


export const getPlatforms = async () => {
  try {
    const { data } = await axios.get('https://y39cf05zji.execute-api.us-east-1.amazonaws.com/LisPlataformaStreaming');
    return JSON.parse(data);
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

export const getMusicalWorks = async () => {
  try {
    const { data } = await axios.get('https://3yjjc1xfq5.execute-api.us-east-1.amazonaws.com/LisObraMusical');
    return JSON.parse(data);
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

const queries = {
  getCollections,
  getGenres,
  getInterpreterProfiles,
  getInterpreters,
  getMusicalWorks,
  getPhonograms,
  getPlatforms,
};

export default queries;
