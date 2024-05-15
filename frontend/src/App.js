// docker, editor config, css formatter 
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Home from './Pages/Home';
import CreatePost from './Pages/CreatePost';
import Post from './Pages/Post';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import { AuthContext } from './helpers/AuthContext'
import PageNotFound from './Pages/PageNotFound'
import Profile from './Pages/Profile';
import ChangePassword from './Pages/ChangePassword';
import CollapsedMenu from './Pages/CollapsedMenu';

function App() {
  const [post, setPost] = useState({})
  const addPost = async (post) => {
    const response = await axios.post('https://fullstack-social-website.onrender.com/posts', post, {
      headers: {accessToken: localStorage.getItem('accessToken')},
    })
  }

  const [registration, setRegistration] = useState({})
  const signUp = async (registration) => {
    const response = await axios.post('https://fullstack-social-website.onrender.com/auth', registration)
    console.log(registration)
  }

  const [authState, setAuthState] = useState({
    username: '', 
    id: 0, 
    status: false
  })
  useEffect(() => {
    axios.get('https://fullstack-social-website.onrender.com/auth/user', {headers: {
      accessToken: localStorage.getItem('accessToken')
    }}).then((response) => {
      if (response.data.error) {
        setAuthState({...authState, status: false})
      } else {
        setAuthState({
          username: response.data.username, 
          id: response.data.id, 
          status: true
        })
      }
    })
  }, [])

  const logOut = () => {
    localStorage.removeItem('accessToken')
    setAuthState({username: '', id: 0, status: false})
  }

  return (
    <div className='App'>
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
        <div className='navbar-nav'>
            {!authState.status ? (
              <div className='log-link'>
                <Link to='/login'>Login</Link>
                <Link to='/registration'>Registration</Link>
              </div>
            ) : (
              <>
                <div className='d-block d-sm-none'>
                  <CollapsedMenu />
                </div>
                <div className='d-none d-sm-block'>
                  <Link to='/'>Homepage</Link>
                  <Link to='/createpost'>Create A Post</Link>
                </div>
              </>
            )}
            <p className='username'> {authState.username} </p>
            {authState.status && 
              <Button  className='logout-button' onClick={logOut}>
                Log Out
              </Button>
            }
          </div>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/createpost' exact element={<CreatePost onAddPost={addPost} />} /> 
            <Route path='/post/:id' exact element={<Post />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/registration' exact element={<Registration onSignUp={signUp} />} />
            <Route path='/profile/:id' exact element={<Profile />} />
            <Route path='/change+password' exact element={<ChangePassword />} />
            <Route path='*' exact element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
