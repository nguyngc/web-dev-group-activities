import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppWithCustomHook from './AppWithCustomHook'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWithCustomHook />
  </StrictMode>,
)
