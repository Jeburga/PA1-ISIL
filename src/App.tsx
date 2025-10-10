import { BrowserRouter, Routes, Route } from 'react-router'

import './App.css'
import Inicio from './pages/Inicio'
import Footer from './common/Footer'
import Navbar from './common/Navbar'
import Equipo from './pages/Equipo'
import Cursos  from './pages/Cursos'
import CursoDetalles from './pages/CursoDetalles'
import Carrito from './pages/Carrito'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/equipo" element={<Equipo />} />
          <Route path='/cursos' element={<Cursos />} />
          <Route path="/cursos/:idcurso" element={<CursoDetalles />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
