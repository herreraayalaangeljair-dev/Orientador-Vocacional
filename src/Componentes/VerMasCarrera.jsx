import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUniversity, faBook, faBriefcase, faUserTie, faRobot } from "@fortawesome/free-solid-svg-icons";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

const VerMasCarrera = ({ carrera, areaInfo, isOpen, onClose, onVerUniversidades }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Bloquea el scroll del fondo mientras el panel esté abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Permite recibir la carrera ya sea por props (modal) o por ubicación de la navegación (página)
    const carreraActual = carrera || location.state?.carrera;
    const nombreCarrera = carreraActual?.nombre || "Detalles de la carrera";
    const areaColor = areaInfo?.color || carreraActual?.color || '#2563eb';

    // Pestañas dinámicas basadas en los datos de la carrera
    const tabsDisponibles = carreraActual?.tabs || {
        estudio: {
            title: "¿Qué es?",
            icon: <FontAwesomeIcon icon={faBook} />,
            content: (
                <>
                    <Section>
                        <SectionTitle $color={areaColor}>
                            <FontAwesomeIcon icon={faBook} /> ¿Qué es y qué estudia?
                        </SectionTitle>
                        <SectionBody>{carreraActual?.estudio || "Información no disponible."}</SectionBody>
                    </Section>
                    {carreraActual?.ramas && (
                        <Section>
                            <SectionTitle $color={areaColor}>Áreas de especialización</SectionTitle>
                            <SectionBody>{carreraActual.ramas}</SectionBody>
                        </Section>
                    )}
                </>
            )
        },
        campo: {
            title: "Trabajo",
            icon: <FontAwesomeIcon icon={faBriefcase} />,
            content: (
                <>
                    {carreraActual?.trabajo && (
                        <Section>
                            <SectionTitle $color={areaColor}>
                                <FontAwesomeIcon icon={faBriefcase} /> ¿Dónde podrás trabajar?
                            </SectionTitle>
                            <SectionBody>{carreraActual.trabajo}</SectionBody>
                        </Section>
                    )}
                    {carreraActual?.puestos?.length > 0 && (
                        <Section>
                            <SectionTitle $color={areaColor}>Puestos más comunes</SectionTitle>
                            <PuestosList>
                                {carreraActual.puestos.map((puesto, index) => (
                                    <PuestosItem key={index}>{puesto}</PuestosItem>
                                ))}
                            </PuestosList>
                        </Section>
                    )}
                    {carreraActual?.trabajoExtranjero && (
                        <Section>
                            <SectionTitle $color={areaColor}>¿Hay trabajo en el extranjero?</SectionTitle>
                            <SectionBody>{carreraActual.trabajoExtranjero}</SectionBody>
                        </Section>
                    )}
                </>
            )
        },
        vidaProfesional: {
            title: "Vida",
            icon: <FontAwesomeIcon icon={faUserTie} />,
            content: (
                <Section>
                    <SectionTitle $color={areaColor}>
                        <FontAwesomeIcon icon={faUserTie} /> ¿Cómo es el día a día?
                    </SectionTitle>
                    <SectionBody>{carreraActual?.vidaProfesional || "Información no disponible."}</SectionBody>
                </Section>
            )
        },
        demanda: {
            title: "Futuro",
            icon: <FontAwesomeIcon icon={faRobot} />,
            content: (
                <>
                    {carreraActual?.demanda && (
                        <Section>
                            <SectionTitle $color={areaColor}>
                                <FontAwesomeIcon icon={faRobot} /> Demanda laboral
                            </SectionTitle>
                            <SectionBody>{carreraActual.demanda}</SectionBody>
                        </Section>
                    )}
                    {carreraActual?.afectadaPorIA && (
                        <Section>
                            <SectionTitle $color={areaColor}>¿La IA afecta esta carrera?</SectionTitle>
                            <SectionBody>{carreraActual.afectadaPorIA}</SectionBody>
                        </Section>
                    )}
                </>
            )
        }
    };

    const tabsEntrys = Object.entries(tabsDisponibles);
    const [tabActivo, setTabActivo] = useState(tabsEntrys[0]?.[0] || 'esParaMi');

    // Determina si está visible (por defecto true si se abre directamente)
    const isVisible = isOpen !== undefined ? isOpen : true;

    if (!carreraActual && !isOpen) return null;

    const handleNavegarUniversidades = () => {
        if (onVerUniversidades) {
            onVerUniversidades(nombreCarrera);
        } else {
            navigate('/universidades', { state: { carrera: nombreCarrera } });
        }
    };

    return (
        <>
            {/* Fondo oscuro al abrir como modal */}
            {onClose && <Backdrop $visible={isVisible} onClick={onClose} />}

            <Container $open={isVisible}>
                {/* Tirador visual superior */}
                <SheetHandle />

                {/* Cabecera con título y botón de cerrar */}
                <SheetHeader>
                    <div>
                        <AreaLabel $color={areaColor}>{areaInfo?.label || carreraActual?.areaId || "Carrera"}</AreaLabel>
                        <SheetTitle>{nombreCarrera}</SheetTitle>
                    </div>
                    {onClose && (
                        <CloseBtn onClick={onClose} type="button" aria-label="Cerrar">
                            <FontAwesomeIcon icon={faTimes} />
                        </CloseBtn>
                    )}
                </SheetHeader>

                {/* Pestañas de navegación */}
                <TabsRow>
                    {tabsEntrys.map(([key, tab]) => (
                        <TabButton
                            key={key}
                            type="button"
                            $active={tabActivo === key}
                            $color={areaColor}
                            onClick={() => setTabActivo(key)}
                        >
                            {tab?.icon && <span>{tab.icon}</span>} {tab?.title || tab?.label}
                        </TabButton>
                    ))}
                </TabsRow>

                {/* Panel de contenido de la pestaña activa */}
                <ContentPanel>
                    {tabsEntrys.map(([key, tab]) => (
                        tabActivo === key && (
                            <TabContent key={key}>
                                {tab?.content}
                            </TabContent>
                        )
                    ))}
                </ContentPanel>

                {/* Botón de acción para ver universidades */}
                <VerUniversidades>
                    <VerUniversidadesBTN type="button" $color={areaColor} onClick={handleNavegarUniversidades}>
                        <FontAwesomeIcon icon={faUniversity} /> Ver universidades donde se imparte
                    </VerUniversidadesBTN>
                </VerUniversidades>
            </Container>
        </>
    );
};

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 12, 24, 0.6);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition: opacity 0.25s ease;
  z-index: 40;
