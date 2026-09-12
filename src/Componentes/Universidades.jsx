import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebaseConfig/firebase";
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faSearch,
  faLocationDot,
  faStar,
  faGraduationCap,
  faTrophy,
  faUsers,
  faGlobe,
  faFilter,
  faAward,
  faMedal,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';

// ── Datos / Filtros ───────────────────────────────────────────────────────────

const TIPOS = [
  { id: 'todas', label: 'Todas' },
  { id: 'pública', label: 'Pública' },
  { id: 'privada', label: 'Privada' }
];

// Helper para quitar tildes y normalizar texto
const normalizeStr = (str) =>
  (str || '')
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

// ── Componente Tarjeta Individual con Subcolección 'becas' ────────────────────

const TarjetaUniversidad = ({ u, isOpen, toggleExpand }) => {
  const [becas, setBecas] = useState([]);
  const [loadingBecas, setLoadingBecas] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoadingBecas(true);
      const unsubscribe = onSnapshot(
        collection(db, 'universidades', u.id, 'Beca'),
        (snapshot) => {
          const arregloBecas = snapshot.docs.map((doc) => ({
            id: doc.id,
            nombre: doc.data().nombre || doc.data().Nombre || doc.id
          }));
          setBecas(arregloBecas);
          setLoadingBecas(false);
        },
        (error) => {
          console.error(`Error al obtener becas de ${u.id}:`, error);
          setLoadingBecas(false);
        }
      );
      return () => unsubscribe();
    }
  }, [isOpen, u.id]);

  const normTipo = normalizeStr(u.tipo);
  const defaultColor = normTipo === 'publica' ? '#3b82f6' : normTipo === 'privada' ? '#9333ea' : '#059669';
  const cardColor = u.color || defaultColor;

  // Detectar si u.logo, u.imagen o u.emoji contiene un link de Cloudinary/http
  const logoUrl = u.logo || u.imagen || (u.emoji && u.emoji.startsWith('http') ? u.emoji : null);
  const emojiFallback = normTipo === 'publica' ? '🏛️' : '🚀';

  const uniTitle = u.id;
  const uniSubTitle = u.nombre;

  return (
    <UniCard
      $color={cardColor}
      $open={isOpen}
      onClick={() => toggleExpand(u.id)}
    >
      {/* Cabecera de la tarjeta */}
      <CardTop>
        <EmojiBox $color={cardColor}>
          {logoUrl ? (
            <UniLogo src={logoUrl} alt={uniTitle} />
          ) : (
            u.emoji && !u.emoji.startsWith('http') ? u.emoji : emojiFallback
          )}
        </EmojiBox>
        <CardInfo>
          <UniName>{uniTitle}</UniName>
          {uniSubTitle && <UniFullName>{uniSubTitle}</UniFullName>}

          {/* Sitio oficial */}
          {u.sitio && (
            <SiteLink
              href={u.sitio.startsWith('http') ? u.sitio : `https://${u.sitio}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <FontAwesomeIcon icon={faGlobe} />
              Sitio oficial
            </SiteLink>
          )}
        </CardInfo>
        {u.ranking && (
          <RankBadge $color={cardColor}>
            <FontAwesomeIcon icon={faStar} />
            <span>#{u.ranking}</span>
          </RankBadge>
        )}
      </CardTop>

      {/* Expandible */}
      {isOpen && (
        <CardExpanded>
          <Divider $color={cardColor} />
          {u.descripcion && <Description>{u.descripcion}</Description>}

          {Array.isArray(u.areas) && u.areas.length > 0 && (
            <>
              <AreasTitle>Áreas destacadas:</AreasTitle>
              <AreasChips>
                {u.areas.map((a, i) => (
                  <AreaChip key={i} $color={cardColor}>{a}</AreaChip>
                ))}
              </AreasChips>
            </>
          )}

          {/* Subcolección Beca */}
          <BecasContainer $color={cardColor}>
            <BecasTitleRow>
              <BecasTitleLeft>
                <BecasIconWrapper $color={cardColor}>
                  <FontAwesomeIcon icon={faAward} />
                </BecasIconWrapper>
                <BecasTitleText>Becas disponibles</BecasTitleText>
                {!loadingBecas && becas.length > 0 && (
                  <BecasCountBadge $color={cardColor}>{becas.length}</BecasCountBadge>
                )}
              </BecasTitleLeft>
              {u.sitioBecas && (
                <BecasSiteLink
                  href={u.sitioBecas.startsWith('http') ? u.sitioBecas : `https://${u.sitioBecas}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                  <span>Ver todas</span>
                </BecasSiteLink>
              )}
            </BecasTitleRow>

            {loadingBecas ? (
              <BecasShimmerList>
                <BecasShimmerItem />
                <BecasShimmerItem style={{ width: '80%' }} />
                <BecasShimmerItem style={{ width: '65%' }} />
              </BecasShimmerList>
            ) : becas.length === 0 ? (
              <BecasEmptyState>
                <FontAwesomeIcon icon={faGraduationCap} />
                <BecasEmptyText>Sin becas registradas actualmente</BecasEmptyText>
              </BecasEmptyState>
            ) : (
              <BecasList>
                {becas.map((b, index) => (
                  <BecaItem key={b.id} $color={cardColor} $index={index}>
                    <BecaMedalIcon $color={cardColor}>
                      <FontAwesomeIcon icon={faMedal} />
                    </BecaMedalIcon>
                    <BecaName>{b.nombre}</BecaName>
                  </BecaItem>
                ))}
              </BecasList>
            )}
          </BecasContainer>

        </CardExpanded>
      )}
    </UniCard>
  );
};

