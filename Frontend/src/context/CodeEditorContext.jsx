"use client";
import React, { createContext, useState, useRef } from "react";
import { LANGUAGES } from "../data/Language";

export const CodeEditorContext = createContext();

const CodeEditorProvider = ({ children }) => {
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
  const [FileName, setFileName] = useState("");
  const editorRef = useRef(null);
  const [showData, setShowData] = useState(true);

  const disableData = () => {
    setShowData((prev) => !prev);
  };

  const dataGet = (e) => {
    showData ? null : disableData();
    const nameAttr = e.target.attributes.name;
    if (!nameAttr) return;
    const name = nameAttr.value;
    setFileName(name);
    const objData = LANGUAGES[name.split(".")[1]];
    setLanguageData({
      name: name,
      language: objData?.language || "txt",
      value:
        objData?.value ||
        "Current file does not have any extension || Extention is not Supported in this editor || Invalid Extention, so by default, it's extension is .txt",
      language_version: objData?.language_version,
    });
  };

  const addFile = () => {
    if (inputValue.trim() && !files.includes(inputValue.trim())) {
      setFiles((prev) => [...prev, inputValue.trim()]);
      setFileName(inputValue);
      const fileExtension = inputValue.trim().split(".").pop();
      const objData = LANGUAGES[fileExtension];
      setLanguageData({
        name: inputValue.trim(),
        language: objData?.language || "txt",
        value:
          objData?.value ||
          "Current file does not have any extension || Extention is not Supported in this editor || Invalid Extention, so by default, it's extension is .txt",
        language_version: objData?.language_version,
      });
      setInputValue("");
    }
    setInputVisible(false);
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <CodeEditorContext.Provider
      value={{
        files,
        setFiles,
        selecteddata,
        setSelectedData,
        languageDATA,
        setLanguageData,
        inputVisible,
        setInputVisible,
        inputValue,
        setInputValue,
        FileName,
        setFileName,
        editorRef,
        showData,
        setShowData,
        disableData,
        dataGet,
        addFile,
        handleEditorDidMount,
      }}
    >
      {children}
    </CodeEditorContext.Provider>
  );
};

export default CodeEditorProvider;
