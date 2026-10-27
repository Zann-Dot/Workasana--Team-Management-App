import { Route, Routes } from "react-router"
import LandingPage from "./pages/Landing"
import MainLayout from "./MainLayout"


export function App() {
  return (
    <Routes>
      <Route element={<MainLayout />} >
        <Route index element={<LandingPage />} />
      </Route>
    </Routes>
  )
}

export default App
