import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../redux/userSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dob: "",
    password: "",
    gender: "",
    about: "",
  });

  const [genders, setGenders] = useState([]); // State to store gender options from API
  const [errors, setErrors] = useState({});

  // Fetch gender options from API
  useEffect(() => {
    fetch("https://api.example.com/genders") // Replace with actual API URL
      .then((response) => response.json())
      .then((data) => setGenders(data))
      .catch((err) => console.error("Error fetching genders:", err));
  }, []);

  // Function to validate inputs
  const validate = () => {
    let newErrors = {};

    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name should contain only alphabets.";
    }

    if (!formData.age || isNaN(formData.age) || formData.age < 0 || formData.age > 120) {
      newErrors.age = "Age must be a number between 0 and 120.";
    }

    if (!formData.dob || isNaN(new Date(formData.dob).getTime())) {
      newErrors.dob = "Please enter a valid date.";
    } else if (new Date(formData.dob) > new Date()) {
      newErrors.dob = "Date of birth cannot be in the future.";
    }

    if (!formData.password || formData.password.length < 10 || !/\d/.test(formData.password) || !/[A-Za-z]/.test(formData.password)) {
      newErrors.password = "Password must be at least 10 characters long and contain both letters and numbers.";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select a gender.";
    }

    if (formData.about.length > 5000) {
      newErrors.about = "About section cannot exceed 5000 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await dispatch(createUser(formData)).unwrap();
      alert("User registered successfully!");
      setFormData({ name: "", age: "", dob: "", password: "", gender: "", about: "" });
      navigate("/");
    } catch (err) {
      alert("Error: " + (err.message || "Something went wrong!"));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#e3f2fd" }}>
      <div className="card shadow p-4" style={{ width: "400px", backgroundColor: "#f8f9fa" }}>
        <h3 className="text-center mb-3">User Registration</h3>
        {status === "loading" && <div className="alert alert-info">Registering user...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} 
              className="form-control" placeholder="Enter your name" required />
            {errors.name && <small className="text-danger">{errors.name}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} 
              className="form-control" placeholder="Enter your age" required />
            {errors.age && <small className="text-danger">{errors.age}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} 
              className="form-control" required />
            {errors.dob && <small className="text-danger">{errors.dob}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} 
              className="form-control" placeholder="Enter a strong password" required />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="form-select" required>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
              {genders.map((g, index) => (
                <option key={index} value={g}>{g}</option>
              ))}
            </select>
            {errors.gender && <small className="text-danger">{errors.gender}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">About</label>
            <textarea name="about" value={formData.about} onChange={handleChange} 
              className="form-control" placeholder="Tell something about yourself" maxLength="5000"></textarea>
            {errors.about && <small className="text-danger">{errors.about}</small>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
