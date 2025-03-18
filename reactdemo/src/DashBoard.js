import { useNavigate } from "react-router-dom";
import './DashBoard.css';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>Your Fitness Journey Starts Here!</h1>
      <p className="quote">"The only bad workout is the one that didn’t happen!" </p>

      <p className="description">
        Every step you take brings you closer to a stronger, healthier, and more energized you.  
        Track your progress, stay consistent, and let every session push your limits!  
      </p>

      <p className="quote">"Success isn’t given. It’s earned – in sweat, determination, and hard work!"</p>

      <p className="description">
        Your transformation starts today. Ready to break a sweat and challenge yourself?  
        Let’s make every second count!
      </p>

      <button className="btn btn-primary" onClick={() => navigate("/reg")}>
        Register
      </button>
    </div>
  );
}
export default Dashboard;