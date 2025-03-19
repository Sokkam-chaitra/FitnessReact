import { useEffect, useState } from "react";
import "./WorkOutTrend.css";

function TrendsPage() {
  const [workoutTrends, setWorkoutTrends] = useState([]);
  const [calorieTrends, setCalorieTrends] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch Workout Trends
    fetch("http://localhost:5041/api/Workout/WorkoutTrends", {
        method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setWorkoutTrends(data))
      .catch((err) => console.error("Error fetching workout trends:", err));

    // Fetch Calorie Trends
    fetch("http://localhost:5041/api/CalorieIntake/CalorieTrends", {
        method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    //   .then((res) => res.json())
        .then((data) => {setCalorieTrends(data)
            console.log(data);
        })
      .catch((err) => console.error("Error fetching calorie trends:", err));
  }, []);

  return (
    <div className="trends-container">
      <h2 className="title">Fitness & Calorie Trends</h2>

      <div className="tables-container">
        {/* Workout Trends Table */}
        <div className="table-wrapper">
          <h3>Workout Trends</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Workout Type</th>
                <th>Duration (min)</th>
                <th>Calories Burned</th>
              </tr>
            </thead>
            <tbody>
              {workoutTrends.length > 0 ? (
                workoutTrends.map((workout, index) => (
                  <tr key={index}>
                    <td>{new Date(workout.Date).toLocaleDateString()}</td>
                    <td>{workout.WorkoutType}</td>
                    <td>{workout.Duration}</td>
                    <td>{workout.CaloriesBurned}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No workout data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Calorie Trends Table */}
        <div className="table-wrapper">
          <h3>Calorie Intake Trends</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Meal Type</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {calorieTrends.length > 0 ? (
                calorieTrends.map((calorie, index) => (
                  <tr key={index}>
                    <td>{new Date(calorie.Date).toLocaleDateString()}</td>
                    <td>{calorie.Meal}</td>
                    <td>{calorie.Calories}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No calorie intake data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default TrendsPage;