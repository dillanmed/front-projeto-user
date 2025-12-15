import { Navigate } from "react-router-dom";
import React from 'react'; // Importar React, embora não seja estritamente necessário em novas versões, é uma boa prática.

/**
 * Interface para as propriedades do componente PrivateRoute.
 * Children é o elemento React que será renderizado se a condição for satisfeita.
 */
interface PrivateRouteProps {
  children: React.ReactElement; // Usar React.ReactElement é mais preciso para tipar o elemento filho JSX.
}

/**
 * Componente que verifica a existência de um token de autenticação
 * e decide se renderiza o componente filho ou redireciona para a página de login.
 *
 * @param {PrivateRouteProps} props - O elemento filho (rota protegida).
 * @returns {React.ReactElement} O componente filho ou um elemento Navigate para /login.
 */
export default function PrivateRoute({ children }: PrivateRouteProps): React.ReactElement {
  
  const token = localStorage.getItem("token");

  
  if (!token) {
    
    return <Navigate to="/login" replace />; 
    
  }

  return children;
}