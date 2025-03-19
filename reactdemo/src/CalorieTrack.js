import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  fooditem: Yup.string().required("Food Item is required"),
  calories: Yup.number()
    .typeError("Calories must be a number")
    .positive("Calories must be a positive number")
    .integer("Calories must be an integer")
    .required("Calories are required"),
  mealtype: Yup.string().required("Meal Type is required"),
});

function CalorieIntake() {
  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Calories</h3>
        <Formik
          initialValues={{ fooditem: "", calories: "", mealtype: "" }} // Ensure empty string for consistency
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log("Submitting:", values);

            fetch("http://localhost:5041/api/CalorieIntake", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                fooditem: values.fooditem,
                calories: Number(values.calories), // Convert to Number
                mealtype: values.mealtype,
              }),
            })
              .then((response) => {
                if (!response.ok) {
                  return response.text().then((text) => {
                    throw new Error(text || "Failed to add calorie entry");
                  });
                }
                return response.json().catch(() => ({ message: "Success" })); // Handle non-JSON response
              })
              .then((data) => {
                console.log("Success:", data);
                alert(data.message || "Calorie entry added successfully!");
                resetForm();
              })
              .catch((error) => {
                console.error("Error:", error);
                alert(error.message || "Failed to add calorie entry");
              })
              .finally(() => setSubmitting(false));
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Food Item*</label>
                  <Field
                    type="text"
                    className="form-control"
                    placeholder="Enter Food Item"
                    name="fooditem"
                  />
                  <ErrorMessage className="text-danger" name="fooditem" component="div" />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Calories*</label>
                  <Field
                    type="number"
                    className="form-control"
                    placeholder="Enter Calories"
                    name="calories"
                  />
                  <ErrorMessage className="text-danger" name="calories" component="div" />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Meal Type*</label>
                  <Field as="select" className="form-select" name="mealtype">
                    <option value="" disabled>Select Meal Type</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                  </Field>
                  <ErrorMessage className="text-danger" name="mealtype" component="div" />
                </div>

                <div className="col-md-3 text-center mt-3">
                  <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CalorieIntake;
