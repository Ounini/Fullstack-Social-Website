import React, {useState, useContext, useEffect} from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'

function CreatePost({onAddPost}) {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [postText, setPostText] = useState('')
    const {authState} = useContext(AuthContext)

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            navigate('/login')
        }
    }, [])

    const submitPost = e => {
        e.preventDefault()
        if (title === '' || postText === '') {
            alert('All fields are mandatory!')
            return
        }
        onAddPost({title, postText})
        setTitle('')
        setPostText('')
        navigate('/')
    }

    return (
        <div className='createPostPage'>
            <Form className='formContainer' onSubmit={submitPost}>
                <Row>
                    <Col sm={12}>
                        <div>
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                id='inputCreatePost' 
                                type='text' 
                                name='title'
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder='Ex. Title..' 
                                required
                            />
                        </div>
                    </Col>
                    <Col sm={12}>
                        <div>
                            <Form.Label>Post</Form.Label>
                            <Form.Control 
                                as='textarea' 
                                id='inputCreatePost' 
                                type='text' 
                                name='postText' 
                                value={postText}
                                onChange={e => setPostText(e.target.value)}
                                placeholder='Ex. Post..' 
                                required
                            />
                        </div>
                    </Col>
                </Row>
                <Button type='submit'>Create Post</Button>
            </Form>
        </div>
    )
}

export default CreatePost
