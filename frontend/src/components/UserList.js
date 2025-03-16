import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "bootstrap";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, status } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Handle Delete
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await dispatch(deleteUser(userId)); // Dispatch delete action
      dispatch(fetchUsers()); // Refresh user list
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User List</h2>

      {status === "loading" ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.dob}</td>
                    <td>{user.gender}</td>
                    <td>
                      <button className="btn btn-info btn-sm me-2" onClick={() => navigate(`/view/${user._id}`)}>
                        <FaEye /> View
                      </button>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => navigate(`/update/${user._id}`)}>
                        <FaEdit /> Update
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user._id)}>
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <div className="d-flex justify-content-end">
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Back
      </button>
    </div>
    </div>

  );
};

export default UserList;
