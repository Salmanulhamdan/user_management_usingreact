import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthAdmin } from "../redux/features/reducer/AdminAuthSlice";
import authAxios from "../redux/features/api/authApi";
import { login } from "../utils/constants";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      email: e.target.adminemail.value,
      password: e.target.password.value,
    });

    authAxios
      .post(login, body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 200) {
          const decodedToken = jwtDecode(response?.data?.access);
          console.log(decodedToken);
          if (decodedToken.is_superuser) {

            localStorage.setItem("authTokens", JSON.stringify(response?.data));

            dispatch(
              setAuthAdmin({
                adminAuthToken: JSON.stringify(response?.data),
                admin: jwtDecode(response?.data?.access),
              })
            );

            Swal.fire({
              icon: "success",
              title: "Successfully logged in",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
        navigate("/admin")
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Invalid Credentials",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/login")
      });
  };

  return (
      <div className="container mt-5 ml-5">
        <h2 className="">
          Admin Login
        </h2><br/>
        <div className="">
          <form onSubmit={handleAdminLogin}>
            <div className="mb-4">
              <input
                type="email"
                name="adminemail"
                className=" px-3 py-2 mt-1 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                className=" px-3 py-2 mt-1 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className=" px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
  );
};

export default AdminLogin;
