import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './Pages/Landing'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}
