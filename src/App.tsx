import React from 'react';
import './index.css'
import { Routes, Route } from 'react-router-dom';
import { LoginComponent } from './components/Login';
import { SignUpComponent } from './components/Signup';
import { PostComponent } from './components/Post';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import ProtectedRoute from './app/store/routes/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignUpComponent />} />
        <Route path="/post" element={<PostComponent />} />
        {/* <Route path='/home' element={<HomePage />} /> */}
        <Route path='/home' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
