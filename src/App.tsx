import { ApolloProvider } from '@apollo/client';
import { client } from './lib/apollo';

import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';

import { Header } from './components/Header';
import { Submenu } from './components/Submenu';
import { Toaster } from 'react-hot-toast';

export function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Toaster />
          <Header />
          <Submenu />

          <Router />
        </BrowserRouter>
      </ApolloProvider>
    </div>
  )
}
