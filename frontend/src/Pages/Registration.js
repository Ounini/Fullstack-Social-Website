import React, {useState} from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Registration({onSignUp}) {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submitSignUp = e => {
        e.preventDefault()
        if (username === '' || password === '') {
            alert('All fields are mandatory!')
            return
        }
        onSignUp({username, password})
        setUsername('')
        setPassword('')
        navigate('/')
    }

  return (
    <div className='createPostPage'>
        <Form className='formContainer' onSubmit={submitSignUp}>
            <Row>
                <Col sm={12}>
                    <div>
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            id='inputUsername' 
                            type='text' 
                            name='username'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder='Ex. slimmzy' 
                            required
                        />
                    </div>
                </Col>
                <Col sm={12}>
                    <div>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            id='inputPassword' 
                            type='password' 
                            name='passworrd'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder='Your Passowrd' 
                            required
                        />
                    </div>
                </Col>
            </Row>
            <Button type='submit'>Sign Up</Button>
        </Form>
    </div>
  )
}

export default Registration