// ── Componente Principal ──────────────────────────────────────────────────────

const Universidades = () => {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState('todas');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [universidades, setUniversidades] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'universidades'),
      (snapshot) => {
        const arreglo = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        console.log(`Universidades cargadas de Firestore (${arreglo.length}):`, arreglo);
        setUniversidades(arreglo);
      },
      (error) => {
        console.error('Error al obtener universidades de Firestore:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  const filtered = universidades.filter((u) => {
    const uTipo = normalizeStr(u.tipo);
    const selectedTipo = normalizeStr(tipo);
    const matchTipo = selectedTipo === 'todas' || uTipo === selectedTipo;

    const q = normalizeStr(search);
    const idStr = normalizeStr(u.id);
    const nombreStr = normalizeStr(u.nombre);
    const nombreCompletoStr = normalizeStr(u.nombreCompleto);
    const ubicacionStr = normalizeStr(u.ubicacion);
    const areas = Array.isArray(u.areas) ? u.areas : [];

    const matchSearch =
      !q ||
      idStr.includes(q) ||
      nombreStr.includes(q) ||
      nombreCompletoStr.includes(q) ||
      ubicacionStr.includes(q) ||
      areas.some((a) => normalizeStr(a).includes(q));

    return matchTipo && matchSearch;
  });

  const toggleExpand = (id) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <Container>

      {/* TopBar */}
      <TopBar>
        <BackButton onClick={() => navigate('/resultado')} type="button" aria-label="Volver">
          <FontAwesomeIcon icon={faArrowLeft} />
        </BackButton>
        <TopTitle>Universidades</TopTitle>
        <RankingLink href='https://www.topuniversities.com/world-university-rankings?countries=mx' target='_blank' rel='noopener noreferrer'>
          <FontAwesomeIcon icon={faTrophy} />
          <span>Rankings</span>
        </RankingLink>
        <CountBadge>{filtered.length}</CountBadge>
      </TopBar>

      {/* Buscador */}
      <SearchWrapper>
        <SearchIcon><FontAwesomeIcon icon={faSearch} /></SearchIcon>
        <SearchInput
          type="text"
          placeholder="Buscar universidad, área..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchWrapper>

      {/* Filtros de tipo */}
      <FiltersRow>
        <FilterLabel>
          <FontAwesomeIcon icon={faFilter} />
        </FilterLabel>
        {TIPOS.map((t) => (
          <FilterChip
            key={t.id}
            $active={tipo === t.id}
            onClick={() => setTipo(t.id)}
            type="button"
          >
            {t.label}
          </FilterChip>
        ))}
      </FiltersRow>

      {/* Lista */}
      <UniList>
        {filtered.length === 0 ? (
          <EmptyState>
            <FontAwesomeIcon icon={faGraduationCap} />
            <p>No se encontraron universidades con ese criterio.</p>
          </EmptyState>
        ) : (
          filtered.map((u) => (
            <TarjetaUniversidad
              key={u.id}
              u={u}
              isOpen={expandedId === u.id}
              toggleExpand={toggleExpand}
            />
          ))
        )}
      </UniList>

    </Container>
  );
};

