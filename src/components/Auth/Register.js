import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

    useEffect(() => {
        console.log(formError);
    }, [formError]);

    const isFormEmpty = (userName, userEmail, userPassword) => {
        return !userName.length || !userEmail.length || !userPassword.length;
    }

    const isPasswordValid = (userPassword) => {
        if (userPassword.length < 10 || userPassword.length > 20) {
            return false;
        } else {
            return true;
        }
    }

    const isFormValid = () => {
        if (isFormEmpty(userName, userEmail, userPassword)) {
            setFormError('Form is empty');
            return false;
        } else if (!isPasswordValid(userPassword)) {
            setFormError('Password is invalid');
            return false;
        } else {
            return true;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isFormValid()) {
            if (!userName.length || !userEmail.length || !userPassword.length) {
                setFormError('Form is empty');
            } else {
                const auth = getAuth();
                createUserWithEmailAndPassword(auth, userEmail, userPassword)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log(user);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorMessage);
                    });
                setFormError('');
            }
        }
    }

    return (
        <form className="registration-form" onSubmit={handleSubmit}>
            <div className="registration-form__field">
                <label className="registration-form__label" htmlFor="username">Enter your name</label>
                <input className="registration-form__input" id="username" type="text" value={userName} onChange={handleUserNameChange} />
            </div>
            <div className="registration-form__field">
                <label className="registration-form__label" htmlFor="email">Enter your email</label>
                <input className="registration-form__input" id="email" type="text" value={userEmail} onChange={handleUserEmailChange} />
            </div>
            <div className="registration-form__field">
                <label className="registration-form__label" htmlFor="password">Enter your password</label>
                <input className="registration-form__input" id="password" type="text" value={userPassword} onChange={handleUserPasswordChange} />
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