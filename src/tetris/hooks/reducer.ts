import {
  DEFAULT_SCORE,
  DEFAULT_GAME_DATA,
  DEFAULT_CUR_LEFT,
  DEFAULT_CUR_TOP
} from "../utils/contants";
import {
  handleKeyUp,
  handleKeyDown,
  handleKeyLeft,
  handleKeyRight,
  handleAutoDown,
  getRandomSquares
} from "../utils/game";

export interface IState {
  gameData: number[][];
  next: number[][];
  current: number[][];
  score: number;
  curTop: number;
  curLeft: number;
}

export interface IAction {
  type: string;
  payload?: any;
}

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case "RERENDER-GAME":
      return {
        gameData: DEFAULT_GAME_DATA,
        next: getRandomSquares(),
        score: DEFAULT_SCORE,
        current: getRandomSquares(),
        curLeft: DEFAULT_CUR_LEFT,
        curTop: DEFAULT_CUR_TOP
      };
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
