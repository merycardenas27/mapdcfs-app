import axios from 'axios';

export const addInterpreter = async (item) => {
  try {
    const { data } = await axios.post('https://du3z35eqob.execute-api.us-east-1.amazonaws.com/RegInterprete', item);
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

export const updateInterpreter = async (item) => {
  try {
    const { data } = await axios.put('https://74f3u7fi44.execute-api.us-east-1.amazonaws.com/ModInterprete',item);
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error);
  }
};

const mutations = {
  addInterpreter,
  deleteCollection,
  deleteInterpreter,
  deleteMusicalWork,
  updateInterpreter,
};

export default mutations;
