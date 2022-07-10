import React, {useState} from "react";
import { Link } from "react-router-dom";
//import firebase from 'firebase/compat/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [formError, setFormError] = useState('');

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    }

    const handleUserEmailChange = (event) => {
        setUserEmail(event.target.value);
    }

    const handleUserPasswordChange = (event) => {
        setUserPassword(event.target.value);
    }

    // const isFormEmpty = (userName, userEmail, userPassword) => {
    //     console.log(userName, userEmail, userPassword);
    //     //return !userName.length || !userEmail.length || !userPassword.length;
    // }

    const isFormValid = (userName, userEmail, userPassword) => {
        if (!userName.length || !userEmail.length || !userPassword.length) {
            setFormError('Form is empty');
        } else if (userPassword.length > 10 && userPassword.length < 20) {
            setFormError('Password must be more than 10 and less than 20 characters');
        } else {
            setFormError('');
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userName, userEmail, userPassword);
        if (isFormValid(userName, userEmail, userPassword)) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, userEmail, userPassword)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });
        } else {
            console.log(formError);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Enter your name</label>
                <input id="username" type="text" value={userName} onChange={handleUserNameChange} />
            </div>
            <div>
                <label htmlFor="email">Enter your email</label>
                <input id="email" type="text" value={userEmail} onChange={handleUserEmailChange} />
            </div>
            <div>
                <label htmlFor="password">Enter your password</label>
                <input id="password" type="text" value={userPassword} onChange={handleUserPasswordChange} />
            </div>
            <button type="submit">Submit</button>
            <div>
                Already a user?
                <Link to="/login">Login</Link>
            </div>
            <p>{formError}</p>
        </form>
    )
}

export default Register;