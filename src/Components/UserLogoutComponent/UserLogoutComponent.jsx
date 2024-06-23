import React, { useEffect } from 'react'

const UserLogoutComponent = () => {

  useEffect(() => {
    try {
      const token = window.localStorage.getItem('token')
      if (token) {
        window.localStorage.removeItem('token');
        window.location.href = '/'
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