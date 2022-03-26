import "./code-cell.css";
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
import { nodeModuleNameResolver } from "typescript";
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

  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === "code") {
        cumulativeCode.push(c.content);
      }
      if (c.id === cell.id) {
        break;
      }
    }
    return cumulativeCode;
  });

  console.log(cumulativeCode);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join("\n"));
      return;
    }
    const runTimer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join("\n"));
    }, 1500);

    return () => {
      clearTimeout(runTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode.join("\n"), cell.id, createBundle]);

  // useEffect(() => {
  //   const fmtTimer = setTimeout(async () => {
  //     const unformatted: string = cell.content;
  //     try {
  //       const formatted = prettier
  //         .format(unformatted, {
  //           parser: "babel",
  //           plugins: [parser],
  //           useTabs: false,
  //           semi: true,
  //           singleQuote: true,
  //         })
  //         .replace(/\n$/, "");

  //       updateCell(cell.id, formatted);
  //     } catch (err: any) {}
  //   }, 3000);

  //   return () => {
  //     clearTimeout(fmtTimer);
  //   };
  // }, [cell, updateCell]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
