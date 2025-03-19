import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Workout.css';

export default function WorkoutList() {
  const navigate = useNavigate();

  // Predefined Workouts
  const predefinedWorkouts = [
    {
      workoutName: "Treadmill",
      description: "Boost your endurance and burn calories with a high-energy treadmill session! Whether it's a brisk walk or an intense run, this workout improves heart health, strengthens muscles, and helps with weight loss.",
      maxCalories: 400,
      duration: 30,
    },
    {
      workoutName: "Walking",
      description: "Take a step towards better health with a refreshing walk! Walking enhances cardiovascular health, strengthens joints, and boosts mood. Stay consistent and enjoy the benefits of this simple yet powerful exercise!",
      maxCalories: 200,
      duration: 45,
    },
    {
      workoutName: "Push-Ups",
      description: "Build strength and endurance with push-ups! This bodyweight exercise targets your chest, shoulders, and core while improving overall fitness. Push yourself to new heights!",
      maxCalories: 250,
      duration: 20,
    }
  ];
  const handleStartWorkout = (workout) => {
    const token = localStorage.getItem("token");

    const requestData = {
      WorkoutName: workout.workoutName,  // ✅ Match backend model
      Description: workout.description,
      Maxcalories: workout.maxCalories,
      Duration: workout.duration,
    };
    

    fetch("http://localhost:5041/api/WorkOut/LogWorkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Workout logged:", data);
      alert("Workout logged successfully!");
    })
    .catch(error => console.error("Error logging workout:", error));
  };

  return (
    <div className="workout-container">
      <h2 className="title">Available Workouts</h2>
      <div className="workout-list">
        {predefinedWorkouts.map((workout, index) => (
          <div key={index} className="workout-card">
            <h3>{workout.workoutName}</h3>
            <p>{workout.description}</p>
            <p>Duration: {workout.duration} min</p>
            <p>Max Calories Burn: {workout.maxCalories}</p>
            <button onClick={() => handleStartWorkout(workout)}>Start Workout</button>
          </div>
        ))}
      </div>
    </div>
  );
}
