import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { InvitationProvider } from './context/InvitationContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InvitationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </InvitationProvider>
  </StrictMode>
)
