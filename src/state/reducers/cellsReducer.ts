import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cells";
import produce from "immer";
interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      break;
    case ActionType.DELETE_CELL:
      delete state.data[action.payload.id];
      state.order = state.order.filter((id) => id !== action.payload.id);
      break;
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.indexOf(action.payload.id);
      const targetIndex =
        direction === "up"
          ? Math.max(index - 1, 0)
          : Math.min(index + 1, state.order.length - 1);
      if (index === targetIndex) return;

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      break;
    case ActionType.INSERT_CELL_BEFORE:
      const cell: Cell = {
        content: "",
        type: action.payload.type,
        id: randomID(),
      };

      state.data[cell.id] = cell;
      const idx = action.payload.id
        ? state.order.indexOf(action.payload.id)
        : -1;
      if (idx === -1) {
        state.order.push(cell.id);
      } else {
        state.order.splice(idx, 0, cell.id);
      }
      break;
    default:
      break;
  }
  return state;
});

const randomID = () => {
  return Math.random().toString(36).substring(2, 7);
};

export default reducer;
