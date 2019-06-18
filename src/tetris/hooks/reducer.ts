import {
  handleKeyUp,
  handleKeyDown,
  handleKeyLeft,
  handleKeyRight,
  handleAutoDown,
  handleReRender
} from "../utils/game";

export interface IState {
  gameData: number[][];
  next: [number, number];
  current: [number, number];
  score: number;
  curTop: number;
  curLeft: number;
  gameOver: boolean;
}

export interface IAction {
  type: string;
  payload?: any;
}

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case "RERENDER-GAME":
      return handleReRender(state, action);
    case "HANDLE_KEYUP":
      return handleKeyUp(state, action);
    case "HANDLE_KEYLEFT":
      return handleKeyLeft(state, action);
    case "HANDLE_KEYRIGHT":
      return handleKeyRight(state, action);
    case "HANDLE_KEYDOWN":
      return handleKeyDown(state, action);
    case "AUTO_DOWN":
      return handleAutoDown(state, action);
    default:
      return { ...state };
  }
}

export default reducer;
