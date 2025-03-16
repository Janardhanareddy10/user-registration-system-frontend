import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaUsers, FaSearch } from "react-icons/fa"; // Importing icons
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (userId.trim()) {
      navigate(`/user/${userId}`); // ✅ Fixed: Proper template literal usage
    } else {
      alert("Please enter a valid user ID.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#e3f2fd" }}>
      <div className="card shadow-lg p-4 d-flex flex-column align-items-center text-center" style={{ width: "500px", backgroundColor: "#ffffff", borderRadius: "15px" }}>
        
        {/* User Management Title (Centered) */}
        <h2 className="mb-3">User Management</h2>

        {/* User Profile Image (Centered) */}
        <img 
          src="https://tse2.mm.bing.net/th?id=OIP.OlnxO753VRgHKDLLDzCKoAHaHw&pid=Api&P=0&h=220" 
          alt="User Profile" 
          className="rounded-circle mb-3" 
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        
        {/* Search Bar at the Bottom */}
       
        <div className="d-flex w-60 mt-2 align-self-end">
        
          <input
            type="text"
            className="form-control"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button className="btn btn-info ms-2 d-flex align-items-center justify-content-center" onClick={handleSearch}>
            <FaSearch className="me-1" /> Search
          </button>
        </div>
        <br/>
        <br/><br/>
        {/* Buttons Section */}
        <div className="w-100">
          <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center mb-2" onClick={() => navigate("/register")}>
            <FaUserPlus className="me-2" /> Register
          </button>

          <button className="btn btn-success w-100 d-flex align-items-center justify-content-center mb-4" onClick={() => navigate("/users")}>
            <FaUsers className="me-2" /> View Users
          </button>
        </div>

        

      </div>
    </div>
  );
};

export default HomePage;
