import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { InvitationProvider } from './context/InvitationContext.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <InvitationProvider>
        <App />
      </InvitationProvider>
    </QueryClientProvider>
  </StrictMode>
)
