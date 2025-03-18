import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

const LoginComponent = ({ login }) => {
    const [UserId, setUserId] = useState('');
    const [Password, setPassword] = useState('');
    const [erMessage, setErrormsg] = useState('');
    const navigate = useNavigate();

    const doLogin = (e) => {
        e.preventDefault();

        fetch("http://localhost:5041/api/Login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: UserId, password: Password }),
        })
        .then(response => {
            if (!response.ok) throw new Error("Invalid credentials");
            return response.text();
        })
        .then((data) => {
            if (data) {
              console.log(data);
                localStorage.setItem("token", data);
                login();
                navigate("/DashBoard");
            } else {
                throw new Error("No token received");
            }
        })
        .catch(error => {
            console.error("Login failed:", error);
            setErrormsg("Invalid Username or Token Not Received");
        });
    };

    return (
        <div className="auth-container">
            <div className="login-card">
                <h2 className="text-center mb-3">Login</h2>
                <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input type="text" className="form-control" onChange={(e) => setUserId(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-success btn-sm w-50" onClick={doLogin}>Login</button>
                </div>
                {erMessage && <div className="text-danger mt-2 text-center">{erMessage}</div>}
                <div className="text-center mt-3">
                    <p>Don't have an account?</p>
                    <button className="btn btn-link" onClick={() => navigate("/*")}>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
