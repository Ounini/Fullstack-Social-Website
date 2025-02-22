import React, {useState, useContext} from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {setAuthState} = useContext(AuthContext)

    const login = () => {
        const data = {username: username, password: password}
        axios.post('https://fullstack-social-website.onrender.com/auth/login', data).then((response) => {
            if(response.data.error) {
                alert(response.data.error)
            } else {
                localStorage.setItem('accessToken', response.data.token)
                setAuthState({username: response.data.username, id: response.data.id, status: true})
                navigate('/')
            }
        })
    }

  return (
    <div className='login-container'>
        <div className='login-box'>
            <Form.Label>Username:</Form.Label>
            <Form.Control 
                className='input-field login-input'
                type='text'
                value={username}
                onChange={e => {setUsername(e.target.value)}}
            />
            <Form.Label>Password:</Form.Label>
            <Form.Control
                className='input-field login-input'
                type='password'
                value={password}
                onChange={e => {setPassword(e.target.value)}}
            />
            <Button className='login-button' onClick={login}>Login</Button>
            <Link to='/registration' className='sign'>Register here</Link>
        </div>
    </div>
  )
}

export default Login
