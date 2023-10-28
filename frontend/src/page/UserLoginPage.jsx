import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../redux/features/reducer/UserAuthSlice";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const UserLoginPage = () => {
  const loading = useSelector((s) => s.user?.loading);
  const error = useSelector((s) => s.user?.error);
  const data = useSelector((s) => s.user?.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleOnSubmit = async () => {
    try {
      const response = await dispatch(UserLogin(credentials));
      console.log(response);
      if (response.error) {
        throw new Error("Invalid credentials");
      }

      // Display success message
      Swal.fire({
        icon: "success",
        title: "Successfully logged in",
        showConfirmButton: false,
        timer: 1500,
      });

      // Navigate to another page
      navigate("/");
    } catch (error) {
      console.error(error);

      // Display error message
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "Please check your credentials and try again.",
      });
    }
  };

  if (loading) {
    return <h1>Loading</h1>;
  }


  return (
      <div className="container mt-5 ml-5">
          <h1>Sign In</h1><br/>
          <p>Sign into your Account</p><br/>
              <input
                id="email"
                onChange={(e) =>
                  setCredentials((s) => ({ ...s, email: e.target.value }))
                }
                value={credentials.email}
                name="email"
                type="email"
                placeholder="Email"
                required
                
                className="block px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              /><br/>
              <input
                id="password"
                onChange={(e) =>
                  setCredentials((s) => ({ ...s, password: e.target.value }))
                }
                value={credentials.password}
                name="password"
                type="password"
                placeholder="password"
                required
                
                className="block  px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              /><br/>
            <button
              onClick={handleOnSubmit}
              className="block px-4 py-2  font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 sm:text-sm"
            >
              Login
            </button><br/>

          <Link to="/signup" className="mt-3">
            SignUp
          </Link>
        </div>
  );
};
