import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const UserLogoutComponent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        localStorage.removeItem('token');
        navigate('/');
      }
    }
    catch (error) {
      console.error('Error logging out:', error);
    }
  }, []);

  return (
    <div>
      Logging out...
    </div>
  );
}

export default UserLogoutComponent


//inspect->application->localStorage