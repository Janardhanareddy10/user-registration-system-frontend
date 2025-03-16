// UserView.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserById } from "../redux/userSlice";

const UserView = () => {
  const { userId } = useParams(); // Get user ID from URL
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserById(userId)); // Dispatch action to fetch user by ID
  }, [dispatch, userId]);

  return (
    <div className="container mt-5">
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">{user?.name}</h3>
            <p><strong>Age:</strong> {user?.age}</p>
            <p><strong>Date of Birth:</strong> {user?.dob}</p>
            <p><strong>Gender:</strong> {user?.gender}</p>
            <p><strong>About:</strong> {user?.about}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserView;
