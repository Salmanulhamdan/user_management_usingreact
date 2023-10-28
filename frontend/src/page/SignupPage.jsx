import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UserSignup } from "../redux/features/reducer/UserAuthSlice";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {

  const navigate = useNavigate()

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    const credentials = {
      name: name,
      email: email,
      password: password,
    };
    console.log(credentials);

    dispatch(UserSignup(credentials));
    navigate("/")
  };

  return (
    <div className="container mt-5 ml-5">
      <h1>Sign Up</h1><br/>
      <p>Create your Account</p><br/>
        
        <form
          className=""
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-6">
            <input
              className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              SignUp
            </button>
          </div>
        </form>
      </div>
  );
};

export default SignupPage;
