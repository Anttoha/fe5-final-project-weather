import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CitiesProvider from './components/CitiesProvider.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <CitiesProvider>
    <App />
    </CitiesProvider>
  // </StrictMode>,
)
