import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Layout } from './components';
import { AddTaxForm, Taxes } from './modules';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/taxes"
            element={
              <Layout>
                <Taxes />
              </Layout>
            }
          />
          <Route
            path="/taxes/add"
            element={
              <Layout>
                <AddTaxForm />
              </Layout>
            }
          />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
