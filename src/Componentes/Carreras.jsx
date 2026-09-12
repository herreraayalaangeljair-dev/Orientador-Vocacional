import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../firebaseConfig/firebase';
import styled, { keyframes } from 'styled-components';
import {
  Container,
  TopBar,
  BackButton,
  TopTitle,
  CountBadge,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  FiltersRow,
  FilterChip,
  EmptyState,
  fadeUp,
} from '../Elementos/EstilosComunes';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faSearch,
  faGraduationCap,
  faPalette,
  faBriefcase,
  faUniversity,
  faStethoscope,
  faSackDollar,
  faLaptopCode,
  faChevronRight,
  faSpinner,
  faVideo,
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
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    setLoading(true);
    const collectionsToFetch = ['Area1', 'area1', 'Area 1', 'Area2', 'Area3', 'Area4', 'carreras'];
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
              nombre: data.nombre || data.Nombre || data.carrera || data.Carrera || data.titulo || doc.id,
              descripcion: data.descripcion || data.Descripcion || data.desc || data.campo || data.Campo || '',
              salario: data.salario !== undefined ? data.salario : (data.Salario !== undefined ? data.Salario : (data.sueldo || data.Sueldo || '')),
              color: data.color || getColorForArea(collName),
              video: data.videoExplicativo || '',
            };
          });
          carrerasDataMap[collName] = docs;

          const combined = Object.values(carrerasDataMap).flat();
          console.log(`[Firestore] Cargados ${combined.length} documentos:`, combined);
          setCarreras(combined);
          setLoading(false);
        },
        (error) => {
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
      normalizeStr(c.areaId).replace(/\s+/g, '') === normActive.replace(/\s+/g, '');

    const normSearch = normalizeStr(search);
    const matchSearch =
      !normSearch ||
      normalizeStr(c.nombre).includes(normSearch) ||
      normalizeStr(c.descripcion).includes(normSearch) ||
      normalizeStr(c.salario).includes(normSearch);

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
          placeholder="Buscar carrera, descripción o salario..."
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
          filtered.map((c) => {
            const isOpen = expandedId === c.id;
            return (
              <CarreraCard
                key={c.id}
                $color={c.color}
                $open={isOpen}
                onClick={() => toggleExpand(c.id)}
              >
                <ColorBar $color={c.color} />
                <CardBody>
                  <CardHeaderRow>
                    <CarreraName>{c.nombre}</CarreraName>
                    <ChevronIcon $color={c.color} $open={isOpen}>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </ChevronIcon>
                  </CardHeaderRow>

                  {/* Vista preliminar simple */}
                  {!isOpen && c.salario && (
                    <CarreraFooter>
                      <DuracionChip><FontAwesomeIcon icon={faSackDollar} /> {c.salario}</DuracionChip>
                    </CarreraFooter>
                  )}

                  {/* Vista desplegada con detalles completos */}
                  {isOpen && (
                    <ExpandedContent>
                      {c.descripcion !== '' && (
                        <InfoBlock>
                          <InfoBlockHeader>
                            <FontAwesomeIcon icon={faGraduationCap} />
                            <span>Descripción</span>
                          </InfoBlockHeader>
                          <InfoBlockText>{c.descripcion}</InfoBlockText>
                          {c.video && (
                            <VideoLink href={c.video} target="_blank" rel="noopener noreferrer">
                              <FontAwesomeIcon icon={faVideo} />
                              <span>Video explicativo</span>
                            </VideoLink>
                          )}
                        </InfoBlock>
                      )}
                      {(c.salario !== '' && c.salario !== undefined && c.salario !== null) && (
                        <SalarioBadge>
                          <FontAwesomeIcon icon={faSackDollar} />
                          <span>{c.salario} <SalarioSub>MXN / año</SalarioSub></span>
                        </SalarioBadge>
                      )}
                      <VerUniversidadesRow>
                        <VerUniversidadesBtn type="button">
                          <FontAwesomeIcon icon={faUniversity} /> Ver universidades
                        </VerUniversidadesBtn>
                      </VerUniversidadesRow>
                    </ExpandedContent>
                  )}
                </CardBody>
              </CarreraCard>
            );
          })
        )}
      </CarrerasList>

      <SalaryFooter>
        <SalaryFooterLabel>
          <FontAwesomeIcon icon={faSackDollar} />
          <span>Información salarial extraída de:</span>
        </SalaryFooterLabel>
        <SalaryLinksRow>
          <SalaryLink href="https://mx.indeed.com/career/salaries" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faBriefcase} />
            Indeed México
          </SalaryLink>
          <SalaryLink href="https://www.glassdoor.com.mx/Sueldos/index.htm" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faBriefcase} />
            Glassdoor México
          </SalaryLink>
        </SalaryLinksRow>
      </SalaryFooter>

    </Container>
  );
};

