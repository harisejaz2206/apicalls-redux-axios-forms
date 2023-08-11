import React from 'react';
import './index.css'
import { Routes, Route } from 'react-router-dom';
import { LoginComponent } from './components/Login';
import { SignUpComponent } from './components/Signup';
import { PostComponent } from './components/Post';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import ProtectedRoute from './app/store/routes/ProtectedRoute';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from './app/store/auth/auth.selector';

function App() {
  const isLoggedIn = useSelector(selectLoggedIn);

  return (
    <div className="App">
      {isLoggedIn && <NavBar />}
      <Routes>
        <Route path="/login" element={<ProtectedRoute isLoginOrSignup><LoginComponent /></ProtectedRoute>} />
        <Route path="/signup" element={<ProtectedRoute isLoginOrSignup><SignUpComponent /></ProtectedRoute>} />
        <Route path="/post" element={<ProtectedRoute><PostComponent /></ProtectedRoute>} />
        <Route path='/home' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
