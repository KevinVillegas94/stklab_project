import React from 'react';
import { useAuth } from '../auth/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          No hay usuario logueado. Por favor, inicia sesión.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body text-center">
          {/* Avatar (opcional) */}
          <img 
            src={user.avatar || 'https://i.imgur.com/6VBx3io.png'} 
            className="rounded-circle mb-3" 
            width="120"
            alt="Avatar"
          />
          
          <h2 className="card-title">¡Bienvenido, {user.username}!</h2>
          <p className="text-muted">{user.email}</p>
          
          <button 
            className="btn btn-danger mt-3" 
            onClick={logout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;