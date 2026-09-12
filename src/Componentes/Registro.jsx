import React, { useState } from 'react';
import styled from 'styled-components';
import {
  HeaderSection,
  LogoWrapper,
  Logo,
  Title,
  Subtitle,
  StyledForm,
  InputGroup,
  Label,
  InputWrapper,
  InputIcon,
  StyledInput,
  PasswordToggle,
  SubmitButton,
  ButtonArrow,
  FooterText,
  fadeSlideUp,
} from '../Elementos/EstilosAuth';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import logo from '../Imagenes/logo.png';

const Registro = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registro attempt:', { nombre, email, password });
  };

  return (
    <RegisterContainer>
      {/* Barra superior con botón para regresar */}
      <TopBar>
        <BackButton onClick={() => navigate('/login')} type="button" aria-label="Volver">
          <FontAwesomeIcon icon={faArrowLeft} />
        </BackButton>
      </TopBar>

      {/* Encabezado */}
      <HeaderSection>
        <LogoWrapper>
          <Logo src={logo} alt="Logo" />
        </LogoWrapper>
        <Title>Crear Cuenta</Title>
        <Subtitle>Comienza tu viaje hacia tu futuro profesional hoy mismo</Subtitle>
      </HeaderSection>

      {/* Formulario */}
      <StyledForm onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="nombre">Nombre completo</Label>
          <InputWrapper>
            <InputIcon>
              <FontAwesomeIcon icon={faUser} />
            </InputIcon>
            <StyledInput
              type="text"
              id="nombre"
              placeholder="Ej. Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </InputWrapper>
        </InputGroup>

        <InputGroup>
          <Label htmlFor="email">Correo electrónico</Label>
          <InputWrapper>
            <InputIcon>
              <FontAwesomeIcon icon={faEnvelope} />
            </InputIcon>
            <StyledInput
              type="email"
              id="email"
              placeholder="tu.correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputWrapper>
        </InputGroup>

        <InputGroup>
          <Label htmlFor="password">Contraseña</Label>
          <InputWrapper>
            <InputIcon>
              <FontAwesomeIcon icon={faLock} />
            </InputIcon>
            <StyledInput
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </PasswordToggle>
          </InputWrapper>
        </InputGroup>

        <SubmitButton type="submit">
          <span>Registrarse</span>
          <ButtonArrow>
            <FontAwesomeIcon icon={faArrowRight} />
          </ButtonArrow>
        </SubmitButton>
      </StyledForm>

      {/* Pie con enlace a Login */}
      <FooterText>
        ¿Ya tienes una cuenta?{' '}
        <LoginLink onClick={() => navigate('/login')}>
          Inicia sesión
        </LoginLink>
      </FooterText>
    </RegisterContainer>
  );
};

// ── Styled Components locales (únicos de Registro) ────────────────────────────

const RegisterContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 28px 30px;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  animation: ${fadeSlideUp} 0.6s ease-out;
  box-sizing: border-box;
`;

const TopBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 4px;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  font-size: 1rem;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.22);
    transform: translateX(-2px);
  }
`;

const LoginLink = styled.span`
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }
`;

export default Registro;
