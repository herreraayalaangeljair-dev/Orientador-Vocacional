import styled, { keyframes } from 'styled-components';

// ── Animaciones ───────────────────────────────────────────────────────────────

export const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const shimmerAuth = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

export const glint = keyframes`
  0%   { left: -80%; }
  100% { left: 130%; }
`;

export const arrowBounce = keyframes`
  0%, 100% { transform: translateX(0); }
  50%       { transform: translateX(4px); }
`;

// ── Encabezado ────────────────────────────────────────────────────────────────

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 20px;
`;

export const LogoWrapper = styled.div`
  margin-bottom: 10px;
`;

export const Logo = styled.img`
  width: 56px;
  height: 56px;
  object-fit: contain;
  border-radius: 16px;
  background-color: #181c1e;
  padding: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
`;

export const Title = styled.h1`
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
  animation: ${shimmerAuth} 5s linear infinite;
`;

export const Subtitle = styled.p`
  font-size: 0.87rem;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
  max-width: 280px;
  line-height: 1.45;
`;

// ── Formulario ────────────────────────────────────────────────────────────────

export const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 22px 18px;
  border-radius: 20px;
  border: 1.5px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 0.79rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.3px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const InputIcon = styled.span`
  position: absolute;
  left: 14px;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.93rem;
  pointer-events: none;
`;

export const StyledInput = styled.input`
  width: 100%;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  padding: 12px 40px 12px 38px;
  color: #ffffff;
  font-size: 0.91rem;
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

export const PasswordToggle = styled.button`
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
  font-size: 0.93rem;
  transition: color 0.2s;

  &:hover {
    color: #ffffff;
  }
`;

export const SubmitButton = styled.button`
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 5px;

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

export const ButtonArrow = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.9rem;

  ${SubmitButton}:hover & {
    animation: ${arrowBounce} 0.6s ease infinite;
  }
`;

export const FooterText = styled.p`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin: 0;
  padding-top: 8px;
`;
