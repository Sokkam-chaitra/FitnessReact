import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Workout.css';

export default function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage

    fetch("http://localhost:5041/api/WorkOut/GetWorkouts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Attach token in request header
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.$values) {
          setWorkouts(data.$values); // Extract the correct array
        } else {
          setWorkouts([]); // Set empty if no workouts found
        }
      }).catch(error => console.error("Error fetching workouts:", error));
  }, []);

  return (
    <div className="workout-container">
      <h2 className="title">Available Workouts</h2>
      <div className="workout-list">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <div key={workout.workoutID} className="workout-card">
              <h3>{workout.workoutName}</h3>
              <p>{workout.description}</p>
              <p>Recommended Time: {workout.recommendedDuration} min</p>
              <p>Max calories can Burn: {workout.maxCaloriesBurn}</p>
            </div>
          ))
        ) : (
          <p>No workouts available.</p>
        )}
      </div>
    </div>
  );
}
