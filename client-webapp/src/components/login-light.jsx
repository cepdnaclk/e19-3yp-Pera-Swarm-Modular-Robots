import React from "react";
import "./login-light.css";

const LoginForm=()=>{
    return(
        <>
            <div className="card">
                <div className="header"><img className="logo" src="../src/assets/logo.svg" alt="Logo"/><h1>Login </h1></div>
                
                
                <div className="form-items">
                    <label for="email" className="email">Email</label><br></br>
                    <input type="text" id="email" />
                </div>
                <div className="form-items">
                    <label for="password"  className="password">Password</label><br></br>
                    <input type="password" id="password" />
                </div>
                <input className="button" type="submit" value="Login" />
            </div>

        </>
    )

}
export default LoginForm;