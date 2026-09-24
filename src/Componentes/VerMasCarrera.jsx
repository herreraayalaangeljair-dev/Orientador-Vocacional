import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";

const VerMasCarrera = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const carreraGuardada = location.state?.carrera;
    const nombreCarrera = carreraGuardada?.nombre;

    const tabsDisponibles = {
        esParaMi: {
            title: "¿Es para mi?",
            content: (
                <div>
                    <p>{carreraGuardada?.esParaMi}</p>
                </div>
            )

        }
    };

    const tabsEntrys = Object.entries(tabsDisponibles);

    const [tabActivo, setTabActivo] = useState(tabsEntrys[0]?.[0]);


    return (
        <Container>
            {/* Boton ver universidades */}
            <VerUniversidades>
                <VerUniversidadesBTN type="button" onClick={() => navigate('/universidades', { state: { carrera: nombreCarrera } })}>
                    Ver universidades
                </VerUniversidadesBTN>
            </VerUniversidades>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background: #120e24;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    padding: 16px;
    box-sizing: border-box;
    font-family: var(--font-body, 'Inter', sans-serif);
`;

const VerUniversidades = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
`;
const VerUniversidadesBTN = styled.button`
    background-color: #2563eb;
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.15s ease;
    &:hover {
        background-color: #1d4ed8;
        transform: translateY(-2px);
    }
    &:active {
        transform: translateY(0);
    }
`;


export default VerMasCarrera;