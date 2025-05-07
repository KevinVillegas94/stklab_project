import React from 'react'; // Import React
// ... rest of your main.jsx code ...
import { AuthProvider } from './auth/AuthContext'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
