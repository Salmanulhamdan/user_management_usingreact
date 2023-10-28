import { useDispatch } from "react-redux";
import { UserTable } from "../UserTable/UserTable";
import { logoutAdmin } from "../../redux/features/reducer/AdminAuthSlice";

/* eslint-disable jsx-a11y/anchor-is-valid */

const AdminDash = () => {
  const dispatch = useDispatch()


  return (
    <>
      <div className="flex md:flex-row-reverse flex-wrap">
        <div className="w-full md:w-4/5 ">
          <div className="container  pt-32 px-8"> </div>
          <UserTable/>
        </div>
       
        <div className="w-full md:w-1/5 px-2 text-center fixed bottom-0 md:pt-8 md:top-0 md:left-0 h-16 ">
          <div className="md:relative mx-auto lg:float-right lg:px-6">
            <h1 className="text-black ">DASHBOARD</h1>
            

            <ul className="list-reset flex flex-row md:flex-col text-center md:text-left pt-24">

              <li className="mr-3 flex-1">
                <a
                  href="#"
                  className="block py-1 md:py-3 pl-1 align-middle text-gray-800 "
                >
                  <i className="fas fa-link pr-0 md:pr-3"></i>
                  <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                    Users
                  </span>
                </a>
              </li>
              <li className="mr-3 flex-1">
                <a
                  href="#"
                  className="block py-1 md:py-3 pl-1 align-middle text-gray-800"
                >
                  <i className="fas fa-link pr-0 md:pr-3"></i>
                  <span onClick={() => {
                    dispatch(logoutAdmin())
                  }} className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                    Logout
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
   
      </div>
    </>
  );
};

export default AdminDash;
