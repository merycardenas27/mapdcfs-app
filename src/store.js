import React, { createContext, useState } from 'react';

export const initialState = {
  name: '',
  lastname: '',
  isLogged: false,
};

export const Context = createContext();

const Store = ({ children }) => {
  const [state, setState ] = useState(initialState);

  return (<Context.Provider value={[state, setState]}>{children}</Context.Provider>);
};

export default Store;