import { useEffect, useReducer } from "react";
import {
  DEFAULT_SCORE,
  DEFAULT_GAME_DATA,
  DEFAULT_CUR_LEFT,
  DEFAULT_CUR_TOP
} from "../utils/contants";
import { getRandomSquares } from "../utils/game";
import reducer, { IAction } from "./reducer";

function useCanvasHooks(): [
  {
    gameData: number[][];
    next: [number, number];
    score: number;
    current: [number, number];
    curTop: number;
    curLeft: number;
    gameOver: boolean
  },
  React.Dispatch<IAction>
] {
  const [state, dispatch] = useReducer(reducer, {
    gameData: DEFAULT_GAME_DATA,
    next: getRandomSquares(),
    score: DEFAULT_SCORE,
    current: getRandomSquares(),
    curLeft: DEFAULT_CUR_LEFT,
    curTop: DEFAULT_CUR_TOP,
    gameOver: false
  });

  useEffect(() => {
    const handleKeypress = (e: KeyboardEvent) => {
      const keycode = e.keyCode;
      switch (keycode) {
        case 37:
          dispatch({ type: "HANDLE_KEYLEFT" });
          break;
        case 38:
          dispatch({ type: "HANDLE_KEYUP" });
          break;
        case 39:
          dispatch({ type: "HANDLE_KEYRIGHT" });
          break;
        case 32:
        case 40:
          dispatch({ type: "HANDLE_KEYDOWN" });
          break;

        default:
          break;
      }
    };
    document.addEventListener("keydown", e => handleKeypress(e), false);
    return document.removeEventListener(
      "keydown",
      e => handleKeypress(e),
      false
    );
  }, []);

  return [state, dispatch];
}

export default useCanvasHooks;
