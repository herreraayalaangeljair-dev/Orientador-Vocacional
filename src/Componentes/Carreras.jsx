import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faSearch,
  faGraduationCap,
  faFlask,
  faPalette,
  faBriefcase,
  faStethoscope,
  faLaptopCode,
  faBookOpen,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

// ── Datos de carreras ─────────────────────────────────────────────────────────

const AREAS = [
  { id: 'todas',      label: 'Todas',     icon: faGraduationCap },
  { id: 'tech',       label: 'Tecnología', icon: faLaptopCode },
  { id: 'salud',      label: 'Salud',     icon: faStethoscope },
  { id: 'negocios',   label: 'Negocios',  icon: faBriefcase },
  { id: 'ciencias',   label: 'Ciencias',  icon: faFlask },
  { id: 'artes',      label: 'Artes',     icon: faPalette },
  { id: 'humanidades',label: 'Humanidades', icon: faBookOpen },
];

const CARRERAS = [
  // Tecnología
  { id: 1, area: 'tech',       nombre: 'Ingeniería en Sistemas Computacionales', duracion: '4.5 años', campo: 'Desarrollo de software, redes e IA', color: '#60a5fa' },
  { id: 2, area: 'tech',       nombre: 'Ingeniería en Inteligencia Artificial',  duracion: '4 años',   campo: 'Machine learning, visión computacional', color: '#60a5fa' },
  { id: 3, area: 'tech',       nombre: 'Ciberseguridad y Redes',                 duracion: '4 años',   campo: 'Seguridad informática, ethical hacking', color: '#60a5fa' },
  { id: 4, area: 'tech',       nombre: 'Ciencia de Datos e Ingeniería',          duracion: '4 años',   campo: 'Análisis de datos, estadística avanzada', color: '#60a5fa' },
  { id: 5, area: 'tech',       nombre: 'Ingeniería en Robótica',                 duracion: '4.5 años', campo: 'Automatización, mecatrónica, control', color: '#60a5fa' },
  { id: 6, area: 'tech',       nombre: 'Diseño UX/UI e Interacción',             duracion: '3.5 años', campo: 'Diseño de interfaces y experiencia de usuario', color: '#60a5fa' },
  // Salud
  { id: 7,  area: 'salud',     nombre: 'Medicina General',                       duracion: '7 años',   campo: 'Diagnóstico, tratamiento y prevención', color: '#a78bfa' },
  { id: 8,  area: 'salud',     nombre: 'Odontología',                            duracion: '5 años',   campo: 'Salud bucodental y cirugía maxilofacial', color: '#a78bfa' },
  { id: 9,  area: 'salud',     nombre: 'Psicología Clínica',                     duracion: '4 años',   campo: 'Salud mental, terapia y neuropsicología', color: '#a78bfa' },
  { id: 10, area: 'salud',     nombre: 'Nutrición y Ciencias de los Alimentos',  duracion: '4 años',   campo: 'Dietética, nutrición clínica y deportiva', color: '#a78bfa' },
  { id: 11, area: 'salud',     nombre: 'Enfermería',                             duracion: '4 años',   campo: 'Cuidado integral del paciente', color: '#a78bfa' },
  { id: 12, area: 'salud',     nombre: 'Fisioterapia y Rehabilitación',           duracion: '4 años',   campo: 'Recuperación física y terapia manual', color: '#a78bfa' },
  // Negocios
  { id: 13, area: 'negocios',  nombre: 'Administración de Empresas',             duracion: '4 años',   campo: 'Gestión organizacional, liderazgo', color: '#34d399' },
  { id: 14, area: 'negocios',  nombre: 'Marketing Digital y Comunicación',       duracion: '3.5 años', campo: 'Publicidad, redes sociales, branding', color: '#34d399' },
  { id: 15, area: 'negocios',  nombre: 'Finanzas y Contaduría Pública',          duracion: '4 años',   campo: 'Inversiones, contabilidad y auditoría', color: '#34d399' },
  { id: 16, area: 'negocios',  nombre: 'Comercio Internacional',                 duracion: '4 años',   campo: 'Exportaciones, logística y aduanas', color: '#34d399' },
  { id: 17, area: 'negocios',  nombre: 'Emprendimiento e Innovación',            duracion: '3.5 años', campo: 'Startups, modelo de negocios, inversión', color: '#34d399' },
  // Ciencias
  { id: 18, area: 'ciencias',  nombre: 'Ingeniería Civil',                       duracion: '5 años',   campo: 'Construcción, estructuras e infraestructura', color: '#fbbf24' },
  { id: 19, area: 'ciencias',  nombre: 'Física Aplicada',                        duracion: '4 años',   campo: 'Investigación, energía y fotónica', color: '#fbbf24' },
  { id: 20, area: 'ciencias',  nombre: 'Química Industrial',                     duracion: '4.5 años', campo: 'Procesos, materiales y laboratorio', color: '#fbbf24' },
  { id: 21, area: 'ciencias',  nombre: 'Biotecnología',                          duracion: '4.5 años', campo: 'Genética, bioprocesos y bioingeniería', color: '#fbbf24' },
  { id: 22, area: 'ciencias',  nombre: 'Ingeniería Ambiental',                   duracion: '4 años',   campo: 'Sustentabilidad, recursos naturales', color: '#fbbf24' },
  // Artes
  { id: 23, area: 'artes',     nombre: 'Diseño Gráfico y Comunicación Visual',   duracion: '4 años',   campo: 'Identidad visual, tipografía, multimedia', color: '#f472b6' },
  { id: 24, area: 'artes',     nombre: 'Animación Digital y VFX',                duracion: '4 años',   campo: 'Animación 3D, efectos visuales, cine', color: '#f472b6' },
  { id: 25, area: 'artes',     nombre: 'Arquitectura',                           duracion: '5 años',   campo: 'Diseño espacial, urbanismo, construcción', color: '#f472b6' },
  { id: 26, area: 'artes',     nombre: 'Producción Musical y Audiovisual',       duracion: '3.5 años', campo: 'Música, cine, radio y televisión', color: '#f472b6' },
  { id: 27, area: 'artes',     nombre: 'Fotografía y Artes Visuales',            duracion: '3 años',   campo: 'Fotografía comercial, arte contemporáneo', color: '#f472b6' },
  // Humanidades
  { id: 28, area: 'humanidades', nombre: 'Derecho',                              duracion: '5 años',   campo: 'Leyes, litigios y consultoría jurídica', color: '#fb923c' },
  { id: 29, area: 'humanidades', nombre: 'Pedagogía y Ciencias de la Educación', duracion: '4 años',   campo: 'Docencia, currículo y didáctica', color: '#fb923c' },
  { id: 30, area: 'humanidades', nombre: 'Filosofía y Humanidades',              duracion: '4 años',   campo: 'Ética, lógica e historia del pensamiento', color: '#fb923c' },
  { id: 31, area: 'humanidades', nombre: 'Comunicación y Periodismo',            duracion: '4 años',   campo: 'Medios, narrativa y opinión pública', color: '#fb923c' },
  { id: 32, area: 'humanidades', nombre: 'Relaciones Internacionales',           duracion: '4 años',   campo: 'Diplomacia, política exterior y DDHH', color: '#fb923c' },
];

