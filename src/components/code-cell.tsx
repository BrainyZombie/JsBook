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
import { useTypedSelector } from "../hooks/use-typed-selector";
interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundles = useTypedSelector((state) => {
    return state.bundles[cell.id];
  });
  console.log(bundles);

  let runTimer: any;
  let fmtTimer: any;
  const onChange = async (value: string) => {
    if (runTimer) {
      clearTimeout(runTimer);
    }
    runTimer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
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
        {/* <Preview code={code} err={err} /> */}
      </div>
    </Resizable>
  );
};

export default CodeCell;
