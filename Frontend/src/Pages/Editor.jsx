// import React from 'react'
import Sidebar from "../components/Sidebar.jsx";
import EditorComponent from "../components/EditorComponent.jsx";
const Editor = () => {
  return (
  <>
   <section className="h-screen w-screen flex overflow-hidden">
        <Sidebar />
        <EditorComponent />
      </section> </>
  )
}

export default Editor