/* eslint-disable react/prop-types */
// import React from 'react'
"use client"

import { useState } from "react";
import executeCode from "../API/executecode";

const Output = ({ editorRef ,languageDATA }) => {
  // const [sourceCode, setsourceCode] = useState("");
 const [outputData, setoutputData] = useState(null)



 async function runCode() {
  const currentCode = editorRef.current.getValue(); // Get the current code from the editor
  if (!currentCode) return; // Check the code directly

  try {
    const { run: result } = await executeCode(languageDATA, currentCode);
    setoutputData(result.output); // Update the output data with the result
  } catch (error) {
    console.log(error);
  }
}

  return (
    <>
      <div className="w-1/2">
        <button
          className="text-zinc-200 mt-3 ml-2 hover:text-green-600 backdrop-blur-lg bg-gradient-to-tr from-transparent via-[rgba(121,121,121,0.16)] to-transparent rounded-md py-2 px-6 shadow hover:shadow-green-600 duration-700"
          onClick={runCode}
        >
          Run
        </button>
        <div className="my-3 mx-4 border-2 border-red-300 h-[100vh]">
          <p className="m-3">{outputData?outputData:'Click "Run" to see output'}</p> {/* Display the code here */}
        </div>
      </div>
    </>
  );
};

export default Output;
