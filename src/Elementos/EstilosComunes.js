import styled, { keyframes } from 'styled-components';

// ── Animaciones ───────────────────────────────────────────────────────────────

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const shimmerAnim = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

export const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0px 0px rgba(96,165,250,0.0); }
  50%       { box-shadow: 0 0 10px 3px rgba(96,165,250,0.35); }
`;

// ── Layout ────────────────────────────────────────────────────────────────────

export const Container = styled.div`
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

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  animation: ${fadeUp} 0.5s ease-out;
`;

export const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
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
    background: rgba(255, 255, 255, 0.22);
    transform: translateX(-2px);
  }
`;

export const TopTitle = styled.h1`
  flex: 1;
  font-size: 1rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CountBadge = styled.span`
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

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  animation: ${fadeUp} 0.5s 0.05s ease-out both;
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  pointer-events: none;
`;

export const SearchInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  padding: 10px 14px 10px 36px;
  color: #fff;
  font-size: 0.88rem;
  outline: none;
  box-sizing: border-box;
  transition: all 0.25s ease;

  &::placeholder { color: rgba(255, 255, 255, 0.4); }

  &:focus {
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }
`;

// ── Filtros ───────────────────────────────────────────────────────────────────

export const FiltersRow = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
  overflow-x: auto;
  padding-bottom: 2px;
  animation: ${fadeUp} 0.5s 0.1s ease-out both;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

export const FilterChip = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 0.73rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  background: ${({ $active }) =>
    $active ? 'rgba(255, 255, 255, 0.28)' : 'rgba(255, 255, 255, 0.08)'};
  border: 1px solid
    ${({ $active }) =>
    $active ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.16)'};
  color: ${({ $active }) => ($active ? '#fff' : 'rgba(255, 255, 255, 0.7)')};
  box-shadow: ${({ $active }) =>
    $active ? '0 2px 12px rgba(255, 255, 255, 0.15)' : 'none'};

  &:hover { background: rgba(255, 255, 255, 0.2); color: #fff; }
`;

// ── Estado vacío ──────────────────────────────────────────────────────────────

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 40px 20px;

  svg { font-size: 2.5rem; opacity: 0.6; }
  p {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.65);
    text-align: center;
    margin: 0;
  }
`;
