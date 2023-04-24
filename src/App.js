import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import './App.css';
import theme from './styles/theme';

import Accounts from './containers/Accounts';
import Collections from './containers/Collections';
import Home from './containers/Home';
import Interpreters from './containers/Interpreters';
import Login from './containers/Login';
import MusicalWorks from './containers/MusicalWorks';
import Phonograms from './containers/Phonograms';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to App
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <div className="app">
            <div className="wrapper">
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='cuentas/' element={<Accounts />} />
                  <Route path='fonogramas/' element={<Phonograms />} />
                  <Route path='iniciar-sesion/' element={<Login />} />
                  <Route path='interpretes/' element={<Interpreters />} />
                  <Route path='obras-musicales/' element={<MusicalWorks />} />
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
