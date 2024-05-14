import React, {useEffect, useState, useContext} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {Button} from 'react-bootstrap';
import { AuthContext } from '../helpers/AuthContext'

function Profile() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [listOfPosts, setListOfPosts] = useState([])
    const {authState} = useContext(AuthContext)

    useEffect(() => {
        axios.get(`https://fullstack-social-website.onrender.com/auth/basicinfo/${id}`)
        .then((response) => {
            setUsername(response.data.username)
        })
        axios.get(`https://fullstack-social-website.onrender.com/posts/byuserId/${id}`)
        .then((response) => {
            setListOfPosts(response.data)
        })
    }, [])

    return (
        <div className='profilePageContainer'>
            <div className='basicInfo'>
               <h1> Username: {username} </h1>
               {authState.username === username && (       
                    <Button onClick={() => navigate('/change+password')}>Change Password </Button>
                )}
            </div>
            <div className='listOPosts'>
                {
                    listOfPosts.map((value, key) => {
                        return (
                            <div className='post' key={value._id}> 
                                <div className='title'>{value.title} </div>
                                <div className='body' onClick={() => {navigate(`/post/${value._id}`)}}>{value.postText}</div>
                                <div className='footer'>
                                    {value.username}
                                    <span className='likes-number profile-likes'>{value.likes.length}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>                
        </div>
    )
}

export default Profile
