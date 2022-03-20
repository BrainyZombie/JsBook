import { orderedListCommand } from "@uiw/react-md-editor/lib/cjs/commands";
import React from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
interface CellListProps {}
const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) => {
    if (!cells) return [];
    const { order, data } = cells;
    return order.map((id) => data[id]);
  });

  const renderedCells = cells.map((cell) => (
    <>
      <AddCell nextCellId={cell.id}></AddCell>
      <CellListItem key={cell.id} cell={cell} />
    </>
  ));
  return (
    <div>
      {renderedCells}
      <br />
      <AddCell nextCellId={null} />
    </div>
  );
};

export default CellList;
