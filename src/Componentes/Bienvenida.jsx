
import styled, { keyframes } from 'styled-components';
import sayehLogo from '../Imagenes/salleLogo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Bienvenida = () => {
    return (
        <WelcomeContainer>
            {/* Logo de la aplicación */}
            <LogoWrapper>
                <Logo src={sayehLogo} alt="Sayeh Logo" />
            </LogoWrapper>

            {/* Contenido central */}
            <ContentArea>
                <Badge>Test de orientación Vocacional</Badge>
                <Title>Encuentra tu camino profesional</Title>
                <Description>
                    La vida te da opciones pero tú tomas las decisiones.
                </Description>
            </ContentArea>

            {/* Features y botón anclados abajo */}
            <BottomArea>
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
                        <span>Aplica a universidades top</span>
                    </FeatureChip>
                </FeaturesPreview>

                <ButtonWrapper>
                    <StartButton>
                        <span>Comenzar mi test</span>
                        <ButtonArrow>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </ButtonArrow>
                    </StartButton>
                </ButtonWrapper>
            </BottomArea>
        </WelcomeContainer>
    );
};


// ── Animaciones ──────────────────────────────────────────────────────────────

const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.18); }
  50%       { box-shadow: 0 0 0 12px rgba(255, 255, 255, 0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

// ── Styled Components ────────────────────────────────────────────────────────

/** Ocupa toda la pantalla del phone-screen y apila logo → contenido → botón */
const WelcomeContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px 40px;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
`;

// ── Logo ──────────────────────────────────────────────────────────────────────

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 72px;
  animation: ${fadeSlideUp} 0.7s ease-out forwards;
`;

const Logo = styled.img`
  width: 90px;
  height: 90px;
  object-fit: contain;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.92);
  padding: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  animation: ${pulse} 3s ease-in-out infinite;
`;

// ── Contenido central ─────────────────────────────────────────────────────────

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 16px;
  animation: ${fadeSlideUp} 0.8s 0.15s ease-out both;
`;

const Badge = styled.span`
  display: inline-block;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 6px 16px;
  border-radius: 50px;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.15;
  margin: 0;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);

  /* Gradiente animado sobre las palabras */
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
  font-size: 0.97rem;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.65;
  margin: 0;
  max-width: 320px;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
`;

// ── Área inferior ─────────────────────────────────────────────────────────────

const BottomArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  animation: ${fadeSlideUp} 0.9s 0.3s ease-out both;
`;

const FeaturesPreview = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
`;

const FeatureChip = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 50px;
  padding: 7px 14px;
  font-size: 0.8rem;
  color: #ffffff;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const FeatureIcon = styled.span`
  font-size: 1rem;
`;

/* Botón glassmorphism — destello horizontal al hover */
const glint = keyframes`
  0%   { left: -80%; }
  100% { left: 130%; }
`;

const arrowBounce = keyframes`
  0%, 100% { transform: translateX(0); }
  50%       { transform: translateX(5px); }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 340px;
`;

const StartButton = styled.button`
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  /* Glassmorphism base */
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  /* Borde brillante */
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  border-radius: 18px;

  color: #ffffff;
  font-size: 1.05rem;
  font-weight: 700;
  padding: 17px 2rem;
  cursor: pointer;
  letter-spacing: 0.4px;
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease;

  /* Sombra suave */
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.25),
    0 1px 0 rgba(255, 255, 255, 0.2) inset;

  /* Destello (pseudo-elemento) */
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

    /* Dispara el destello */
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

  /* El botón padre al hacer hover lanza la animación */
  ${StartButton}:hover & {
    animation: ${arrowBounce} 0.6s ease infinite;
  }
`;

export default Bienvenida;