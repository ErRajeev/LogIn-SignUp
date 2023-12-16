import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const onNameChange = (e) => setName(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onOtpChange = (e) => setOtp(e.target.value);

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });

      setMessage("Please check your email for OTP.");
      setShowOtpInput(true); // Show OTP input after successful registration
    } catch (error) {
      setMessage(`Error: ${error.response.data.error}`);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post("http://localhost:5000/otp-verify", {
        email: email,
        token: otp,
      });
      setTimeout(() => {
        setMessage("");
        setShowOtpInput(false);
        navigate("/login");
      }, 2000);
      setMessage(response.data.message);
    } catch (error) {
      setTimeout(() => {
        setMessage("");
      }, 2000);
      setMessage(`Error: ${error.response.data.error}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={onNameChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={onEmailChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleRegister}>
        Register
      </button>
      {message && <p className="mt-3">{message}</p>}
      {showOtpInput && (
        <div className="mb-3">
          <label htmlFor="otp" className="form-label">
            OTP:
          </label>
          <input
            type="text"
            className="form-control"
            id="otp"
            value={otp}
            onChange={onOtpChange}
          />
        </div>
      )}
      {showOtpInput && (
        <button className="btn btn-success" onClick={handleVerifyOTP}>
          Verify OTP
        </button>
      )}
    </div>
  );
};

export default SignUp;
