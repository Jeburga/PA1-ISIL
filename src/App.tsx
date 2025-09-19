import { BrowserRouter, Routes, Route } from 'react-router'

import './App.css'
import Inicio from './pages/Inicio'
import Footer from './common/Footer'
import Navbar from './common/Navbar'
import Equipo from './pages/Equipo'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/equipo" element={<Equipo />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
