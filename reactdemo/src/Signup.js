import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupComponent = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    fetch("http://localhost:5041/api/SignUp", {
      method: "POST",
      headers: { 
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username , password: password}),
  })
  .then(response => {
      
      return response.text();
  })
    localStorage.setItem("user", JSON.stringify({ username, password ,email}));

    alert("Signup Successful! Please Login.");
    navigate("/"); 
  };

  return (
    <div className="auth-container">
            <div className="login-card">
                <h2 className="text-center mb-3">Sign Up</h2>
                <div className="mb-3">
                    <label className="form-label">User Name*</label>
                    <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email*</label>
                    <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password*</label>
                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Password*</label>
                    <input type="password" className="form-control" onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-success btn-sm w-50" onClick={handleSignup}>Sign Up</button>
                </div>
                {errorMessage && <div className="text-danger mt-2 text-center">{errorMessage}</div>}
                <div className="text-center mt-3">
                    <p>Already have an account?</p>
                    <button className="btn btn-link" onClick={() => navigate("/")}>
                        Login
                    </button>
                </div>
            </div>
        </div>


  );
};

export default SignupComponent;
