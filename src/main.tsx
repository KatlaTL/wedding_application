import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { InvitationProvider } from './context/InvitationContext.tsx'
import {
  QueryClientProvider,
} from "@tanstack/react-query";
import { WishlistProvider } from './context/wishlistContext.tsx'
import { queryClient } from './queryClient.ts'

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
