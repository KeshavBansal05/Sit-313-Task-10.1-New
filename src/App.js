import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Routes/Login'; 
import SignUp from './Routes/SignUp'; 
import Home from './Routes/Home';
import WelcomePage from './Routes/WelcomePage'; 
function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/WelcomePage" element={<WelcomePage />} /> 
      </Routes>
   
  );
}

export default App;
