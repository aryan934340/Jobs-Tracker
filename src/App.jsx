import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Layout from './components/Layout'

// Lazy loaded pages
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Applications = lazy(() => import('./pages/Applications'))
const Analytics = lazy(() => import('./pages/Analytics'))
const Notes = lazy(() => import('./pages/Notes'))

function LoadingFallback() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '60vh', color: 'var(--text2)', fontSize: '14px',
      fontFamily: 'var(--font-body)'
    }}>
      Loading...
    </div>
  )
}

export default function App() {
  const darkMode = useSelector(s => s.ui.darkMode)

  return (
    <div data-theme={darkMode ? 'dark' : 'light'}>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  )
}
