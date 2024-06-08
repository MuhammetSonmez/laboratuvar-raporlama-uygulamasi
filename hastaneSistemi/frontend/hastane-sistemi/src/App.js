import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RaporlarPage from './pages/RaporlarPage';
import LaborantsPage from './pages/LaborantsPage';
import LoginRegisterPage  from './pages/LoginRegisterPage';
import LogoutComponent from './components/userComponents/LogoutButtonComponent';


const linkStyle = {
  color: 'white',
  backgroundColor: '#007bff',
  padding: '10px 15px',
  borderRadius: '5px',
  textDecoration: 'none',
  margin: '0 10px'
};


const navStyle = {
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#f8f9fa'
};

function App() {
  return (
    <Router>
      <div style={{ width: '100%', boxSizing: 'border-box' }}>
        <nav style={navStyle}>
          <Link to="/LaborantsPage" style={linkStyle}>Laborantlar Sayfası</Link>
          <Link to="/RaporlarPage" style={linkStyle}>Raporlar Sayfası</Link>
          <Link to="/" ><LogoutComponent/></Link>
        </nav>
        <Routes>
          <Route path="/" element={<LoginRegisterPage/>}/>
          <Route path="/RaporlarPage" element={<RaporlarPage />} />
          <Route path="/LaborantsPage" element={<LaborantsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
