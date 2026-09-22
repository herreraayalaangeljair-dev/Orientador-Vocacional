import Bienvenida from './Componentes/Bienvenida';
import './index.css';
import Login from './Componentes/Login';
import Registro from './Componentes/Registro';
import Preguntas from './Componentes/Preguntas';
import Resultado from './Componentes/Resultado';
import Carreras from './Componentes/Carreras';
import Universidades from './Componentes/Universidades';
import { Route, Routes } from 'react-router';
import VerMasCarrera from './Componentes/VerMasCarrera';
function App() {
  return (
    <div className="phone-wrapper">
      <div className="phone-screen">
        {/* Video de fondo */}

        {/* Overlay semitransparente para que el texto sea legible */}
        <div className="bg-overlay" />
        {/* Contenido */}
        <Routes>
          <Route path="/" element={<Bienvenida />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/preguntas" element={<Preguntas />} />
          <Route path="/resultado" element={<Resultado />} />
          <Route path="/carreras" element={<Carreras />} />
          <Route path="/universidades" element={<Universidades />} />
          <Route path="/ver-mas-carrera" element={<VerMasCarrera />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
