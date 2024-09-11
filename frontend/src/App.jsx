import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import ActiveUsers from "./components/activeUser/ActiveUsers";
import SignUp from "./components/signUp/Signup";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/act" element={<ActiveUsers />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
