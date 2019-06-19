import {
  handleKeyUp,
  handleKeyDown,
  handleKeyLeft,
  handleKeyRight,
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

const reducer = (state: IState, action: IAction) => {
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
    case "AUTO_DOWN":
      return handleKeyDown(state, action);
    default:
      return { ...state };
  }
}

export default reducer;
