import { Route, Routes } from "react-router"
import LandingPage from "./pages/Landing"
import MainLayout from "./MainLayout"
import LoginPage from "./pages/auth/Login"
import SignupPage from "./pages/auth/Signup"

export function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
    </Routes>
  )
}

export default App
