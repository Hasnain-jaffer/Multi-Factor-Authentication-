import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register, loginUser } from "../service/authApi";

const LoginForm = ({onLoginSuccess}) => {
  const [isRegister, setisRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
      e.preventDefault();

    try {
      const { data } = await register(username, password);
      setisRegister(false);
      setMessage(data.message);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setError("");
    } catch (error) {
      console.log("The Error is :", error.message);
      setError("Something went wrong during the user registration!");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setMessage("");
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser(username, password);
      setMessage(data.message);
      setUsername("");
      setPassword("");
      setError("");
      onLoginSuccess(data)
    } catch (error) {
      console.log("The Error is :", error.message);
      setUsername("");
      setPassword("");
      setError("Invalid Login Credentials!");
      setMessage("");
    }


  };
  
  const handleRegisterToggle = () => {
    setisRegister(!isRegister);
    setError("");
    setMessage("");
  };

  return (
    <form
      onSubmit={isRegister ? handleRegister : handleLogin}
      className="bg-blue-300 rounded-lg shadow-md w-full max-w-sm mx-auto text-black"
    >
      <div className="pt-6">
        <h2 className="text-4xl text-gray-800 text-center font-bold">
          {isRegister ? "Create Account" : "Login"}
        </h2>
      </div>
      <hr className="text-gray-800 mt-6 mb-6" />
      <p className="text-gray-800 text-center text-lg font-light">
        {isRegister
          ? "Looks like you are new here!"
          : "we are glad to see you again!"}
      </p>
      <div className="p-6">
        <div className="mb-4">
          <label htmlFor="username" className="text-gray-700 text-sm">
            Username
          </label>
          <input
            label="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="w-full p-2 border rounded mt-2"
            placeholder="Enter username"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-gray-700 text-sm">
            Password
          </label>
          <input
            label="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full p-2 border rounded mt-2"
            placeholder="Enter Password"
            required
          />
        </div>
        {isRegister ? (
          <div className="mb-4">
            <label htmlFor="Confirm Password" className="text-gray-700 text-sm">
              Confirm Password
            </label>
            <input
              label="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="w-full p-2 border rounded mt-2"
              placeholder="Enter Password Again"
              required
            />
          </div>
        ) : (
          ""
        )}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {message && <p className="text-green-600 text-sm mb-3">{message}</p>}

        <button className="w-full bg-blue-500 text-white py-2 rounded-md cursor-pointer mb-1">
          {isRegister ? "Create Account" : "Login"}
        </button>
        <div>
          <p className="pt-4 text-center text-gray-600 text-sm">
            {isRegister
              ? "Already have an account? "
              : "Don't have an account? "}
            <Link
              to=""
              onClick={handleRegisterToggle}
            >
              {isRegister ? "Login" : "Create Account"}{" "}
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
