import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Importa todos os estilos globais
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
