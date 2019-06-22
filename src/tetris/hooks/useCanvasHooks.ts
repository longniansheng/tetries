import { useEffect, useReducer, useState } from 'react';
import {
  DEFAULT_SCORE,
  DEFAULT_GAME_DATA,
  DEFAULT_CUR_LEFT,
  DEFAULT_CUR_TOP
} from '../utils/contants';
import { getRandomSquares } from '../utils/game';
import reducer, { IAction } from './reducer';
import useInterval from '../hooks/useInterval';

function useCanvasHooks(): [
  {
    gameData: number[][];
    next: [number, number];
    score: number;
    current: [number, number];
    curTop: number;
    curLeft: number;
    gameOver: boolean;
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
          dispatch({ type: 'HANDLE_KEYLEFT' });
          break;
        case 38:
          dispatch({ type: 'HANDLE_KEYUP' });
          break;
        case 39:
          dispatch({ type: 'HANDLE_KEYRIGHT' });
          break;
        case 32:
        case 40:
          dispatch({ type: 'HANDLE_KEYDOWN' });
          break;

        default:
          break;
      }
    };
    document.addEventListener('keydown', e => handleKeypress(e), false);
    return document.removeEventListener(
      'keydown',
      e => handleKeypress(e),
      false
    );
  }, []);

  const [delay, setDelay] = useState(1000);

  useEffect(() => {
    if (state.gameOver) {
      setDelay(0);
    } else if (state.score >= 2000) {
      setDelay(200);
    } else if (state.score >= 1500) {
      setDelay(400);
    } else if (state.score >= 1000) {
      setDelay(600);
    } else if (state.score >= 500) {
      setDelay(800);
    }
  }, [state.gameOver, state.score]);

  useInterval(() => {
    dispatch({ type: 'AUTO_DOWN' });
  }, delay);

  return [state, dispatch];
}

export default useCanvasHooks;
