import React from 'react'
import './login.css'
import Loginlogo from '../images/logo.png'
import Button from "@mui/material/Button";
import { auth, provider } from '../firebaseconfig';
import {useStateValue} from '../StateProvider'
import {actionTypes} from '../Reducer'

function Login() {

    const [ , dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        })
        .catch(err => console.error(err))
    }
  return (
    <div className='login'>
        <div className="login_container">
            <img src={Loginlogo} alt="" />
            <div className="login_text">
                <h1>Sign in to WhatsApp</h1>
            </div>
            <Button varient="contained" onClick={signIn}>
                SIGN IN
            </Button>
        </div>
    </div>
  )
}

export default Login