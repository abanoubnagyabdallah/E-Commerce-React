import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import InternetConnectionProvider from './shared/InternetConnectionProvider.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <InternetConnectionProvider>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    </QueryClientProvider>
  </InternetConnectionProvider>
)