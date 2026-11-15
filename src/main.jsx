import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Casino from './preview/casino/Casino.jsx'

// The casino design is the main portfolio. Two earlier versions are kept for
// reference only and are not linked from the main site:
//   /diner     the diner-menu design
//   /original  the first one-page site
const Diner = lazy(() => import('./preview/diner/Diner.jsx'))
const Original = lazy(() => import('./App.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/diner/*" element={<Diner />} />
          <Route path="/original" element={<Original />} />
          <Route path="/*" element={<Casino />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
