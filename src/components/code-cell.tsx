import { useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";
import React from "react";
import Resizable from "./resizable";
import prettier from "prettier";
import parser from "prettier/parser-babel";

const CodeCell = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("const a = 1;");

  let runTimer: any;
  let fmtTimer: any;
  const onChange = async (value: string) => {
    if (runTimer) {
      clearTimeout(runTimer);
    }
    runTimer = setTimeout(async () => {
      const output = await bundle(value);
      setCode(output);
    }, 750);

    if (fmtTimer) {
      clearTimeout(fmtTimer);
    }
    fmtTimer = setTimeout(async () => {
      const unformatted: string = value;
      const formatted = prettier
        .format(unformatted, {
          parser: "babel",
          plugins: [parser],
          useTabs: false,
          semi: true,
          singleQuote: true,
        })
        .replace(/\n$/, "");

      setInput(formatted);
    }, 2000);
  };

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor initialValue={input} onChange={onChange} />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
