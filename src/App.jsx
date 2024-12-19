/* eslint-disable no-unused-vars */
"use client"
import  { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import EditorComponent from "./components/EditorComponent";
import { LANGUAGES } from "./data/Language";


const App = () => {
  const [files, setFiles] = useState([]);
  const [selecteddata, setSelectedData] = useState([]);
  const [languageDATA, setLanguageData] = useState({
    name: null,
    language: null,
    value: null,
    language_version: null,
  });
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const [FileName, setFileName] = useState("")
  const editorRef = useRef(null);
  const [showData, setshowData] = useState(true)

  //disable the editor on cross icone click
   const disableData = ()=>{
    setshowData((prev) => !prev);
   }


  const dataGet = (e) => {
    showData ? null : disableData() ;
    const nameAttr = e.target.attributes.name;
    if (!nameAttr) return; 
    const name = nameAttr.value;
    setFileName(name)
    const objData = LANGUAGES[name.split(".")[1]];
    setLanguageData({
      name: name,
      language: objData?.language || "txt",
      value: objData?.value || "Current file does not have any Extention so by default it's extention is txt. ",
      language_version:objData?.language_version,
    });
  };

  const showInput = () => {
    setInputVisible(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const addFile = () => {
    if (inputValue.trim() && !files.includes(inputValue.trim())) {
      setFiles((prev) => [...prev, inputValue.trim()]);
      setFileName(inputValue)
      const fileExtension = inputValue.trim().split(".").pop();
      const objData = LANGUAGES[fileExtension];
      setLanguageData({
        name: inputValue.trim(),
        language: objData?.language || "txt",
        value: objData?.value || "Current file does not have any Extention so by default it's extention is txt. ",
        language_version:objData?.language_version,
      });
      setInputValue("");
    }
    setInputVisible(false);
  };

     // // Add event listener for Ctrl+Shift+F to create a new file
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.shiftKey && event.ctrlKey && event.key === "F") {
        showInput();
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

      // Function to handle mounting of the editor
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <div>
      <section className="h-screen w-screen flex overflow-hidden">
        <Sidebar
          files={files}
          inputVisible={inputVisible}
          inputValue={inputValue}
          setInputVisible={setInputVisible}
          setInputValue={setInputValue}
          addFile={addFile}
          dataGet={dataGet}
        />
        <EditorComponent
        FileName={FileName}
          languageDATA={languageDATA}
          editorRef={editorRef} 
          handleEditorDidMount={handleEditorDidMount}
          disableData={disableData}
          showData={showData}
        />
      </section>
      
    </div>
  );
};


export default App;
