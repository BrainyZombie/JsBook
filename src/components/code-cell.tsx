import { useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";
import React from "react";
import Resizable from "./resizable";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const { updateCell } = useActions();

  let runTimer: any;
  let fmtTimer: any;
  const onChange = async (value: string) => {
    if (runTimer) {
      clearTimeout(runTimer);
    }
    runTimer = setTimeout(async () => {
      console.log("Bundling");
      const output = await bundle(value);
      console.log(output);

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

        updateCell(cell.id, formatted);
      } catch (err: any) {}
    }, 2000);
  };

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor initialValue={cell.content} onChange={onChange} />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
