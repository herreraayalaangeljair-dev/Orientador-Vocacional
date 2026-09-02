
import Bienvenida from './Componentes/Bienvenida';
import './index.css';

function App() {
  return (
    <div className="phone-wrapper">
      <div className="phone-screen">
        {/* Video de fondo */}
        <video
          className="bg-video"
          src="https://res.cloudinary.com/ddglscghn/video/upload/v1788330594/Grabacio%CC%81n_de_pantalla_2026-09-02_a_la_s_0.28.45_cngjyj.mov"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Overlay semitransparente para que el texto sea legible */}
        <div className="bg-overlay" />
        {/* Contenido */}
        <Bienvenida />
      </div>
    </div>
  );
}

export default App;
