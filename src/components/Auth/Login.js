import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword, getAuth, updateProfile, onAuthStateChanged} from "firebase/auth";
import {getDatabase, ref, set} from "firebase/database";

const Login = () => {

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [formError, setFormError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const database = getDatabase();
    const auth = getAuth();

    useEffect(() => {
        console.log(formError);
    }, [formError]);

    const history = useNavigate();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            history('/');
        }
    });

    const handleUserEmailChange = (event) => {
        setUserEmail(event.target.value);
    }

    const handleUserPasswordChange = (event) => {
        setUserPassword(event.target.value);
    }

    const isFormValid = () => {
        return userEmail && userPassword;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isFormValid(userEmail, userPassword)) {
            setIsLoading(true);
            signInWithEmailAndPassword(auth, userEmail, userPassword)
                .then((currentUser) => {
                    console.log(auth.currentUser);
                    setIsLoading(false);
            })
                .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
            setFormError('');
        }
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form__text-wrap">
                <h1 className="login-form__title">Login to MovieNET</h1>
                <p className="login-form__text">Please enter your data</p>
            </div>
            <div className="login-form__field">
                <label className="login-form__label" htmlFor="email">Enter your email</label>
                <input className="login-form__input" id="email" type="text" value={userEmail} onChange={handleUserEmailChange} />
            </div>
            <div className="login-form__field">
                <label className="login-form__label" htmlFor="password">Enter your password</label>
                <input className="login-form__input" id="password" type="text" value={userPassword} onChange={handleUserPasswordChange} />
            </div>
            <button type="submit">Submit</button>
            <div>
                Don't have an account?
                <Link to="/register">Register</Link>
            </div>
            {
                isLoading && <div>Loading...</div>
            }
            <p>{formError}</p>
        </form>
    )
}

export default Login;