// ── Componente ────────────────────────────────────────────────────────────────

const Carreras = () => {
  const navigate = useNavigate();
  const [activeArea, setActiveArea] = useState('todas');
  const [search, setSearch] = useState('');

  const filtered = CARRERAS.filter((c) => {
    const matchArea = activeArea === 'todas' || c.area === activeArea;
    const matchSearch =
      !search ||
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.campo.toLowerCase().includes(search.toLowerCase());
    return matchArea && matchSearch;
  });

  return (
    <Container>

      {/* TopBar */}
      <TopBar>
        <BackButton onClick={() => navigate('/resultado')} type="button" aria-label="Volver">
          <FontAwesomeIcon icon={faArrowLeft} />
        </BackButton>
        <TopTitle>Carreras universitarias</TopTitle>
        <CountBadge>{filtered.length}</CountBadge>
      </TopBar>

      {/* Buscador */}
      <SearchWrapper>
        <SearchIcon><FontAwesomeIcon icon={faSearch} /></SearchIcon>
        <SearchInput
          type="text"
          placeholder="Buscar carrera o campo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchWrapper>

      {/* Filtros de área */}
      <FiltersRow>
        {AREAS.map((a) => (
          <FilterChip
            key={a.id}
            $active={activeArea === a.id}
            onClick={() => setActiveArea(a.id)}
            type="button"
          >
            <FontAwesomeIcon icon={a.icon} />
            <span>{a.label}</span>
          </FilterChip>
        ))}
      </FiltersRow>

      {/* Lista de carreras */}
      <CarrerasList>
        {filtered.length === 0 ? (
          <EmptyState>
            <span>😕</span>
            <p>No se encontraron carreras con ese criterio.</p>
          </EmptyState>
        ) : (
          filtered.map((c) => (
            <CarreraCard key={c.id} $color={c.color}>
              <ColorBar $color={c.color} />
              <CardBody>
                <CarreraName>{c.nombre}</CarreraName>
                <CarreraField>{c.campo}</CarreraField>
                <CarreraFooter>
                  <DuracionChip>🕐 {c.duracion}</DuracionChip>
                  <ChevronIcon $color={c.color}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </ChevronIcon>
                </CarreraFooter>
              </CardBody>
            </CarreraCard>
          ))
        )}
      </CarrerasList>

    </Container>
  );
};

