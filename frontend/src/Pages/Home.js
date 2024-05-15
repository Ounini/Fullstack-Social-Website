import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import {Container, Button} from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'
import { capitalizeFirstLetter } from '../helpers/FirstLetterToCap'

function Home() {
    const [listOfPosts, setListOfPosts] = useState([])
    const [likedPosts, setLikedPosts] = useState([])
    const {authState} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            navigate('/login')
        } else {
            axios.get('https://fullstack-social-website.onrender.com/posts', {
                headers: {accessToken: localStorage.getItem('accessToken')},
            })
            .then((response) => {
                const {listOfPosts, likedPosts} = response.data
                setListOfPosts(listOfPosts)
                setLikedPosts(likedPosts.map(like => like.PostId))
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            })
        }
    }, [])

    const likeAPost = async (postId) => {
        try {
            await axios.post(
                'https://fullstack-social-website.onrender.com/likes', 
                { PostId: postId }, 
                { headers: { accessToken: localStorage.getItem('accessToken') } }
            );
    
            // Update the likedPosts state based on whether the postId is already liked or not
            setLikedPosts(prevLikedPosts => {
                if (prevLikedPosts.includes(postId)) {
                    return prevLikedPosts.filter(id => id !== postId); // Unlike the post
                } else {
                    return [...prevLikedPosts, postId]; // Like the post
                }
            });
    
            // Fetch the updated list of posts from the server and update the listOfPosts state
            const response = await axios.get('https://fullstack-social-website.onrender.com/posts', {
                headers: { accessToken: localStorage.getItem('accessToken') },
            });
            setListOfPosts(response.data.listOfPosts);
        } catch (error) {
            console.error('Error liking a post:', error);
        }
    };

  return (
    <div className='home'>
        <Container>
            {
                listOfPosts.map((value, key) => {
                    return (
                        <div className='post' key={value._id}> 
                            <div className='title'>{capitalizeFirstLetter(value.title)}</div>
                            <div className='body' onClick={() => {navigate(`/post/${value._id}`)}}>{value.postText}</div>
                            <div className='footer'>
                                <Link to={`/profile/${value.UserId}`} className='post-username' >{value.username}</Link>
                                <Button 
                                    className='post-btn'
                                    onClick={() => {likeAPost(value._id)}}
                                >
                                    <i className={likedPosts.includes(value._id) ? 'like2 fas fa-thumbs-up' : 'like fas fa-thumbs-up'} />
                                    <span className='likes-number'>{value.likes.length}</span>
                                </Button>
                            </div>
                        </div>
                    )
                })
            }
        </Container>
    </div>
  )
}

export default Home
