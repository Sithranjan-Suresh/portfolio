import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// The original one-page site stays at "/" untouched. The two redesign
// previews are lazy-loaded so their code and styles never load on "/".
const Casino = lazy(() => import('./preview/casino/Casino.jsx'))
const Diner = lazy(() => import('./preview/diner/Diner.jsx'))
const Chooser = lazy(() => import('./preview/Chooser.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/preview" element={<Chooser />} />
          <Route path="/casino/*" element={<Casino />} />
          <Route path="/diner/*" element={<Diner />} />
          <Route path="*" element={<App />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
