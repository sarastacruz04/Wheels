import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../assets/Colors.jsx';
import TripCard from "../trips/TripCard.jsx";
import { useDriver } from "../../contexts/DriverContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCar } from '@fortawesome/free-solid-svg-icons';
// Asume que los estilos comunes (Title, Text, etc.) están disponibles

// --- Estilos de la Página ---
const HomeContainer = styled.div`
    padding: 20px 40px;
    background-color: #f0f4f7; /* Un fondo gris claro para el contenido */
    min-height: 100vh;
    flex-grow: 1; /* Para que ocupe el espacio restante junto al Header lateral si existe */

    @media (max-width: 768px) {
        padding: 20px;
        padding-bottom: 80px; /* Espacio para la barra de navegación inferior */
    }
`;

const Greeting = styled.h2`
    color: ${colors.text};
    font-weight: 600;
    margin-bottom: 20px;
    padding-top: 20px;
`;

const SearchBarContainer = styled.div`
    background-color: #dbe4eb; /* Fondo gris/azul claro para la barra de búsqueda */
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 30px;
    display: flex;
    gap: 15px;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

const Selector = styled.select`
    padding: 10px 15px;
    border: 1px solid ${colors.details};
    border-radius: 8px;
    background-color: ${colors.white};
    color: ${colors.text};
    flex-grow: 1;
`;

const SearchInput = styled.input`
    padding: 10px 15px;
    border: 1px solid ${colors.details};
    border-radius: 8px;
    flex-grow: 2; /* Más ancho que los selectores */
`;

const ActionButton = styled.button`
    background-color: ${colors.primary}; /* O el color que uses para botones principales */
    color: ${colors.white};
    border: none;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    transition: background-color 0.3s;

    &:hover {
        background-color: #4a5d72; /* Un tono un poco más oscuro */
    }
`;

const TripCardGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 3%; /* Espacio entre las tarjetas */
    justify-content: flex-start; /* Alinea al inicio */
`;

// --- Datos Ficticios (Reemplazar con tu API) ---

const mockTrips = [
    { id: 1, sector: "Colina", conductor: "Miguel Ordoñez", desde: "Calle 153", para: "Universidad", horaSalida: "7:30 AM", valor: "$10.000", cupos: 3 },
    { id: 2, sector: "Calle 116", conductor: "Sandra Torres", desde: "Carrera 15", para: "Universidad", horaSalida: "6:45 AM", valor: "$8.000", cupos: 2 },
    { id: 3, sector: "Samaria Chía", conductor: "Nicolás Cruz", desde: "Chía Centro", para: "Universidad", horaSalida: "6:00 AM", valor: "$15.000", cupos: 1 },
    { id: 4, sector: "Huertas Cajicá", conductor: "Sara Mora", desde: "Cajicá", para: "Universidad", horaSalida: "6:15 AM", valor: "$18.000", cupos: 4 },
    // Más datos para simular un scroll
    { id: 5, sector: "Cedritos", conductor: "Luisa Fernández", desde: "Calle 140", para: "Universidad", horaSalida: "7:10 AM", valor: "$9.000", cupos: 3 },
    { id: 6, sector: "Rosales", conductor: "Andrés Gutiérrez", desde: "Calle 72", para: "Universidad", horaSalida: "7:00 AM", valor: "$12.000", cupos: 2 },
];


function Home() {
    const { isDriver } = useDriver(); // Para mostrar contenido diferente si es necesario
    const [userName, setUserName] = useState("Susana"); // Estado ficticio del nombre

    // Lógica para manejar la reserva (simulación)
    const handleReserve = (tripId) => {
        console.log(`Intentando reservar viaje con ID: ${tripId}`);
        alert(`Has intentado reservar un puesto en el viaje #${tripId}.`);
        // **AQUÍ IRÍA LA LLAMADA A TU API PARA RESERVAR**
    };

    // Lógica para obtener el nombre del usuario (idealmente desde Redux o API)
    useEffect(() => {
        // Ejemplo de obtener datos del usuario logueado
        // **REEMPLAZAR con la lógica de fetchProfileData de Header2.jsx**
        // setUserName(data.name); 
    }, []); 

    return (
        <HomeContainer>
            {/* El saludo de tu diseño */}
            <Greeting>¡Buen viaje {userName}!</Greeting> 

            {/* --- Barra de Búsqueda y Filtros --- */}
            <SearchBarContainer>
                {/* Selector de Sectores */}
                <Selector>
                    <option value="">Sectores</option>
                    <option value="Colina">Colina</option>
                    <option value="Calle 116">Calle 116</option>
                    <option value="Chia">Samaria Chía</option>
                </Selector>

                {/* Input de cantidad de puestos */}
                <SearchInput 
                    type="number" 
                    placeholder="Cantidad de puestos disponibles" 
                    min="1" 
                />

                {/* Botón de Búsqueda (Puedes añadir un icono de lupa aquí) */}
                <ActionButton style={{ alignSelf: 'initial', margin: 0, padding: '10px 15px', borderRadius: '8px' }}>
                    <FontAwesomeIcon icon={faCar} /> 
                    {/* Botón funcional de búsqueda. Ajusta el estilo si lo necesitas más ancho. */}
                </ActionButton>
            </SearchBarContainer>

            {/* --- Grid de Tarjetas de Viaje --- */}
            <TripCardGrid>
                {mockTrips.map(trip => (
                    <TripCard 
                        key={trip.id}
                        sector={trip.sector}
                        conductor={trip.conductor}
                        desde={trip.desde}
                        para={trip.para}
                        horaSalida={trip.horaSalida}
                        valor={trip.valor}
                        cupos={trip.cupos}
                        onReserve={() => handleReserve(trip.id)}
                    />
                ))}
            </TripCardGrid>
            
            {/* Si estás en modo conductor, aquí mostrarías un contenido diferente, por ejemplo: */}
            {isDriver && <p style={{color: colors.details, textAlign: 'center', marginTop: '30px'}}>Estás en modo Conductor. Tus viajes creados están en "Viajes Creados".</p>}

        </HomeContainer>
    );
}

export default Home;