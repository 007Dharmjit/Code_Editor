/* eslint-disable react/prop-types */
"use client";
import { createContext, useState, useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";

// Create a context for the authentication state
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null); 
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState(""); 

  // Check for token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUserData(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    const decoded = jwt_decode(token);
    setUserData(decoded);
  };

  const logout = async (userId) => {
    try {
      // Call the logout API
      await axios.post("http://localhost:3001/logout", { userId });
  
      // Clear local storage and user state
      localStorage.removeItem("authToken");
      setUserData(null); // Assuming you have a state for user data
      toast.success("Logged out successfully", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  
  //Create a folder in Database
  const CreateFol = (e) => {
    e.preventDefault();
    if (!folderName.trim()) {
      toast.warn("Please enter a valid folder name", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      axios
        .post("http://localhost:3001/folder", {
          folderName,
          userId: userData.id,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Folder Created Successfully", {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            // Directly update folders state with the new folder data
            setFolders((prevFolders) => [...prevFolders, res.data]);
            setFolderName(""); // Reset folder name input
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error("Folder with this name already exists", {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          } else {
            toast.error("Something went wrong. Please try again.", {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        });
    } catch (error) {
      toast.error(error, "Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setFolderName("");
  };

  // Function to fetch folders from the server
  const fetchFolders = async () => {
    setFolders([]);
    if (userData?.id) {
      try {
        axios
          .post("http://localhost:3001/folders", { userId: userData.id })
          .then((res) => {
            setFolders(res.data);
          });
      } catch (err) {
        console.error("Error fetching folders:", err);
      }
    }
  };

  const deleteFolder = (folder_id, userId) => {
    try {
      axios
        .delete(
          `http://localhost:3001/deleteFolder?folder_id=${folder_id}&userId=${userId}`
        )

        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message, {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
          fetchFolders();
        })
        .catch((error) => {
          toast.error(error, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    } catch (error) {
      toast.error(error, "Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        deleteFolder,
        fetchFolders,
        folders,
        setFolders,
        CreateFol,
        folderName,
        setFolderName,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
