import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import "../utils/WelcomePage.css"

const WelcomePage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email); 
      } else {
        navigate('/'); 
      }
    });

    return () => unsubscribe(); 
  }, [navigate]);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate('/'); 
      })
      .catch((error) => {
        console.log('Error logging out:', error);
      });
  };

  return (
    <div className="Profile">
      <h1>Welcome, {userEmail}</h1>
      <button className="logout-btn" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default WelcomePage;
