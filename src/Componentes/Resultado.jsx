import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRotateRight,
    faGraduationCap,
    faLightbulb,
    faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

// ── Datos de carreras por área ──────────────────────────────────────────────

const careerData = {
    'Tecnología e Innovación Digital': {
        emoji: '💻',
        color: '#60a5fa',
        gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        careers: ['Ingeniería de Software', 'Inteligencia Artificial', 'Ciberseguridad', 'Ciencia de Datos'],
        strength: 'Pensamiento lógico, resolución de problemas complejos y visión tecnológica.',
    },
    'Creatividad, Arte y Diseño': {
        emoji: '🎨',
        color: '#f472b6',
        gradient: 'linear-gradient(135deg, #ec4899, #f97316)',
        careers: ['Diseño UX/UI', 'Animación Digital & 3D', 'Dirección Creativa', 'Diseño Multimedia'],
        strength: 'Sensibilidad estética, pensamiento visual y comunicación creativa.',
    },
    'Negocios y Liderazgo Empresarial': {
        emoji: '🚀',
        color: '#34d399',
        gradient: 'linear-gradient(135deg, #10b981, #3b82f6)',
        careers: ['Administración y Emprendimiento', 'Marketing Estratégico', 'Finanzas Globales', 'Gestión de Proyectos'],
        strength: 'Liderazgo, toma de decisiones estratégicas y orientación a resultados.',
    },
    'Ciencias de la Salud y Cuidado': {
        emoji: '🩺',
        color: '#a78bfa',
        gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        careers: ['Medicina y Biotecnología', 'Psicología y Neurociencias', 'Nutrición y Rendimiento', 'Fisioterapia Avanzada'],
        strength: 'Empatía, vocación de servicio y capacidad analítica científica.',
    },
};

const defaultData = {
    emoji: '⭐',
    color: '#60a5fa',
    gradient: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
    careers: ['Ingeniería de Software', 'Diseño UX/UI', 'Marketing Estratégico', 'Psicología'],
    strength: 'Adaptabilidad, pensamiento crítico y motivación para crecer constantemente.',
};

// ── Componente ────────────────────────────────────────────────────────────────

const Resultado = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const resultadoTexto = location.state?.resultado || 'Tecnología e Innovación Digital';
    const data = careerData[resultadoTexto] || defaultData;

    return (
        <Container>

            {/* Barra superior */}
            <TopBar>
                <BackButton onClick={() => navigate('/preguntas')} type="button" aria-label="Volver">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </BackButton>
                <TopBadge>Resultado vocacional</TopBadge>
            </TopBar>

            {/* Gráfica de pastel de las 4 Áreas */}
            <ResultCard>
                <CardHeader>
                    <CardLabel>Tu perfil se enfoca más en:</CardLabel>
                    <AreaTitle>Área 1: Físico-Matemáticas</AreaTitle>
                </CardHeader>

                <ChartWrapper>
                    <PieChart />
                    <LegendContainer>
                        <LegendItem>
                            <ColorDot $color="#3b82f6" />
                            <span>Área 1: Físico-Matemáticas</span>
                        </LegendItem>
                        <LegendItem>
                            <ColorDot $color="#ec4899" />
                            <span>Área 2: Biológicas y Salud</span>
                        </LegendItem>
                        <LegendItem>
                            <ColorDot $color="#10b981" />
                            <span>Área 3: Ciencias Sociales</span>
                        </LegendItem>
                        <LegendItem>
                            <ColorDot $color="#f59e0b" />
                            <span>Área 4: Humanidades y Artes</span>
                        </LegendItem>
                    </LegendContainer>
                </ChartWrapper>
            </ResultCard>

            {/* Carreras recomendadas */}
            <Section>
                <SectionHeader>
                    <SectionIcon $color={data.color}>
                        <FontAwesomeIcon icon={faGraduationCap} />
                    </SectionIcon>
                    <SectionTitle>Ver carreras y universidades recomendadas</SectionTitle>
                </SectionHeader>
            </Section>

            {/* Fortalezas */}
            <StrengthCard>
                <StrengthHeader>
                    <FontAwesomeIcon icon={faLightbulb} />
                    <span>Puntos clave</span>
                </StrengthHeader>
                <StrengthText>{data.strength}</StrengthText>
            </StrengthCard>

            {/* Acciones */}
            <ActionsArea>
                <PrimaryButton onClick={() => navigate('/preguntas')} type="button">
                    <FontAwesomeIcon icon={faRotateRight} />
                    <span>Repetir test</span>
                </PrimaryButton>
                <GhostButton onClick={() => navigate('/')} type="button">
                    Volver al inicio
                </GhostButton>
            </ActionsArea>

        </Container>
    );
};

