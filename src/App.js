import "./App.css";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import About from "./components/About";
import Home from "./components/Home";
import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./styles.css";
import MyProfile from "./components/MyProfile";
import { useEffect, useState } from "react";
import Edituser from "./components/Edituser";
import Addpost from "./components/Addpost";
import { toast } from "react-toastify";
import { Redirect } from "react-router";
import Editpost from "./components/Editpost";

export default function App() {
  const [user, setUser] = useState('');
  const [loggedin,setLoggedin] = useState(false)
  const [showNotification, setShowNotification] = useState(false);
  // auto-login
  useEffect(() => {
    fetch("https://mysmile.onrender.com/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
        setLoggedin(true)
      }
    });
  }, []);

  console.log(user);

  return (
    <BrowserRouter>
      <Navbar user={loggedin}/>
      <Routes>
        {/* if(!user) return <LoginForm setUser={setUser}/> */}
        <Route
          path="/"
          element={
            <LoginForm
              setUser={setUser}
              setShowNotification={setShowNotification}
              showNotification={showNotification}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home user={user} setUser={setUser} />} />
        <Route
          path="/signup"
          element={
            <SignupForm
              setShowNotification={setShowNotification}
              showNotification={showNotification}
            />
          }
        />
        <Route path="/editpost" element={<Editpost/>}/>
        <Route path="/myprofile" element={<MyProfile user={user} />} />
        <Route path="/edituser" element={<Edituser user={user}/>} />
        <Route path="/addpost" element={<Addpost />} />
        {/* <Route path='/users' element={<Users/>}/> */}
        {/* <Route path='/login' element={<LoginForm/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}
