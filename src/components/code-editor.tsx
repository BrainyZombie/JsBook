import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    console.log(getValue());
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };
  return (
    <MonacoEditor
      editorDidMount={onEditorDidMount}
      value={initialValue}
      height="500px"
      language="javascript"
      theme="dark"
      options={{
        wordWrap: "on",
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
