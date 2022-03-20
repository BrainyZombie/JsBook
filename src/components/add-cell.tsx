import React from "react";
import { useActions } from "../hooks/use-actions";
interface AddCellProps {
  nextCellId: string | null;
}
const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useActions();

  return (
    <div>
      <button onClick={() => insertCellBefore(nextCellId, "code")}>
        Add Code Cell
      </button>
      <button onClick={() => insertCellBefore(nextCellId, "text")}>
        Add Text Cell
      </button>
    </div>
  );
};

export default AddCell;
