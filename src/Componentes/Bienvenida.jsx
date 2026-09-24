
import styled, { keyframes } from 'styled-components';
import logo from '../Imagenes/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faGraduationCap, faUniversity, faArrowRight, faPlay, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router';

const Bienvenida = () => {
  const navigate = useNavigate();
  return (
    <WelcomeContainer>

      {/* ── Header: Logo + Textos ── */}
      <Header>
        <Logo src={logo} alt="logo" />
        <Badge>Test de orientación Vocacional</Badge>
        <Title>Encuentra tu camino profesional</Title>
        <Description>Mírame 👇</Description>
      </Header>

      {/* ── Video Card (Heurísticas Nielsen & Tognazzini) ── */}
      <VideoCardContainer>
        <VideoLink
          href="https://youtube.com/shorts/fxG0ixYUAOc?si=gBipac_N94P6jlGN"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver video de introducción en YouTube Shorts (se abre en una nueva pestaña)"
        >
          <PlayIconWrapper>
            <FontAwesomeIcon icon={faYoutube} />
          </PlayIconWrapper>

          <VideoInfo>
            <VideoBadge>
              <span>Short</span>
              <FontAwesomeIcon icon={faExternalLinkAlt} style={{ fontSize: '0.6rem' }} />
            </VideoBadge>
            <VideoTitle>Video de introducción</VideoTitle>
            <VideoSubtitle>Conoce cómo funciona el test en 1 min</VideoSubtitle>
          </VideoInfo>

          <ActionArrow>
            <FontAwesomeIcon icon={faPlay} />
          </ActionArrow>
        </VideoLink>
      </VideoCardContainer>

      {/* ── Features ── */}
      <FeaturesPreview>
        <FeatureChip>
          <FeatureIcon><FontAwesomeIcon icon={faStopwatch} /></FeatureIcon>
          <span>15 minutos</span>
        </FeatureChip>
        <FeatureChip>
          <FeatureIcon><FontAwesomeIcon icon={faGraduationCap} /></FeatureIcon>
          <span>Descubre tu vocación</span>
        </FeatureChip>
        <FeatureChip>
          <FeatureIcon><FontAwesomeIcon icon={faUniversity} /></FeatureIcon>
          <span>Universidades top</span>
        </FeatureChip>
      </FeaturesPreview>

      {/* ── CTA ── */}
      <StartButton onClick={() => navigate('/login')}>
        <span>Comenzar mi test</span>
        <ButtonArrow>
          <FontAwesomeIcon icon={faArrowRight} />
        </ButtonArrow>
      </StartButton>

    </WelcomeContainer>
  );
};


// ── Animaciones ──────────────────────────────────────────────────────────────

const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.18); }
  50%       { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

const glint = keyframes`
  0%   { left: -80%; }
  100% { left: 130%; }
`;

const arrowBounce = keyframes`
  0%, 100% { transform: translateX(0); }
  50%       { transform: translateX(5px); }
`;

// ── Contenedor principal ──────────────────────────────────────────────────────

const WelcomeContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;  /* Distribuye el espacio de forma uniforme */
  padding: 28px 22px 28px;
  box-sizing: border-box;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  gap: 12px;
`;

// ── Header (Logo + Badge + Título + Descripción) ──────────────────────────────

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  animation: ${fadeSlideUp} 0.7s ease-out forwards;
`;

const Logo = styled.img`
  width: 62px;
  height: 62px;
  object-fit: contain;
  border-radius: 18px;
  background-color: #181c1e;
  padding: 8px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4);
  animation: ${pulse} 3s ease-in-out infinite;
  margin-bottom: 4px;
`;

const Badge = styled.span`
  display: inline-block;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 5px 14px;
  border-radius: 50px;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.28);
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.15;
  margin: 0;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.5);

  background: linear-gradient(
    120deg,
    #ffffff 0%,
    #c7d9ff 40%,
    #ffffff 60%,
    #ffd6e0 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 4s linear infinite;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
  margin: 4px 0 0 0;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
`;

// ── Tarjeta de Video (Principios Tognazzini & Nielsen) ─────────────────────────

const VideoCardContainer = styled.div`
  width: 100%;
  max-width: 380px;
  margin: 4px 0;
  animation: ${fadeSlideUp} 0.8s 0.15s ease-out both;
`;

const VideoLink = styled.a`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  width: 100%;
  box-sizing: border-box;
  text-decoration: none;
  border-radius: 18px;

  /* Glassmorphism y Visual Integrity (Nielsen #8 & Tognazzini Estética) */
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1.5px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);

  /* Feedback Inmediato e Interacción (Nielsen #1 & Tognazzini State Visibility) */
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  outline: none;

  /* Ley de Fitts: Tamaño Mínimo Recomendado (Tognazzini Target Area) */
  min-height: 64px;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 78, 78, 0.5);
    transform: translateY(-2px) scale(1.01);
    box-shadow:
      0 12px 28px rgba(255, 0, 0, 0.22),
      0 0 16px rgba(255, 255, 255, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }

  &:active {
    transform: translateY(0) scale(0.99);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
  }

  /* Accesibilidad de Teclado (Nielsen #1 & Protecciones Tognazzini) */
  &:focus-visible {
    border-color: #ff4e4e;
    box-shadow: 0 0 0 3px rgba(255, 78, 78, 0.5);
  }
`;

const PlayIconWrapper = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 1.5rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(255, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  ${VideoLink}:hover & {
    transform: scale(1.1);
    box-shadow: 0 6px 18px rgba(255, 0, 0, 0.6);
  }
`;

const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  flex: 1;
  overflow: hidden;
`;

const VideoBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(255, 0, 0, 0.2);
  color: #ff7b7b;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 10px;
  border: 1px solid rgba(255, 0, 0, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const VideoTitle = styled.span`
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const VideoSubtitle = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  font-weight: 400;
`;

const ActionArrow = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  flex-shrink: 0;

  ${VideoLink}:hover & {
    color: #ffffff;
    background: rgba(255, 0, 0, 0.8);
    transform: translateX(3px);
  }
`;

// ── Features ──────────────────────────────────────────────────────────────────

const FeaturesPreview = styled.div`
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  justify-content: center;
  animation: ${fadeSlideUp} 0.8s 0.25s ease-out both;
`;

const FeatureChip = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.11);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 6px 12px;
  font-size: 0.75rem;
  color: #ffffff;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const FeatureIcon = styled.span`
  font-size: 0.9rem;
`;

// ── Botón CTA ─────────────────────────────────────────────────────────────────

const StartButton = styled.button`
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  border-radius: 18px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  padding: 15px 2rem;
  cursor: pointer;
  letter-spacing: 0.4px;
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease;
  animation: ${fadeSlideUp} 0.8s 0.35s ease-out both;

  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.25),
    0 1px 0 rgba(255, 255, 255, 0.2) inset;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -80%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent 0%,
      rgba(255, 255, 255, 0.35) 50%,
      transparent 100%
    );
    transform: skewX(-20deg);
    pointer-events: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.22);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.6),
      0 1px 0 rgba(255, 255, 255, 0.25) inset;
    transform: translateY(-3px);

    &::before {
      animation: ${glint} 0.55s ease forwards;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ButtonArrow = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  opacity: 0.9;

  ${StartButton}:hover & {
    animation: ${arrowBounce} 0.6s ease infinite;
  }
`;

export default Bienvenida;