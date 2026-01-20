import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { InvitationProvider } from './context/InvitationContext.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { WishlistProvider } from './context/wishlistContext.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60,
    },
    mutations: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <InvitationProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </InvitationProvider>
    </QueryClientProvider>
  </StrictMode>
)
