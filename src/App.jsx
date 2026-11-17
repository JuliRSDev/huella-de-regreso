import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import Footer from "./layout/Footer"
import Header from "./layout/Header"

import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'

// Lazy imports (code splitting)
const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Signup = lazy(() => import("./pages/Signup"))
const Profile = lazy(() => import("./pages/Profile"))
const NuevoReporte = lazy(() => import("./pages/NuevoReporte"))
const Publicaciones = lazy(() => import("./pages/Publicaciones"))
const QuienesSomos = lazy(() => import("./pages/QuienesSomos"))
const MisReportes = lazy(() => import("./pages/MisReportes"))
const EditarReporte = lazy(() => import("./pages/EditarReporte"))
const Estadisticas = lazy(() => import("./pages/Estadisticas"))
const Reporte = lazy(() => import("./pages/Reporte"))
const Legal = lazy(() => import("./pages/Legal"))

function App() {
  return (
    <>
      <Header />

      {/* Suspense loader global */}
      <main>
      <Suspense fallback={
        <div className="h-screen flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Cargando...</div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* PUBLIC */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          {/* PROTECTED */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/nuevo-reporte"
            element={
              <ProtectedRoute>
                <NuevoReporte />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mis-reportes"
            element={
              <ProtectedRoute>
                <MisReportes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editar-reporte/:id"
            element={
              <ProtectedRoute>
                <EditarReporte />
              </ProtectedRoute>
            }
          />

          {/* PUBLIC */}
          <Route path="/publicaciones" element={<Publicaciones />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/reporte/:id" element={<Reporte />} />
          <Route path="/terminos" element={<Legal page="terminos" />} />
          <Route path="/privacidad" element={<Legal page="privacidad" />} />
          <Route path="/seguridad" element={<Legal page="seguridad" />} />
        </Routes>
      </Suspense>
      </main>

      <Footer />
    </>
  )
}

export default App