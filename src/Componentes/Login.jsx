import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faEnvelope, 
  faLock, 
  faEye, 
  faEyeSlash, 
  faArrowRight 
} from '@fortawesome/free-solid-svg-icons';
import logo from '../Imagenes/logo.png';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la autenticación
    console.log('Login attempt:', { email, password });
  };

  return (
    <LoginContainer>
      {/* Botón superior para regresar */}
      <TopBar>
        <BackButton onClick={() => navigate('/')} type="button" aria-label="Volver">
          <FontAwesomeIcon icon={faArrowLeft} />
        </BackButton>
      </TopBar>

      {/* Header con mini logo y títulos */}
      <HeaderSection>
        <LogoWrapper>
          <Logo src={logo} alt="Logo" />
        </LogoWrapper>
        <Title>Iniciar Sesión</Title>
        <Subtitle>Ingresa a tu cuenta para continuar con tu orientación vocacional</Subtitle>
      </HeaderSection>

      {/* Formulario */}
      <StyledForm onSubmit={handleSubmit}>
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
              placeholder="••••••••••••"
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

        <ForgotLink href="#forgot" onClick={(e) => e.preventDefault()}>
          ¿Olvidaste tu contraseña?
        </ForgotLink>

        <SubmitButton type="submit">
          <span>Entrar</span>
          <ButtonArrow>
            <FontAwesomeIcon icon={faArrowRight} />
          </ButtonArrow>
        </SubmitButton>
      </StyledForm>

      {/* Pie con enlace a Registro */}
      <FooterText>
        ¿No tienes una cuenta?{' '}
        <RegisterLink onClick={() => navigate('/registro')}>
          Regístrate aquí
        </RegisterLink>
      </FooterText>
    </LoginContainer>
  );
};

// ── Animaciones ──────────────────────────────────────────────────────────────
const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
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

const LoginContainer = styled.div`
  position: relative;
  z-index: 2; /* Crucial para estar sobre el .bg-overlay */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 28px 36px;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  animation: ${fadeSlideUp} 0.6s ease-out;
  box-sizing: border-box;
`;

const TopBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 8px;
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

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 24px;
`;

const LogoWrapper = styled.div`
  margin-bottom: 12px;
`;

const Logo = styled.img`
  width: 58px;
  height: 58px;
  object-fit: contain;
  border-radius: 16px;
  background-color: #181c1e;
  padding: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
`;

const Title = styled.h1`
  font-size: 1.85rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 6px 0;
  line-height: 1.2;

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
  animation: ${shimmer} 5s linear infinite;
`;

const Subtitle = styled.p`
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
  max-width: 280px;
  line-height: 1.45;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 22px 18px;
  border-radius: 20px;
  border: 1.5px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.3px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const InputIcon = styled.span`
  position: absolute;
  left: 14px;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.95rem;
  pointer-events: none;
`;

const StyledInput = styled.input`
  width: 100%;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  padding: 12px 40px 12px 38px;
  color: #ffffff;
  font-size: 0.92rem;
  outline: none;
  transition: all 0.25s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.35);
  }

  &:focus {
    background: rgba(0, 0, 0, 0.35);
    border-color: rgba(255, 255, 255, 0.55);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.12);
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.55);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  transition: color 0.2s;

  &:hover {
    color: #ffffff;
  }
`;

const ForgotLink = styled.a`
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.65);
  text-align: right;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #ffffff;
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 6px;

  /* Glassmorphism */
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  border-radius: 14px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  padding: 13px 20px;
  cursor: pointer;
  letter-spacing: 0.3px;
  transition: all 0.25s ease;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);

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
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
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
  font-size: 0.9rem;

  ${SubmitButton}:hover & {
    animation: ${arrowBounce} 0.6s ease infinite;
  }
`;

const FooterText = styled.p`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin: 0;
  padding-top: 10px;
`;

const RegisterLink = styled.span`
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }
`;

export default Login;