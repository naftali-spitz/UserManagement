import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SnackbarProvider } from './context/SnackbarContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider>
    <App />
    </SnackbarProvider>
  </StrictMode>,
)
