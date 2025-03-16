import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import HomePage from "./pages/HomePage";
import UserList from "./components/UserList";
import UserView from "./pages/UserView";
import UserUpdate from "./pages/UserUpdate";
// ✅ Ensure the correct file path



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
  <Route path="/" element ={<HomePage/>}/>
  <Route path="/users" element ={<UserList/>}/>
  <Route path="/view/:userId" element={<UserView />} />  {/* ✅ Dynamic route */}
        <Route path="/update/:userId" element={<UserUpdate />} /> 
        <Route path="/user/:id" element={<UserView />} />
      </Routes>
    </Router>
   

  );
};

export default App;
