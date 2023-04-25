import React, { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { Context, initialState } from './store';
import './App.css';
import theme from './styles/theme';

import Accounts from './containers/Accounts';
import Collections from './containers/Collections';
import Home from './containers/Home';
import Interpreters from './containers/Interpreters';
import Login from './containers/Login';
import MenuAppBar from './components/CustomMenuAppBar';
import MusicalWorks from './containers/MusicalWorks';
import Phonograms from './containers/Phonograms';
import PotentialSuccesses from './containers/PotentialSuccesses';
import Ranking from './containers/Ranking';

window.Buffer = window.Buffer || require("buffer").Buffer;

// Create a client
const queryClient = new QueryClient();

function App() {
  const [state, setState] = useContext(Context);

  return (
    // Provide the client to App
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <div className="app">
            <div className="wrapper">
              {state.isLogged && <MenuAppBar account={state} handleLogout={() => setState(initialState)}/>}
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='cuentas/' element={<Accounts />} />
                  <Route path='fonogramas/' element={<Phonograms />} />
                  <Route path='iniciar-sesion/' element={<Login />} />
                  <Route path='interpretes/' element={<Interpreters />} />
                  <Route path='obras-musicales/' element={<MusicalWorks />} />
                  <Route path='potenciales-exitos/' element={<PotentialSuccesses />} />
                  <Route path='ranking/' element={<Ranking />} />
                  <Route path='recaudaciones/' element={<Collections />} />
                </Routes>
              </BrowserRouter>
            </div>
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
  );
}

export default App;