// ── Animaciones ───────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

const glint = keyframes`
  0%   { left: -80%; }
  100% { left: 130%; }
`;

// ── Styled Components ─────────────────────────────────────────────────────────

const Container = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 22px 22px 28px;
  box-sizing: border-box;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  gap: 10px;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 3px; }
  &::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.2);
    border-radius: 3px;
  }
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackButton = styled.button`
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 12px;
  color: #fff;
  width: 38px;
  height: 38px;
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

const TopBadge = styled.span`
  background: rgba(255,255,255,0.13);
  border: 1px solid rgba(255,255,255,0.22);
  border-radius: 50px;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 5px 14px;
  backdrop-filter: blur(8px);
`;

// ── Tarjeta Gráfica de Pastel ─────────────────────────────────────────────────

const ResultCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: 22px;
  border: 1.5px solid rgba(255,255,255,0.2);
  padding: 18px;
  box-shadow: 0 12px 36px rgba(0,0,0,0.4);
  animation: ${fadeUp} 0.6s ease-out;
  gap: 12px;
  box-sizing: border-box;
`;

const CardHeader = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CardLabel = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.65);
  margin: 0;
`;

const AreaTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: 900;
  margin: 0;
  line-height: 1.2;

  background: linear-gradient(120deg,
    #ffffff 0%, #c7d9ff 40%, #ffffff 60%, #ffd6e0 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 5s linear infinite;
`;

const ChartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 4px;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

const PieChart = styled.div`
  width: 110px;
  height: 110px;
  min-width: 110px;
  border-radius: 50%;
  /* Gráfica de pastel generada con conic-gradient simulando las 4 áreas */
  background: conic-gradient(
    #3b82f6 0deg 110deg,
    #ec4899 110deg 210deg,
    #10b981 210deg 300deg,
    #f59e0b 300deg 360deg
  );
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  position: relative;

  /* Efecto decorativo interno para simular gráfica tipo dona moderna */
  &::after {
    content: '';
    position: absolute;
    top: 22px;
    left: 22px;
    right: 22px;
    bottom: 22px;
    background: rgba(20, 30, 40, 0.85);
    border-radius: 50%;
  }
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.74rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
`;

const ColorDot = styled.span`
  width: 10px;
  height: 10px;
  min-width: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  box-shadow: 0 0 8px ${({ $color }) => $color};
`;

// ── Sección carreras ──────────────────────────────────────────────────────────

const Section = styled.div`
  width: 100%;
  animation: ${fadeUp} 0.7s 0.1s ease-out both;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const SectionIcon = styled.span`
  color: ${({ $color }) => $color};
  font-size: 1rem;
`;

const SectionTitle = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: rgba(255,255,255,0.8);
`;

// ── Fortalezas ────────────────────────────────────────────────────────────────

const StrengthCard = styled.div`
  width: 100%;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 16px;
  padding: 12px 16px;
  backdrop-filter: blur(10px);
  box-sizing: border-box;
  animation: ${fadeUp} 0.7s 0.2s ease-out both;
`;

const StrengthHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.73rem;
  font-weight: 700;
  color: #93c5fd;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-bottom: 5px;
`;

const StrengthText = styled.p`
  font-size: 0.8rem;
  color: rgba(255,255,255,0.8);
  line-height: 1.4;
  margin: 0;
`;

// ── Acciones ──────────────────────────────────────────────────────────────────

const ActionsArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  animation: ${fadeUp} 0.7s 0.3s ease-out both;
`;

const PrimaryButton = styled.button`
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(12px);
  border: 1.5px solid rgba(255,255,255,0.4);
  border-radius: 14px;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  padding: 13px 20px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 18px rgba(0,0,0,0.25);

  &::before {
    content: '';
    position: absolute;
    top: 0; left: -80%;
    width: 50%; height: 100%;
    background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
    transform: skewX(-20deg);
    pointer-events: none;
  }

  &:hover {
    background: rgba(255,255,255,0.26);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.35);
    &::before { animation: ${glint} 0.5s ease forwards; }
  }

  &:active { transform: translateY(0); }
`;

const GhostButton = styled.button`
  width: 100%;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.65);
  font-size: 0.83rem;
  font-weight: 600;
  padding: 6px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

export default Resultado;