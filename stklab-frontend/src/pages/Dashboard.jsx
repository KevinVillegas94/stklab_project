import React from 'react';
import { useAuth } from '../auth/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="container mt-5">
      <h2>Bienvenido, {user?.name}</h2>
      <p>Email: {user?.email}</p>
      <button className="btn btn-danger" onClick={logout}>Cerrar sesión</button>
    </div>
  );
}

export default Dashboard;
