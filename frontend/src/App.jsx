import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import ActiveUsers from "./components/activeUser/ActiveUsers";
import SignUp from "./components/signUp/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/act" element={<ActiveUsers />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
