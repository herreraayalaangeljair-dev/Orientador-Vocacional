import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faArrowRight,
    faCheckCircle,
    faLaptopCode,
    faPalette,
    faBriefcase,
    faStethoscope
} from '@fortawesome/free-solid-svg-icons';

const opcionesData = [
    {
        id: 'tecnologia',
        label: 'Programar o explorar nuevas tecnologías',
        badge: 'Tecnología',
        icon: faLaptopCode,
        valor: 'Tecnología e Innovación Digital'
    },
    {
        id: 'creatividad',
        label: 'Dibujar, diseñar, crear o escribir historias',
        badge: 'Arte & Diseño',
        icon: faPalette,
        valor: 'Creatividad, Arte y Diseño'
    },
    {
        id: 'liderazgo',
        label: 'Organizar eventos, emprender o liderar proyectos',
        badge: 'Negocios',
        icon: faBriefcase,
        valor: 'Negocios y Liderazgo Empresarial'
    },
    {
        id: 'ciencias',
        label: 'Aprender sobre salud, cuerpo humano o ciencias',
        badge: 'Salud',
        icon: faStethoscope,
        valor: 'Ciencias de la Salud y Cuidado'
    }
];

const Preguntas = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(opcionesData[0].valor);

    const handleFinalizar = () => {
        // Navega a la pantalla de resultados llevando la opción elegida
        navigate('/resultado', { state: { resultado: selectedOption } });
    };

    return (
        <QuestionsContainer>
            {/* Barra superior con navegación y progreso */}
            <TopBar>
                <BackButton onClick={() => navigate('/')} type="button" aria-label="Volver">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </BackButton>
                <ProgressArea>
                    <ProgressText>
                        <span>Paso 1 de 1</span>
                        <strong>100%</strong>
                    </ProgressText>
                    <ProgressBarTrack>
                        <ProgressBarFill />
                    </ProgressBarTrack>
                </ProgressArea>
            </TopBar>

            {/* Contenido de la pregunta */}
            <ContentArea>
                <QuestionBadge>Pregunta Vocacional</QuestionBadge>
                <QuestionTitle>
                    Responde todas las preguntas.
                </QuestionTitle>
                <InstructionText>
                    Selecciona la alternativa que más resuene con tus intereses personales:
                </InstructionText>

                {/* Selector estilizado (Select tradicional con Glassmorphism) */}
                <SelectWrapper>
                    <StyledSelect
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        {opcionesData.map((op) => (
                            <option key={op.id} value={op.valor}>
                                {op.label}
                            </option>
                        ))}
                    </StyledSelect>
                </SelectWrapper>

                {/* Tarjetas interactivas táctiles para seleccionar */}
                <OptionsGrid>
                    {opcionesData.map((op) => {
                        const isSelected = selectedOption === op.valor;
                        return (
                            <OptionCard
                                key={op.id}
                                $active={isSelected}
                                onClick={() => setSelectedOption(op.valor)}
                                type="button"
                            >
                                <OptionIconWrapper $active={isSelected}>
                                    <FontAwesomeIcon icon={op.icon} />
                                </OptionIconWrapper>
                                <OptionInfo>
                                    <OptionBadge $active={isSelected}>{op.badge}</OptionBadge>
                                    <OptionLabel>{op.label}</OptionLabel>
                                </OptionInfo>
                                {isSelected && (
                                    <CheckIcon>
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                    </CheckIcon>
                                )}
                            </OptionCard>
                        );
                    })}
                </OptionsGrid>
            </ContentArea>

            {/* Botón anclado abajo */}
            <BottomArea>
                <FinishButton onClick={handleFinalizar} type="button">
                    <span>Finalizar y ver resultado</span>
                    <ButtonArrow>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </ButtonArrow>
                </FinishButton>
            </BottomArea>
        </QuestionsContainer>
    );
};

// ── Animaciones ──────────────────────────────────────────────────────────────
const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const progressGrow = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

