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
  const [err, setErr] = useState("");
  const [input, setInput] = useState("const a = 1;");

  let runTimer: any;
  let fmtTimer: any;
  const onChange = async (value: string) => {
    if (runTimer) {
      clearTimeout(runTimer);
    }
    runTimer = setTimeout(async () => {
      const output = await bundle(value);
      if (output.error) {
        setCode("");
        setErr(output.error);
      } else {
        setErr("");
        setCode(output.code);
      }
    }, 750);

    if (fmtTimer) {
      clearTimeout(fmtTimer);
    }
    fmtTimer = setTimeout(async () => {
      const unformatted: string = value;
      try {
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
      } catch (err: any) {}
    }, 2000);
  };

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor initialValue={input} onChange={onChange} />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
