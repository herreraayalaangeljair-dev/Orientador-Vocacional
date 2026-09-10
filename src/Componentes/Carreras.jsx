import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../firebaseConfig/firebase';
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
  faChevronRight,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

// ── Datos de áreas para filtros ─────────────────────────────────────────────

const AREAS = [
  { id: 'todas', label: 'Todas', icon: faGraduationCap },
  { id: 'Area1', label: 'Área 1: Físico-Matemáticas', icon: faLaptopCode },
  { id: 'Area2', label: 'Área 2: Biológicas y Salud', icon: faStethoscope },
  { id: 'Area3', label: 'Área 3: Ciencias Sociales', icon: faBriefcase },
  { id: 'Area4', label: 'Área 4: Humanidades y Artes', icon: faPalette },
];

const getColorForArea = (collName) => {
  switch ((collName || '').toLowerCase()) {
    case 'area1':
      return '#60a5fa'; // Azul
    case 'area2':
      return '#a78bfa'; // Morado
    case 'area3':
      return '#34d399'; // Verde
    case 'area4':
      return '#f472b6'; // Rosa
    default:
      return '#fbbf24'; // Amarillo
  }
};

const normalizeStr = (str) =>
  (str || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

// ── Componente Principal ───────────────────────────────────────────────────────

const Carreras = () => {
  const navigate = useNavigate();
  const [activeArea, setActiveArea] = useState('todas');
  const [search, setSearch] = useState('');
  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const collectionsToFetch = ['Area1', 'Area2', 'Area3', 'Area4', 'carreras'];
    const unsubscribes = [];
    const carrerasDataMap = {};

    collectionsToFetch.forEach((collName) => {
      const unsub = onSnapshot(
        collection(db, collName),
        (snapshot) => {
          const docs = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: `${collName}_${doc.id}`,
              docId: doc.id,
              areaId: collName,
              nombre: data.nombre || data.Nombre || doc.id,
              duracion: data.duracion || data.Duracion || '',
              campo: data.campo || data.Campo || data.descripcion || data.Descripcion || '',
              area: data.area || data.Area || collName,
              color: data.color || getColorForArea(collName),
            };
          });
          carrerasDataMap[collName] = docs;

          const combined = Object.values(carrerasDataMap).flat();
          setCarreras(combined);
          setLoading(false);
        },
        (error) => {
          console.warn(`Firestore snapshot notice [${collName}]:`, error);
          carrerasDataMap[collName] = [];
          setCarreras(Object.values(carrerasDataMap).flat());
          setLoading(false);
        }
      );
      unsubscribes.push(unsub);
    });

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, []);

  const filtered = carreras.filter((c) => {
    const normActive = normalizeStr(activeArea);
    const matchArea =
      normActive === 'todas' ||
      normalizeStr(c.areaId) === normActive ||
      normalizeStr(c.area).includes(normActive);

    const normSearch = normalizeStr(search);
    const matchSearch =
      !normSearch ||
      normalizeStr(c.nombre).includes(normSearch) ||
      normalizeStr(c.campo).includes(normSearch) ||
      normalizeStr(c.duracion).includes(normSearch);

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
        <SearchIcon>
          <FontAwesomeIcon icon={faSearch} />
        </SearchIcon>
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
        {loading ? (
          <LoadingState>
            <FontAwesomeIcon icon={faSpinner} className="spin" />
            <p>Cargando carreras de Firestore...</p>
          </LoadingState>
        ) : filtered.length === 0 ? (
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
                {c.campo && <CarreraField>{c.campo}</CarreraField>}
                <CarreraFooter>
                  {c.duracion ? (
                    <DuracionChip>🕐 {c.duracion}</DuracionChip>
                  ) : (
                    <DuracionChip>💰 {c.salario}</DuracionChip>
                  )}
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

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
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
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
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
    background: rgba(255, 255, 255, 0.22);
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
  background: rgba(96, 165, 250, 0.25);
  border: 1px solid rgba(96, 165, 250, 0.4);
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
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  padding: 10px 14px 10px 36px;
  color: #fff;
  font-size: 0.88rem;
  outline: none;
  box-sizing: border-box;
  transition: all 0.25s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
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
  &::-webkit-scrollbar {
    display: none;
  }
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
    $active ? 'rgba(255, 255, 255, 0.28)' : 'rgba(255, 255, 255, 0.08)'};
  border: 1px solid
    ${({ $active }) =>
    $active ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.16)'};
  color: ${({ $active }) => ($active ? '#fff' : 'rgba(255, 255, 255, 0.7)')};
  box-shadow: ${({ $active }) =>
    $active ? '0 2px 12px rgba(255, 255, 255, 0.15)' : 'none'};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
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

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 50px 20px;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.85rem;

  .spin {
    animation: ${spin} 1s linear infinite;
    font-size: 1.6rem;
    color: #60a5fa;
  }
`;

const CarreraCard = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.22s ease;
  box-sizing: border-box;

  &:hover {
    background: rgba(255, 255, 255, 0.13);
    border-color: rgba(255, 255, 255, 0.28);
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
  color: rgba(255, 255, 255, 0.6);
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
  color: rgba(255, 255, 255, 0.65);
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

  span {
    font-size: 2.5rem;
  }
  p {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.65);
    text-align: center;
    margin: 0;
  }
`;

export default Carreras;
