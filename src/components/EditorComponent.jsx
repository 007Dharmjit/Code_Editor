/* eslint-disable react/prop-types */
"use client";
import Editor from "@monaco-editor/react";
import PropTypes from "prop-types";
import Output from "./output";
import { RxCross2 } from "react-icons/rx";

const EditorComponent = ({
  languageDATA,
  handleEditorDidMount,
  FileName,
  editorRef,
  disableData,
  showData
}) => {


  return (
    <div className="bg-[#1e1e1e] flex flex-row h-full w-full">
      
      { showData && languageDATA?.name ? (
        <>
          <div className="inputcomponent w-1/2">
            <div className="name mt-3 ml-2 py-2 px-6 flex flex-row gap-2"><p>{FileName}</p>  
            <div className="pt-1 cursor-pointer" onClick={disableData}>
            <RxCross2 />
            </div>
            </div>

            <div className="my-3 mx-4">
              <Editor
                theme="vs-dark"
                onMount={handleEditorDidMount}
                path={languageDATA?.name || "default"}
                defaultLanguage={languageDATA?.language || "txt"}
                defaultValue={languageDATA?.value || "plaintext"}
                height="100vh"
              />
            </div>
          </div>
          <Output editorRef={editorRef} languageDATA={languageDATA} />
        </>
      ) : (
        <div className="h-full w-full flex justify-center items-center flex-col  text-[#131316] cursor-default">
          <h1 className="font-semibold text-2xl flex">
            Create file <p className="bg-zinc-800 mx-2 px-2 rounded ">Ctrl</p>{" "}
            + <p className="bg-zinc-800 mx-2 px-2 rounded ">Shift</p>{" "}
            + <p className="bg-zinc-800 px-2 rounded mx-2">f</p>
          </h1>
          <h1 className="font-semibold  text-9xl">Code With D</h1>
        </div>
      )}
    </div>
  );
};

EditorComponent.propTypes = {
  languageDATA: PropTypes.shape({
    name: PropTypes.string,
    language: PropTypes.string,
    value: PropTypes.string,
  }),
  FileName: PropTypes.string,
  handleEditorDidMount: PropTypes.func.isRequired,
};

export default EditorComponent;
