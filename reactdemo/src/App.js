import logo from './run.png';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import LoginComponent from './Login';
import ProtectedRoute from './protectroute';
import DashBoard from './DashBoard';
import SignupComponent from './Signup';
import WorkoutList from './WorkOutLog';
import FormRegister from './Register';
function App() {
  const navigate=useNavigate();
  const [isUserAuthenticated,setAuth]=useState(false);
  const UserLogin=()=>{
    setAuth(true);
  }
  const Logout=()=>{
    setAuth(false);
    navigate("/");
  }
  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg ">
  <div class="container-fluid">
  <a className="navbar-brand d-flex align-items-center" href="#">
  <img src={logo} alt="Logo" className="nav-logo me-2" />
  <h3 className="nav-logo-head mb-0">FitX</h3>
</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        {isUserAuthenticated &&(
          <>
          <li>
            <Link to="/DashBoard" className='nav-link'>DashBoard</Link>
            </li>
            <li>
            <Link to="/workout" className='nav-link'>WorkOuts</Link>
            </li>
          
        </>)}
      </ul>
      {isUserAuthenticated && (
        <button className="btn btn-danger ms-auto" onClick={Logout}>
          Logout
        </button>
      )}
    </div>
  </div>
</nav>
          <Routes>
            <Route element={<ProtectedRoute isUserAuthenticated={isUserAuthenticated}/>}>
            <Route  path='/DashBoard' Component={DashBoard} ></Route>
            <Route  path='/workout' Component={WorkoutList} ></Route>
            </Route>
            <Route path='/' element={<LoginComponent login={UserLogin}/>} ></Route>
            <Route path='/*' element={<SignupComponent/>} ></Route>
          </Routes>
    </div>
  );
}

export default App;