// ── Animaciones (locales) ───────────────────────────────────────────────

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

// ── Styled Components (locales) ───────────────────────────────────────────────

// ── Lista ─────────────────────────────────────────────────────────────────────

// ── Lista ─────────────────────────────────────────────────────────────────────

const CarrerasList = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
  padding-right: 4px;
  animation: ${fadeUp} 0.5s 0.15s ease-out both;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.25);
    border-radius: 4px;
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
  flex-shrink: 0;
  height: max-content;
  align-items: stretch;
  background: ${({ $open }) =>
    $open ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.07)'};
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid ${({ $open }) => ($open ? 'rgba(255, 255, 255, 0.32)' : 'rgba(255, 255, 255, 0.14)')};
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.22s ease;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.13);
    border-color: rgba(255, 255, 255, 0.28);
    transform: translateY(-1px);
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
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CardHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const CarreraName = styled.p`
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  line-height: 1.3;
  flex: 1;
`;

const CarreraFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
`;

const DuracionChip = styled.span`
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 600;
`;

const ChevronIcon = styled.span`
  color: ${({ $color }) => $color};
  font-size: 0.75rem;
  opacity: 0.85;
  transition: transform 0.25s ease;
  transform: ${({ $open }) => ($open ? 'rotate(90deg)' : 'rotate(0deg)')};
`;

const ExpandedContent = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${fadeUp} 0.3s ease-out;
`;

const InfoBlock = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InfoBlockHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.64rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
  letter-spacing: 0.6px;
`;

const InfoBlockText = styled.p`
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.88);
  margin: 0;
  line-height: 1.45;
`;

const VideoLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 0.73rem;
  font-weight: 700;
  text-decoration: none;
  color: #ff7e7e;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.35);
  box-shadow: 0 2px 10px rgba(239, 68, 68, 0.12);
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  align-self: flex-start;

  &:hover {
    background: rgba(239, 68, 68, 0.22);
    border-color: rgba(239, 68, 68, 0.6);
    color: #ffa1a1;
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SalarioBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  background: rgba(52, 211, 153, 0.14);
  border: 1px solid rgba(52, 211, 153, 0.3);
  border-radius: 50px;
  padding: 5px 12px;
  font-size: 0.78rem;
  font-weight: 700;
  color: #6ee7b7;
`;

const SalarioSub = styled.span`
  font-size: 0.64rem;
  font-weight: 500;
  opacity: 0.7;
`;

const VerUniversidadesRow = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;

const VerUniversidadesBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border-radius: 50px;
  font-size: 0.72rem;
  font-weight: 800;
  cursor: pointer;
  border: none;
  background: linear-gradient(135deg, #7c3aed, #2563eb);
  color: #fff;
  box-shadow: 0 2px 12px rgba(124, 58, 237, 0.45);
  transition: all 0.22s ease;
  letter-spacing: 0.3px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  &:hover {
    background: linear-gradient(135deg, #6d28d9, #1d4ed8);
    box-shadow: 0 4px 20px rgba(124, 58, 237, 0.65);
    transform: translateY(-2px) scale(1.03);
  }

  &:active {
    transform: translateY(0) scale(1);
    box-shadow: 0 2px 8px rgba(124, 58, 237, 0.4);
  }
`;

// EmptyState importado desde EstilosComunes

// ── Footer de salarios ──────────────────────────────────────────────────────

const SalaryFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 28px;
  padding: 14px 20px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
`;

const SalaryFooterLabel = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  font-size: 0.68rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.35);
  text-transform: uppercase;
  letter-spacing: 0.7px;
`;

const SalaryLinksRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`;

const SalaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 14px;
  border-radius: 50px;
  font-size: 0.72rem;
  font-weight: 700;
  text-decoration: none;
  color: #93c5fd;
  background: rgba(147, 197, 253, 0.1);
  border: 1px solid rgba(147, 197, 253, 0.25);
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(147, 197, 253, 0.2);
    border-color: rgba(147, 197, 253, 0.55);
    color: #bfdbfe;
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(147, 197, 253, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default Carreras;
