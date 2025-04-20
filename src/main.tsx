import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// Import favicon properly
import favicon from './assets/LatheaGroup_Logo.png'

// Set favicon programmatically
const link = document.createElement('link')
link.rel = 'icon'
link.type = 'image/png'
link.href = favicon
document.head.appendChild(link)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)