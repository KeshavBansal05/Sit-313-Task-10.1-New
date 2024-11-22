import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup, createUserDocFromAuth } from '../utils/Firebase'; 
import '../utils/Login.css';

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigateTo = useNavigate();

  const handleUserLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInAuthUserWithEmailAndPassword(userEmail, userPassword);
      const user = userCredential.user;


      navigateTo('/WelcomePage', { state: { email: user.email } });
    } catch (error) {
      setError('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocFromAuth(user); 


      navigateTo('/WelcomePage', { state: { email: user.email } });
    } catch (error) {
      setError('Google sign-in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleUserLogin}>
        <h2 className="login-title">Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="signup-redirect">
          <span onClick={() => navigateTo('/signup')}>Sign Up</span>
        </div>
        <div className="divider">or</div>
        <button
          className="google-signin-btn"
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? 'Signing in with Google...' : 'Sign in with Google'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
