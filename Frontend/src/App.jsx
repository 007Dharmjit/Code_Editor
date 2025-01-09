"use client";
// import React from "react";  
import CodeEditorProvider from "./context/CodeEditorContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Loginform from "./components/Auth/Loginform.jsx";
import SignupForm from "./components/Auth/SignupForm.jsx";
import Layout from "./Pages/Layout.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import User from "./Pages/User.jsx";
import Editor from "./Pages/Editor.jsx";
import Problem from "./Pages/Problem.jsx";
import { ToastContainer } from "react-toastify";

const App = () => { 


  return ( 
    <>
     <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    <CodeEditorProvider>
     
     <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/Loginform" element={<Loginform />} />
            <Route path="/User" element={<User />} />
            <Route path="/SignupForm" element={<SignupForm />} /> 
            <Route path="/Problem" element={<Problem />} /> 
            <Route path="/Editor" element={<Editor />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </CodeEditorProvider> </>
  );
};

export default App;
