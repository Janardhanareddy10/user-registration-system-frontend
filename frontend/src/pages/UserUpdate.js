import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, fetchUserById, fetchUsers } from "../redux/userSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const UserUpdate = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dob: "",
    password: "",
    gender: "Male",
    about: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    let userToUpdate = users.find((user) => user._id === userId);

    if (!userToUpdate) {
      dispatch(fetchUserById(userId))
        .unwrap()
        .then((fetchedUser) => {
          setFormData({
            name: fetchedUser.name || "",
            age: fetchedUser.age || "",
            dob: fetchedUser.dob || "",
            password: "", // Ensure password is set to an empty string
            gender: fetchedUser.gender || "Male",
            about: fetchedUser.about || "",
          });
        })
        .catch((err) => console.error("Error fetching user:", err));
    } else {
      setFormData({
        name: userToUpdate.name || "",
        age: userToUpdate.age || "",
        dob: userToUpdate.dob || "",
        password: "", // Ensure password is set to an empty string
        gender: userToUpdate.gender || "Male",
        about: userToUpdate.about || "",
      });
    }
  }, [userId, users, dispatch]);

  const validate = () => {
    let newErrors = {};

    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name should contain only alphabets.";
    } else {
      const nameExists = users.some(
        (user) => user.name === formData.name && user._id !== userId
      );
      if (nameExists) {
        newErrors.name = "This name is already in use.";
      }
    }

    if (!formData.age || isNaN(formData.age) || formData.age < 0 || formData.age > 120) {
      newErrors.age = "Age must be a number between 0 and 120.";
    }

    if (!formData.dob || isNaN(new Date(formData.dob).getTime())) {
      newErrors.dob = "Please enter a valid date.";
    } else if (new Date(formData.dob) > new Date()) {
      newErrors.dob = "Date of birth cannot be in the future.";
    }

    if (formData.password && (formData.password.length < 10 || !/\d/.test(formData.password) || !/[A-Za-z]/.test(formData.password))) {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await dispatch(updateUser({ id: userId, userData: formData })).unwrap();
      alert("User updated successfully!");
      await dispatch(fetchUsers());
      navigate("/users");
    } catch (err) {
      alert("Error: " + (err.message || "Something went wrong!"));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#e3f2fd" }}>
      <div className="card shadow p-4" style={{ width: "400px", backgroundColor: "#f8f9fa" }}>
        <h3 className="text-center mb-3">Update User</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
            {errors.name && <small className="text-danger">{errors.name}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-control" required />
            {errors.age && <small className="text-danger">{errors.age}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="form-control" required />
            {errors.dob && <small className="text-danger">{errors.dob}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" placeholder="Leave blank to keep current password" />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="form-select">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">About</label>
            <textarea name="about" value={formData.about} onChange={handleChange} className="form-control" maxLength="5000"></textarea>
            {errors.about && <small className="text-danger">{errors.about}</small>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UserUpdate;
