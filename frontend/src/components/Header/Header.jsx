import React from "react";
import { Link } from "react-router-dom";
import { useDispatch ,useSelector } from "react-redux";
import { logout } from "../../redux/features/reducer/UserAuthSlice";

export const Header = () => {
  const state = useSelector(state => state)
  const access = state.user?.data?.access
  console.log("state consoled in header",access)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light mt-3"
    style={{
      display: `flex`,
    }}
    >
      {/* <h1>Title</h1> */}
      <div className="nav-items">
        <ul className="flex pt-4">
          <li className="px-8">
            <Link to="/">Home</Link>
          </li>
          
          {/* <li className="px-8">
            <Link to="/profile">Profile</Link>
          </li> */}
        </ul>
      </div>
      <div className="flex items-center">
        {access ? (
          <button onClick={() => dispatch(logout())} className="mr-2 mt-2 px-4 py-2 rounded text-black">
            Logout
          </button>
        ) : (
          <Link to="/login" className="mr-2 mt-2 px-4 py-2 rounded text-black">
            Login
          </Link>
        )}
      </div>
      
    </div>
     
  );
};
