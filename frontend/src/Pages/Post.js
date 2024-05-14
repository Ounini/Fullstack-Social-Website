import React, {useEffect, useState, useContext} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'

function Post() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [postObject, setPostObject] = useState({})
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const {authState} = useContext(AuthContext)

    useEffect(() => {
        axios.get(`https://fullstack-social-website.onrender.com/posts/byId/${id}`).then((response) => {
            setPostObject(response.data)
        })
        axios.get(`https://fullstack-social-website.onrender.com/comments/${id}`).then((response) => {
            setComments(response.data)
        })
    }, [])

    const addComment = () => {
        axios
            .post('https://fullstack-social-website.onrender.com/comments', {
                commentBody: newComment, 
                PostId: id
            },
            {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            }
        )
        .then((response) => {
            if (response.data.error) {
                console.log(response.data.error)
            } else {
                const commentToAdd = {
                    commentBody: newComment, 
                    username: response.data.username
                }
                setComments([...comments, commentToAdd])
                setNewComment('')
            }
        })
    }

    const deleteComment = (_id) => {
        axios.delete(`https://fullstack-social-website.onrender.com/comments/${_id}`, {
            headers: {accessToken: localStorage.getItem('accessToken')},
        })
        .then(() => {
            setComments(comments.filter((val) => {
                return val._id !== _id
            }))    
        })
    }

    
    const deletePost = (_id) => {
        axios.delete(`https://fullstack-social-website.onrender.com/posts/${_id}`, {
            headers: {accessToken: localStorage.getItem('accessToken')},
        })
        .then(() => {
            navigate('/')
        })
    }

    const editPost = (option) => {
        if (option === 'title') {
            let newTitle = prompt('Enter new Title:')
            axios.put('https://fullstack-social-website.onrender.com/posts/title', {
                newTitle: newTitle, 
                id: id
            },
            {
                headers: {accessToken: localStorage.getItem('accessToken')}
            })
            setPostObject({...postObject, title: newTitle})
        } else {
            let editedPost = prompt('Enter new Post:')
            axios.put('https://fullstack-social-website.onrender.com/posts/postText', {
                editedPost: editedPost, 
                id: id
            },
            {
                headers: {accessToken: localStorage.getItem('accessToken')}
            })
            setPostObject({...postObject, postText: editedPost})
        }
    }

  return (
    <div className='postPage'>
        <Container fluid>
            <Row>
                <Col sm={6}>
                    <div className='leftSide'>
                        <div className='post' id='individual'>
                            <div className='postTitle' 
                                onClick={() => {
                                    if (authState.username === postObject.username) { 
                                        editPost('title')
                                    }
                                }}
                            >
                                {postObject.title}
                            </div>
                            <div className='postBody' 
                                onClick={() => {
                                    if (authState.username === postObject.username) {
                                        editPost('body')
                                    }  
                                }}
                                
                            >
                                {postObject.postText}
                            </div>
                            <div className='postFooter'>
                                {postObject.username}
                                {authState.username === postObject.username && (
                                    <Button onClick={() => (deletePost(postObject._id))} className='trash-btn'>
                                        <i className='post-trash fas fa-trash' />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col sm={6}>
                    <div className='rightSide'>
                        <div className='addCommentContainer'>
                            <Form.Control 
                                className='input-field' 
                                type='text' 
                                placeholder='Comment...'
                                value={newComment} 
                                onChange={e => {setNewComment(e.target.value)}} 
                            />
                            <Button onClick={addComment} className='button'>Add Comment</Button>
                        </div>
                        <div className='listOfComments'>
                            {
                                comments.map((comment, key) => {
                                    return (
                                        <div key={key} className='comment'>
                                            {comment.commentBody}
                                            <Form.Label> Username: {comment.username} </Form.Label>
                                            {
                                                authState.username === comment.username &&
                                                <Button 
                                                    className='trash'
                                                    onClick={() => {deleteComment(comment._id)}}
                                                >
                                                    <i className='fas fa-trash' />
                                                </Button>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Post