const glint = keyframes`
  0%   { left: -80%; }
  100% { left: 130%; }
`;

const arrowBounce = keyframes`
  0%, 100% { transform: translateX(0); }
  50%       { transform: translateX(4px); }
`;

// ── Styled Components ────────────────────────────────────────────────────────

const QuestionsContainer = styled.div`
  position: relative;
  z-index: 2; /* Para estar sobre el .bg-overlay */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 24px 28px;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  animation: ${fadeSlideUp} 0.6s ease-out;
  box-sizing: border-box;
  overflow-y: auto;

  /* Scrollbar estético */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`;

const TopBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 14px;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  font-size: 0.95rem;
  transition: all 0.25s ease;
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.22);
    transform: translateX(-2px);
  }
`;

const ProgressArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.76rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  letter-spacing: 0.4px;
`;

const ProgressBarTrack = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #60a5fa, #a78bfa);
  border-radius: 10px;
  animation: ${progressGrow} 0.8s ease-out forwards;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const QuestionBadge = styled.span`
  display: inline-block;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(8px);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 5px 14px;
  border-radius: 50px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.25);
`;

const QuestionTitle = styled.h1`
  font-size: 1.35rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.3;
  margin: 0;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.45);
`;

const InstructionText = styled.p`
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.72);
  margin: 0 0 6px 0;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 4px;

  /* Flecha personalizada para el select */
  &::after {
    content: '▼';
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.7);
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  border-radius: 14px;
  padding: 12px 38px 12px 16px;
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  transition: all 0.25s ease;

  option {
    background: #181c1e;
    color: #ffffff;
    padding: 10px;
  }

  &:focus {
    border-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.15);
  }
`;

const OptionsGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
`;

const OptionCard = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 16px;
  cursor: pointer;
  text-align: left;
  transition: all 0.25s ease;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  /* Estilos según si está seleccionado */
  background: ${({ $active }) =>
        $active ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.08)'};
  border: 1.5px solid
    ${({ $active }) =>
        $active ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 255, 255, 0.18)'};
  box-shadow: ${({ $active }) =>
        $active
            ? '0 6px 20px rgba(96, 165, 250, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.4) inset'
            : '0 4px 12px rgba(0, 0, 0, 0.2)'};

  transform: ${({ $active }) => ($active ? 'scale(1.02)' : 'scale(1)')};

  &:hover {
    background: rgba(255, 255, 255, 0.18);
    border-color: rgba(255, 255, 255, 0.45);
    transform: translateY(-2px);
  }
`;

const OptionIconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  background: ${({ $active }) =>
        $active ? 'linear-gradient(135deg, #60a5fa, #a78bfa)' : 'rgba(255, 255, 255, 0.12)'};
  color: #ffffff;
  flex-shrink: 0;
  transition: all 0.25s ease;
`;

const OptionInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const OptionBadge = styled.span`
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ $active }) => ($active ? '#93c5fd' : 'rgba(255, 255, 255, 0.6)')};
`;

const OptionLabel = styled.span`
  font-size: 0.84rem;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.25;
`;

const CheckIcon = styled.span`
  color: #60a5fa;
  font-size: 1.1rem;
  animation: ${fadeSlideUp} 0.25s ease-out;
`;

const BottomArea = styled.div`
  width: 100%;
  padding-top: 6px;
`;

const FinishButton = styled.button`
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  /* Glassmorphism */
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  border-radius: 16px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  padding: 15px 20px;
  cursor: pointer;
  letter-spacing: 0.3px;
  transition: all 0.25s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);

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
    background: rgba(255, 255, 255, 0.26);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.38);
    transform: translateY(-2px);

    &::before {
      animation: ${glint} 0.55s ease forwards;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonArrow = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.95rem;

  ${FinishButton}:hover & {
    animation: ${arrowBounce} 0.6s ease infinite;
  }
`;

export default Preguntas;