import "./cell-list.css";
import React, { Fragment } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) => {
    if (!cells) return [];
    const { order, data } = cells;
    return order.map((id) => data[id]);
  });

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));
  return (
    <div className="cell-list">
      <br />
      <AddCell
        prevCellId={null}
        forceVisible={cells.length === 0 ? true : false}
      />
      {renderedCells}
    </div>
  );
};

export default CellList;
