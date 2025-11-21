import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Inicio from "./pages/Inicio";
import Footer from "./common/Footer";
import Navbar from "./common/Navbar";
import Equipo from "./pages/Equipo";
import Cursos from "./pages/Cursos";
import CursoDetalles from "./pages/CursoDetalles";
import Carrito from "./pages/Carrito";
import EquipoLegal from "./pages/EquipoLegal";
import { Fundadores } from "./pages/Fundadores";
import FundadoresCRUD from "./pages/FundadoresCRUD";
import { Menu } from "./components/Menu";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/equipo" element={<Equipo />} />
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/cursos/:idcurso" element={<CursoDetalles />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/equipolegal" element={<EquipoLegal />} />
            <Route path="/fundadores" element={<Fundadores />} />
            <Route path="/login" element={<Login />} />
            <Route path="/menu" element={<Menu />} />
            
            {/* RUTA PROTEGIDA - CRUD */}
            <Route
              path="/fundadores-crud"
              element={
                <ProtectedRoute>
                  <FundadoresCRUD />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;