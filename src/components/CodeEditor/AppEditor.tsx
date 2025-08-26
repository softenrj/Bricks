"use client"
import React from 'react'
import Editor from "@monaco-editor/react"
import EditorNavBar from './EditorNavBar'

function AppEditor() {
  return (
    <div>
      <EditorNavBar />
      <Editor
      height="100%"
      defaultLanguage="javascript"
      defaultValue={`console.log("Hello World")`}
      theme="vs-dark"
    />
    </div>
  )
}

export default AppEditor