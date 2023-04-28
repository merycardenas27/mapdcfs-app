/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export const getAccount = async (itemId) => {
  try {
    const { data } = await axios.post('https://qjh6rvwfng.execute-api.us-east-1.amazonaws.com/BusCuenta',
    { Id_Cuenta: itemId });
    return JSON.parse(data);
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

export const getAccounts = async () => {
  try {
    const { data } = await axios.get('https://30ch4k4p17.execute-api.us-east-1.amazonaws.com/LisCuenta');
    return JSON.parse(data);
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

export const getCollection = async (itemId) => {
  try {
    const { data } = await axios.post('https://0tfeo5epjk.execute-api.us-east-1.amazonaws.com/BusRecaudacion',
    { Id_Recaudacion: itemId });
    return JSON.parse(data);
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

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

export const getInterpreterPhonogram = async (itemId) => {
  try {
    const { data } = await axios.post('https://cae7cg9051.execute-api.us-east-1.amazonaws.com/BusInterpreteFonograma',{
      Id_Fonograma: itemId,
    });
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

export const getRanking = async () => {
  try {
    const { data } = await axios.get('https://xxl374likg.execute-api.us-east-1.amazonaws.com/RankingMusical');
    return JSON.parse(data);
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

const queries = {
  getAccount,
  getAccounts,
  getCollection,
  getCollections,
  getGenres,
  getInterpreterPhonogram,
  getInterpreterProfiles,
  getInterpreters,
  getMusicalWorks,
  getPhonograms,
  getPlatforms,
  getRanking,
};

export default queries;
