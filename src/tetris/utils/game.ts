import { IState, IAction } from "../hooks/reducer";
import {
  // DEFAULT_SCORE,
  // DEFAULT_GAME_DATA,
  DEFAULT_CUR_LEFT,
  DEFAULT_CUR_TOP,
  squares
} from "./contants";

export function handleKeyUp(state: IState, action: IAction) {
  return {
    ...state
  };
}

export function handleKeyDown(state: IState, action: IAction) {
  return handleAutoDown(state, action);
}

export function handleKeyLeft(state: IState, action: IAction) {
  const { gameData, current, curLeft, curTop } = state;
  const cur = squares[current[0]][current[1]];
  let canMoveLeft = true;
  for (let i = 0; i < cur.length; i++) {
    if (!canMoveLeft) {
      break;
    }
    for (let j = 0; j < cur[0].length; j++) {
      if (cur[i][j] && (curLeft + j === 0 || gameData[curTop + i - 1][curLeft + j - 1])) {
        canMoveLeft = false;
        break;
      }
    }
  }
  return {
    ...state,
    curLeft: canMoveLeft ? curLeft - 1 : curLeft
  };
}

export function handleKeyRight(state: IState, action: IAction) {
  const { gameData, current, curLeft, curTop } = state;
  const cur = squares[current[0]][current[1]];
  let canMoveRight = true;
  for (let i = 0; i < cur.length; i++) {
    if (!canMoveRight) {
      break;
    }
    for (let j = 0; j < cur[0].length; j++) {
      if (cur[i][j] && (curLeft + j + 1 === gameData[0].length || gameData[curTop + i + 1][curLeft + j])) {
        canMoveRight = false;
        break;
      }
    }
  }
  return {
    ...state,
    curLeft: canMoveRight ? curLeft + 1 : curLeft
  };
}

export function handleAutoDown(state: IState, action: IAction) {
  const { current, gameData, curTop, curLeft, next } = state;

  let isEnd = false;
  let gameOver = false;
  let pos: [number, number] = [0, 0];
  const cur = squares[current[0]][current[1]];

  for (let i = cur.length - 1; i >= 0; i--) {
    if (isEnd) {
      break;
    }
    for (let j = 0; j < cur[0].length; j++) {
      // 如果落到最下方或者碰到了障碍物，停止继续下沉，生成新的方块
      if (
        cur[i][j] &&
        ((i + 1) * 20 + curTop * 20 >= 400 || gameData[curTop + i + 1][curLeft + j])
      ) {
        isEnd = true;
        if (curTop === 0) {
          gameOver = true;
        }
        pos = [curTop, curLeft];
        break;
      }
    }
  }

  return {
    ...state,
    current: isEnd ? next : current,
    next: isEnd ? getRandomSquares() : next,
    curTop: isEnd ? DEFAULT_CUR_TOP : curTop + 1,
    curLeft: isEnd ? DEFAULT_CUR_LEFT : curLeft,
    gameData: isEnd ? genGameData(cur, gameData, pos) : gameData,
    gameOver
  };
}

export function getRandomSquares(): [number, number] {
  const sIdx = Math.floor(Math.random() * squares.length)
  const temp = squares[sIdx];
  const cIdx = Math.floor(Math.random() * temp.length);

  return [sIdx, cIdx]
}

export function genGameData(
  current: number[][],
  gameData: number[][],
  pos: [number, number]
) {
  const result = [...gameData];
  for (let i = 0; i < current.length; i++) {
    for (let j = 0; j < current[0].length; j++) {
      if (current[i][j]) {
        result[pos[0] + i][pos[1] + j] = 1;
      }
    }
  }
  return result;
}
