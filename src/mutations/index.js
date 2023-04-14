import axios from 'axios';

export const addInterpreter = async (item) => {
  try {
    const { data } = await axios.post('https://du3z35eqob.execute-api.us-east-1.amazonaws.com/RegInterprete', item);
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
  deleteInterpreter,
  updateInterpreter,
};

export default mutations;
