"use client";
import React, { useContext , useEffect } from "react";
import { VscNewFile } from "react-icons/vsc";
import { CodeEditorContext } from "../context/CodeEditorContext";

const Sidebar = () => {
  const {
    files,
    inputVisible,
    inputValue,
    setInputVisible,
    setInputValue,
    addFile,
    dataGet,
  } = useContext(CodeEditorContext);
   
   // Add event listener for Ctrl + Shift + F to show input field
   useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === "F") {
        setInputVisible(true); 
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="bg-neutral-800 tracking-tight w-[200px]">
      <div className="flex justify-between items-center mt-2 px-3 py-1">
        <h2 className="text-[18px] uppercase">FileName</h2>
        <VscNewFile
          className="text-[20px] cursor-pointer"
          onClick={() => {
            setInputVisible(true);
            setTimeout(() => document.getElementById("file-input")?.focus(), 0);
          }}
        />
      </div>
      <div className="px-1 py-2">
        {inputVisible && (
          <input
            id="file-input"
            className="bg-neutral-700 text-white caret-white px-3 py-2 w-full rounded focus:outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={addFile}
            onKeyDown={(e) => e.key === "Enter" && addFile()}
          />
        )}
        {files.map((file, index) => (
          <h3
            key={index}
            onClick={dataGet}
            name={file}
            className="cursor-pointer text-white"
          >
            {file}
          </h3>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
