import { Navigate, Route, Routes } from "react-router"
import LandingPage from "./pages/Landing"
import MainLayout from "./routes/MainLayout"
import LoginPage from "./pages/auth/Login"
import SignupPage from "./pages/auth/Signup"
import Dashboard from "./pages/Dashboard"
import GuestRoutes from "./routes/GuestRoutes"
import ProtectedRoutes from "./routes/ProtectedRoutes"

export function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<GuestRoutes />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