`;

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 480px; /* Tamaño idóneo para móviles/tarjetas */
  margin: 0 auto;
  max-height: 85vh; /* Ocupa hasta el 85% para dejar ver el fondo arriba */
  background: #1c1830;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.5);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  box-sizing: border-box;
  font-family: var(--font-body, 'Inter', sans-serif);
  z-index: 50;

  /* Animación de Deslizamiento */
  transform: translateY(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform 0.32s cubic-bezier(0.32, 0.72, 0, 1);
`;

const SheetHandle = styled.div`
  width: 40px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  margin: 0 auto 12px;
`;

const SheetHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const AreaLabel = styled.div`
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  margin-bottom: 2px;
  color: ${({ $color }) => $color || '#60a5fa'};
  text-transform: uppercase;
`;

const SheetTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  line-height: 1.25;
`;

const CloseBtn = styled.button`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }
`;


const TabsRow = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    overflow-x: auto;
    padding-bottom: 4px;
    &::-webkit-scrollbar { display: none; }
`;
const TabButton = styled.button`
    border: 1px solid ${({ $active, $color }) => ($active ? $color : 'rgba(255, 255, 255, 0.15)')};
    background: ${({ $active, $color }) => ($active ? $color : 'rgba(255, 255, 255, 0.05)')};
    color: ${({ $active }) => ($active ? '#ffffff' : 'rgba(255, 255, 255, 0.7)')};
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s ease;
`;
/* Panel con scroll propio (Fitts + Nielsen #8 - dejar respirar el contenido) */
const ContentPanel = styled.div`
    flex: 1;
    overflow-y: auto;
    margin-bottom: 14px;
    padding-right: 2px;
    &::-webkit-scrollbar { width: 3px; }
    &::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }
`;

/* Contenedor de cada pestaña con animación de entrada */
const TabContent = styled.div`
    animation: ${fadeIn} 0.22s ease;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

/* Bloque de sección individual (una pregunta + su respuesta) */
const Section = styled.div`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 14px;
    padding: 14px 16px;
`;

/* Etiqueta de pregunta (Nielsen #4 Consistencia, Tognazzini Legibilidad) */
const SectionTitle = styled.h4`
    font-size: 0.7rem;
    font-weight: 700;
    color: ${({ $color }) => $color || 'rgba(255, 255, 255, 0.45)'};
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin: 0 0 6px 0;
    display: flex;
    align-items: center;
    gap: 6px;
`;

/* Respuesta de texto (Nielsen #6 Reconocimiento, mínimo 16px línea) */
const SectionBody = styled.p`
    font-size: 0.9rem;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.88);
    margin: 0;
    white-space: pre-line;
`;

/* Lista de puestos de trabajo (Tognazzini: objetos manipulables y escaneables) */
const PuestosList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
`;

/* Chip individual de puesto */
const PuestosItem = styled.li`
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 50px;
    padding: 5px 12px;
    font-size: 0.78rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
    white-space: nowrap;
`;
/* Footer del panel */
const VerUniversidades = styled.div`
    flex-shrink: 0;
    width: 100%;
    padding-top: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.09);
`;

/* Botón de acción principal (Fitts: 100% ancho, min 44px, sólido) */
const VerUniversidadesBTN = styled.button`
    width: 100%;
    min-height: 48px;
    background-color: ${({ $color }) => $color || '#2563eb'};
    color: #ffffff;
    padding: 13px 20px;
    border: none;
    border-radius: 14px;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: opacity 0.2s ease, transform 0.15s ease;
    &:hover {
        opacity: 0.88;
        transform: translateY(-2px);
    }
    &:active {
        opacity: 1;
        transform: translateY(0);
    }
    &:focus-visible {
        outline: 2px solid #ffffff;
        outline-offset: 3px;
    }
`;


export default VerMasCarrera;