import axios from 'axios';

export const addCollection = async (item) => {
  try {
    const { data } = await axios.post('https://5r95ja9dzc.execute-api.us-east-1.amazonaws.com/RegRecaudacion', item);
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

export const addInterpreter = async (item) => {
  try {
    const { data } = await axios.post('https://du3z35eqob.execute-api.us-east-1.amazonaws.com/RegInterprete', item);
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

export const addMusicalWork = async (item) => {
  try {
    const { data } = await axios.post('https://ndlzrykwwh.execute-api.us-east-1.amazonaws.com/RegObraMusical', item);
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

export const addPhonogram = async (item) => {
  try {
    const { data } = await axios.post('https://0ya2payk03.execute-api.us-east-1.amazonaws.com/RegFonograma', item);
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

export const deleteCollection = async (itemId) => {
  try {
    const { data } = await axios.delete('https://x5fe6ojs4a.execute-api.us-east-1.amazonaws.com/EliRecaudacion',{ data: { Id: itemId } });
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

export const deleteInterpreter = async (itemId) => {
  try {
    const { data } = await axios.delete('https://t3gz0tuvjg.execute-api.us-east-1.amazonaws.com/EliInterprete',{ data: { Id: itemId } });
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

export const deleteMusicalWork = async (itemId) => {
  try {
    const { data } = await axios.delete('https://luyxvdl16b.execute-api.us-east-1.amazonaws.com/EliObraMusical',{ data: { Id: itemId } });
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

export const deletePhonogram = async (itemId) => {
  try {
    const { data } = await axios.delete('https://kspuvscxr8.execute-api.us-east-1.amazonaws.com/EliFonograma',{ data: { Id: itemId } });
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

export const updateInterpreter = async (item) => {
  try {
    const { data } = await axios.put('https://74f3u7fi44.execute-api.us-east-1.amazonaws.com/ModInterprete',item);
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

const mutations = {
  addCollection,
  addInterpreter,
  addMusicalWork,
  addPhonogram,
  deleteCollection,
  deleteInterpreter,
  deleteMusicalWork,
  deletePhonogram,
  updateInterpreter,
};

export default mutations;