// ── Animaciones ───────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const expandIn = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0px 0px rgba(96,165,250,0.0); }
  50%       { box-shadow: 0 0 10px 3px rgba(96,165,250,0.35); }
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
`;

const CountBadge = styled.span`
background: linear-gradient(135deg, rgba(37,99,235,0.85) 0%, rgba(109,40,217,0.80) 100%);
border: 1.5px solid rgba(167,139,250,0.9);
border-radius: 50px;
color: #ffffff;
font-size: 0.8rem;
font-weight: 800;
padding: 4px 13px;
letter-spacing: 0.04em;
backdrop-filter: blur(8px);
animation: ${pulseGlow} 3s ease-in-out infinite;
box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 0 12px rgba(139,92,246,0.5);
`;

// ── Buscador ──────────────────────────────────────────────────────────────────

const SearchWrapper = styled.div`
  position: relative;
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
  align-items: center;
  animation: ${fadeUp} 0.5s 0.1s ease-out both;
`;

const FilterLabel = styled.span`
  color: rgba(255,255,255,0.5);
  font-size: 0.82rem;
  flex-shrink: 0;
`;

const FilterChip = styled.button`
  padding: 5px 14px;
  border-radius: 50px;
  font-size: 0.73rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  background: ${({ $active }) =>
    $active ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.08)'};
  border: 1px solid ${({ $active }) =>
    $active ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.16)'};
  color: ${({ $active }) => ($active ? '#fff' : 'rgba(255,255,255,0.7)')};

  &:hover { background: rgba(255,255,255,0.2); color: #fff; }
`;

// ── Lista ─────────────────────────────────────────────────────────────────────

const UniList = styled.div`
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

// ── Tarjeta ───────────────────────────────────────────────────────────────────

const UniCard = styled.div`
  width: 100%;
  background: rgba(255,255,255,0.07);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1.5px solid ${({ $open, $color }) =>
    $open ? $color + '99' : 'rgba(255,255,255,0.13)'};
  border-radius: 16px;
  padding: 12px 14px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: ${({ $open, $color }) =>
    $open ? `0 6px 20px ${$color}33` : '0 4px 12px rgba(0,0,0,0.2)'};

  &:hover {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.28);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const EmojiBox = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 12px;
  background: ${({ $color }) => $color}33;
  border: 1px solid ${({ $color }) => $color}55;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  overflow: hidden;
`;

const UniLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  padding: 2px;
  box-sizing: border-box;
`;

const CardInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
`;

const UniName = styled.p`
  font-size: 0.88rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
`;

const UniFullName = styled.p`
  font-size: 0.68rem;
  color: rgba(255,255,255,0.55);
  margin: 0;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 2px;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.68rem;
  color: rgba(255,255,255,0.6);
  font-weight: 500;

  svg { font-size: 0.62rem; }
`;

const RankBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background: ${({ $color }) => $color}22;
  border: 1px solid ${({ $color }) => $color}55;
  border-radius: 50px;
  padding: 4px 8px;
  color: ${({ $color }) => $color};
  font-size: 0.7rem;
  font-weight: 700;
  flex-shrink: 0;
  white-space: nowrap;
`;

// ── Expandible ────────────────────────────────────────────────────────────────

const CardExpanded = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  animation: ${expandIn} 0.25s ease-out;
  margin-top: 4px;
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ $color }) => $color}44;
  margin: 6px 0 2px;
  border-radius: 2px;
`;

const Description = styled.p`
  font-size: 0.78rem;
  color: rgba(255,255,255,0.8);
  line-height: 1.4;
  margin: 0;
`;

const AreasTitle = styled.p`
  font-size: 0.7rem;
  font-weight: 700;
  color: rgba(255,255,255,0.65);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`;

const AreasChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const AreaChip = styled.span`
  background: ${({ $color }) => $color}22;
  border: 1px solid ${({ $color }) => $color}44;
  color: #fff;
  border-radius: 50px;
  padding: 3px 10px;
  font-size: 0.68rem;
  font-weight: 600;
`;

// ── Becas Styled Components ───────────────────────────────────────────────────

const shimmerBecas = keyframes`
  0%   { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const BecasContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 6px;
  background: ${({ $color }) => $color}0d;
  border: 1px solid ${({ $color }) => $color}33;
  border-radius: 14px;
  padding: 10px 12px;
`;

const BecasTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const BecasTitleLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const BecasIconWrapper = styled.div`
  width: 24px;
  height: 24px;
  min-width: 24px;
  border-radius: 8px;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  color: #fff;
  box-shadow: 0 2px 6px rgba(245,158,11,0.4);
`;

const BecasTitleText = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
  text-transform: uppercase;
  letter-spacing: 0.6px;
`;

const BecasCountBadge = styled.span`
  background: linear-gradient(135deg, #f59e0b33, #f9731633);
  border: 1px solid #f59e0b66;
  color: #fbbf24;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 1px 7px;
  border-radius: 50px;
  letter-spacing: 0.3px;
`;

const BecasSiteLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.67rem;
  font-weight: 600;
  color: #93c5fd;
  text-decoration: none;
  background: rgba(147,197,253,0.1);
  border: 1px solid rgba(147,197,253,0.25);
  border-radius: 50px;
  padding: 3px 8px;
  transition: all 0.2s ease;
  white-space: nowrap;

  svg { font-size: 0.55rem; }

  &:hover {
    background: rgba(147,197,253,0.2);
    color: #bfdbfe;
    border-color: rgba(147,197,253,0.45);
  }
`;

const BecasShimmerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const BecasShimmerItem = styled.div`
  height: 32px;
  border-radius: 10px;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.05) 25%,
    rgba(255,255,255,0.12) 50%,
    rgba(255,255,255,0.05) 75%
  );
  background-size: 200px 100%;
  animation: ${shimmerBecas} 1.4s ease-in-out infinite;
`;

const BecasEmptyState = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 2px;

  span { font-size: 1rem; }
`;

const BecasEmptyText = styled.p`
  font-size: 0.72rem;
  color: rgba(255,255,255,0.4);
  margin: 0;
  font-style: italic;
`;

const BecasList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const BecaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  background: rgba(255,255,255,0.05);
  border: 1px solid ${({ $color }) => $color}30;
  border-left: 3px solid ${({ $color }) => $color}99;
  border-radius: 10px;
  padding: 7px 10px;
  transition: all 0.2s ease;
  animation: ${expandIn} 0.2s ease-out both;
  animation-delay: ${({ $index }) => $index * 0.04}s;

  &:hover {
    background: rgba(255,255,255,0.09);
    border-left-color: ${({ $color }) => $color}dd;
    transform: translateX(2px);
  }
`;

const BecaMedalIcon = styled.span`
  font-size: 0.65rem;
  color: #fbbf24;
  flex-shrink: 0;
  opacity: 0.85;
`;

const BecaName = styled.span`
  font-size: 0.76rem;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
  line-height: 1.3;
`;

// Legacy stubs (unused but kept to avoid missing-ref errors)
const BecaHeader = styled.div``;
const BecaBadge = styled.span``;
const BecaDesc = styled.p``;
const BecaReqs = styled.p``;

const SiteLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.74rem;
  font-weight: 600;
  color: #93c5fd;
  text-decoration: none;
  align-self: flex-start;
  margin-top: 4px;
  transition: opacity 0.2s;

  &:hover { opacity: 0.8; text-decoration: underline; }
`;

const RankingLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: linear-gradient(
    120deg,
    rgba(251,191,36,0.18) 0%,
    rgba(245,158,11,0.28) 40%,
    rgba(251,191,36,0.18) 100%
  );
  background-size: 200% auto;
  border: 1.5px solid rgba(251,191,36,0.55);
  border-radius: 50px;
  color: #fcd34d;
  font-size: 0.78rem;
  font-weight: 800;
  text-decoration: none;
  white-space: nowrap;
  backdrop-filter: blur(10px);
  letter-spacing: 0.04em;
  transition: all 0.25s ease;
  box-shadow:
    0 2px 8px rgba(245,158,11,0.20),
    inset 0 1px 0 rgba(255,255,255,0.12);
  animation: ${shimmer} 3.5s linear infinite;

  svg {
    font-size: 0.75rem;
    filter: drop-shadow(0 0 4px rgba(251,191,36,0.6));
  }

  &:hover {
    background-position: right center;
    border-color: rgba(251,191,36,0.85);
    color: #fde68a;
    transform: translateY(-2px) scale(1.03);
    box-shadow:
      0 6px 18px rgba(245,158,11,0.35),
      inset 0 1px 0 rgba(255,255,255,0.18);
  }

  &:active { transform: translateY(0) scale(0.98); }
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

export default Universidades;
