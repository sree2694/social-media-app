import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-3 flex justify-between">
      <div>
        <Link className="mr-4 font-bold" to="/">SocialApp</Link>
        {token && <Link className="mr-4" to="/chat">Chat</Link>}
        {token && <Link className="mr-4" to="/profile/me">Profile</Link>}
      </div>
      <div>
        {token ? (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        ) : (
          <>
            <Link className="mr-2" to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
