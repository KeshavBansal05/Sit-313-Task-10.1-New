import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from '../utils/Firebase'; 
import '../utils/SignUp.css';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    userEmail: '',
    userPassword: '',
    confirmUserPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const navigateTo = useNavigate();

  const { fullName, userEmail, userPassword, confirmUserPassword } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!fullName) validationErrors.fullName = 'Full name is required';
    if (!userEmail) validationErrors.userEmail = 'Email is required';
    if (!userPassword) validationErrors.userPassword = 'Password is required';
    if (userPassword !== confirmUserPassword) validationErrors.confirmUserPassword = 'Passwords do not match';

    return validationErrors;
  };

  const handleUserSignUp = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); 
    setStatusMessage(''); 

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const userCredential = await createAuthUserWithEmailAndPassword(userEmail, userPassword);
      const user = userCredential.user;

      await createUserDocFromAuth(user, { fullName, userEmail });

      setStatusMessage('Successfully signed up! Redirecting to login...');

      
      setTimeout(() => {
        navigateTo('/login');
      }, 3000); 
    } catch (error) {
      setErrors({ firebase: 'Registration failed: ' + error.message });
      setStatusMessage('Sign up failed. Please try again.');
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="signup-wrapper">
      <form className="signup-form" onSubmit={handleUserSignUp}>
        <h2 className="signup-title">Create an Account</h2>

        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={handleInputChange}
            required
            disabled={isSubmitting} 
          />
          {errors.fullName && <p className="error-message">{errors.fullName}</p>}
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="userEmail"
            value={userEmail}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          />
          {errors.userEmail && <p className="error-message">{errors.userEmail}</p>}
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="userPassword"
            value={userPassword}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          />
          {errors.userPassword && <p className="error-message">{errors.userPassword}</p>}
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmUserPassword"
            value={confirmUserPassword}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          />
          {errors.confirmUserPassword && <p className="error-message">{errors.confirmUserPassword}</p>}
        </div>

        {statusMessage && <p className="status-message">{statusMessage}</p>}
        {errors.firebase && <p className="error-message">{errors.firebase}</p>}

        <button className="signup-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>
        <p className="login-redirect" onClick={() => navigateTo('/login')}>
          Already have an account? Log in
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