// ── Animaciones ───────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ── Styled Components ─────────────────────────────────────────────────────────

const Container = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 12px;
  box-sizing: border-box;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  gap: 12px;
  overflow: hidden;
`;

// ── TopBar ────────────────────────────────────────────────────────────────────

const TopBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  animation: ${fadeUp} 0.5s ease-out;
`;

const BackButton = styled.button`
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 12px;
  color: #fff;
  width: 38px;
  height: 38px;
  min-width: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255,255,255,0.22);
    transform: translateX(-2px);
  }
`;

const TopTitle = styled.h1`
  flex: 1;
  font-size: 1rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CountBadge = styled.span`
  background: rgba(96,165,250,0.25);
  border: 1px solid rgba(96,165,250,0.4);
  border-radius: 50px;
  color: #93c5fd;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 3px 10px;
  min-width: 28px;
  text-align: center;
`;

// ── Buscador ──────────────────────────────────────────────────────────────────

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  animation: ${fadeUp} 0.5s 0.05s ease-out both;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255,255,255,0.5);
  font-size: 0.85rem;
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 14px;
  padding: 10px 14px 10px 36px;
  color: #fff;
  font-size: 0.88rem;
  outline: none;
  box-sizing: border-box;
  transition: all 0.25s ease;

  &::placeholder { color: rgba(255,255,255,0.4); }

  &:focus {
    border-color: rgba(255,255,255,0.5);
    background: rgba(255,255,255,0.15);
    box-shadow: 0 0 0 3px rgba(255,255,255,0.1);
  }
`;

// ── Filtros ───────────────────────────────────────────────────────────────────

const FiltersRow = styled.div`
  display: flex;
  gap: 7px;
  overflow-x: auto;
  padding-bottom: 2px;
  animation: ${fadeUp} 0.5s 0.1s ease-out both;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const FilterChip = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  padding: 6px 12px;
  border-radius: 50px;
  font-size: 0.73rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  background: ${({ $active }) =>
    $active ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.08)'};
  border: 1px solid ${({ $active }) =>
    $active ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.16)'};
  color: ${({ $active }) => ($active ? '#fff' : 'rgba(255,255,255,0.7)')};
  box-shadow: ${({ $active }) =>
    $active ? '0 2px 12px rgba(255,255,255,0.15)' : 'none'};

  &:hover {
    background: rgba(255,255,255,0.2);
    color: #fff;
  }
`;

// ── Lista ─────────────────────────────────────────────────────────────────────

const CarrerasList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  padding-right: 2px;
  animation: ${fadeUp} 0.5s 0.15s ease-out both;

  &::-webkit-scrollbar { width: 3px; }
  &::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.2);
    border-radius: 3px;
  }
`;

const CarreraCard = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  background: rgba(255,255,255,0.07);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.22s ease;
  box-sizing: border-box;

  &:hover {
    background: rgba(255,255,255,0.13);
    border-color: rgba(255,255,255,0.28);
    transform: translateX(3px);
  }
`;

const ColorBar = styled.div`
  width: 4px;
  min-width: 4px;
  background: ${({ $color }) => $color};
  border-radius: 14px 0 0 14px;
`;

const CardBody = styled.div`
  flex: 1;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const CarreraName = styled.p`
  font-size: 0.82rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  line-height: 1.25;
`;

const CarreraField = styled.p`
  font-size: 0.72rem;
  color: rgba(255,255,255,0.6);
  margin: 0;
  line-height: 1.3;
`;

const CarreraFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
`;

const DuracionChip = styled.span`
  font-size: 0.68rem;
  color: rgba(255,255,255,0.65);
  font-weight: 600;
`;

const ChevronIcon = styled.span`
  color: ${({ $color }) => $color};
  font-size: 0.7rem;
  opacity: 0.8;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 40px 20px;

  span { font-size: 2.5rem; }
  p {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.65);
    text-align: center;
    margin: 0;
  }
`;

export default Carreras;
