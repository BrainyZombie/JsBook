import "./text-editor.css";
import MDEditor from "@uiw/react-md-editor";
import React, { useState, useEffect, useRef } from "react";

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const Listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", Listener, { capture: true });
    return () => {
      document.removeEventListener("click", Listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor />
      </div>
    );
  }

  return (
    <div
      className="text-editor"
      onClick={(event) => {
        setEditing(true);
      }}
    >
      <MDEditor.Markdown source={"# Header"} />
    </div>
  );
};

export default TextEditor;
