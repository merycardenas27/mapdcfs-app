import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './containers/Home';
import Interpreters from './containers/Interpreters';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to App
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <div className="wrapper">
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='interpretes/' element={<Interpreters />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
