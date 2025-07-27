import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // remove JWT token
    alert('Logged out!');
    navigate('/login'); // redirect to login page
  };

  return (
    <nav style={{
      background: '#333', color: 'white', padding: '10px', display: 'flex', justifyContent: 'space-between'
    }}>
      <span>🍬 Sweet Shop</span>
      <button onClick={handleLogout} style={{ padding: '5px 10px', cursor: 'pointer' }}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
