import { useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import React from "react";
import Resizable from "./resizable";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { Bundle } from "../state/reducers/bundlesReducer";
interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle: Bundle | undefined = useTypedSelector((state) => {
    let bundles = state.bundles;
    let bundle = bundles
      ? bundles[cell.id] !== undefined
        ? bundles[cell.id]
        : undefined
      : undefined;
    return bundle;
  });

  useEffect(() => {
    const runTimer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 1500);

    return () => {
      clearTimeout(runTimer);
    };
  }, [cell]);

  useEffect(() => {
    const fmtTimer = setTimeout(async () => {
      const unformatted: string = cell.content;
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
    }, 3000);

    return () => {
      clearTimeout(fmtTimer);
    };
  });

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        {(bundle && <Preview code={bundle.code} err={bundle.err} />) || (
          <Preview code="" err="" />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
