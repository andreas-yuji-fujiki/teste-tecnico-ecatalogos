import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { register } from 'swiper/element'
register()

import App from '../App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
