import React, {useState} from 'react'
import {Button, Form } from 'react-bootstrap'
import axios from 'axios'

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const changePassword = () => {
        axios.put('http://localhost:3008/auth/changePassword', {
            oldPassword: oldPassword,
            newPassword: newPassword
        }, {headers: {accessToken: localStorage.getItem('accessToken')}}
        ).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            }
        })
    }

  return (
    <div className='changePasswordCon'>
        <h4>Change your Password</h4>
        <div className='passwordInput'>
            <Form.Control 
                type='password' 
                placeholder='Old Password'
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
            />
            <Form.Control 
                type='password'
                placeholder='New Password'
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
            />
            <Button onClick={changePassword}>Change Password</Button>
        </div>
    </div>
  )
}

export default ChangePassword
