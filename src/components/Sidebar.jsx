"use client"
import { useRef } from "react";
import { VscNewFile } from "react-icons/vsc";
import PropTypes from "prop-types";

const Sidebar = ({ files, inputVisible, inputValue, setInputVisible, setInputValue, addFile, dataGet }) => {
  // Declare inputRef inside Sidebar
  const inputRef = useRef(null);

  return (
    <div className="bg-neutral-800 tracking-tight w-[200px]">
      <div className="flex justify-between items-center mt-2 px-3 py-1">
        <h2 className="text-[18px] uppercase">FileName</h2>
        <VscNewFile
          className="text-[20px] cursor-pointer"
          onClick={() => {
            setInputVisible(true);
            setTimeout(() => inputRef.current?.focus(), 0); // Focus the input field when the button is clicked
          }}
        />
      </div>
      <div className="px-1 py-2">
        {inputVisible && (
          <input
            ref={inputRef} // Attach ref to the input field
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

Sidebar.propTypes = {
  files: PropTypes.array.isRequired,
  inputVisible: PropTypes.bool.isRequired,
  inputValue: PropTypes.string.isRequired,
  setInputVisible: PropTypes.func.isRequired,
  setInputValue: PropTypes.func.isRequired,
  addFile: PropTypes.func.isRequired,
  dataGet: PropTypes.func.isRequired,
};

export default Sidebar;
