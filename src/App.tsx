import React, { useEffect } from 'react';
import './index.css'
import { Routes, Route } from 'react-router-dom';
import { LoginComponent } from './components/Login';
import { SignUpComponent } from './components/Signup';
import { PostHomePage } from './components/Post';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import ProtectedRoute from './app/routes/ProtectedRoute';
import { useSelector } from 'react-redux';
import { selectAuthToken, selectLoggedIn } from './app/features/auth/auth.selector';
import { CreatePost } from './components/CreatePost';
import { HttpService } from './app/services/base.service';
// import { UpdatePostComponent } from './components/UpdatePost';

function App() {
  const isLoggedIn = useSelector(selectLoggedIn);
  const token = useSelector(selectAuthToken);

  useEffect(() => {
    if (token && token != "") {
      HttpService.setToken(token);
    }

  }, [token])

  return (
    <div className="App">
      {isLoggedIn && <NavBar />}
      <Routes>
        <Route path="/login" element={<ProtectedRoute isLoginOrSignup><LoginComponent /></ProtectedRoute>} />
        <Route path="/signup" element={<ProtectedRoute isLoginOrSignup><SignUpComponent /></ProtectedRoute>} />
        <Route path="/post" element={<ProtectedRoute><PostHomePage /></ProtectedRoute>} />
        <Route path='/home' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='/createpost' element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        {/* <Route path='/updatepost' element={<ProtectedRoute><UpdatePostComponent /></ProtectedRoute>} /> */}
      </Routes>
    </div>
  );
}

export default App;
