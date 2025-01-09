import { Outlet, Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx"; // Import the auth context
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";

const Layout = () => {
  const { userData, logout } = useAuth(); //  user data and logout function
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(); // Call the logout function to clear user data and token
    toast("Logout Success", {
      position: "top-center",
      autoClose: 1500, // Display for 2 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  
    // Navigate after the toast finishes displaying
    setTimeout(() => {
      navigate("/"); // Navigate to the home page
    }, 1502); // Match the autoClose time of the toast
  };

  const [isOpen, setIsOpen] = useState(false); // State to control sidebar visibility

  return (
    <>
      {" "}
      <div className="bg-zinc-900 w-full text-white h-fit py-3 px-2 ">
        <nav className="flex justify-end">
          <div className="px-5">
            <Link to="/" className="text-xl ml-3 cursor-pointer">
              Home
            </Link> 
            <Link to="/Problem" className="text-xl ml-3 cursor-pointer">
            Problems
            </Link>
            {userData ? (
              <>
                <button
                  className="text-xl ml-3 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/Loginform" className="text-xl ml-3 cursor-pointer">
                Login
              </Link>
            )}
          </div>
          
          <div className="relative h-10 w-10 ">
            {/* Menu Icon */}
            {!isOpen && (
              <button
                onClick={() => setIsOpen(!isOpen)} // Hide the button when clicked
                className="absolute top-1 z-50 text-3xl text-red"
              >
                <CgProfile color="white" size={25} />
              </button>
            )}

            {/* Sidebar */}
            <div
              className={`fixed top-0 right-0 z-40 bg-gray-800 text-white h-full w-64 transform transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}
              onClick={() => {
                setIsOpen(false); 
              }} 
              onMouseLeave={() => {
                setIsOpen(false);
              }
              }
            >
              <div className="p-4">
                <h2 className="text-xl text-teal-400 font-semibold">Profile</h2>
                <ul className="mt-4">
                  <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">
                    Folders
                  </li>
                  <Link to="/User">
                    <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">
                      Account
                    </li>
                  </Link>
                  <Link to="/Problem">
                    <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">
                      Problems
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
