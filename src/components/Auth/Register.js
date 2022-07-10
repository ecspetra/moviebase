import React from "react";
import { Link } from "react-router-dom";

class Register extends React.Component {

    handleChange = () => {}

    render() {
        return (
            <form>
                <div>
                    <label htmlFor="username">Enter your name</label>
                    <input id="username" type="text" onChange={this.handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Enter your email</label>
                    <input id="email" type="text" onChange={this.handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Enter your password</label>
                    <input id="password" type="text" onChange={this.handleChange} />
                </div>
                <button type="submit"></button>
                <div>
                    Already a user?
                    <Link to="/login">Login</Link>
                </div>
            </form>
        )
    }
}

export default Register;