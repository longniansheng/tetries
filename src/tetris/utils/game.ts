import { IState, IAction } from '../hooks/reducer';
import {
  DEFAULT_GAME_DATA,
  DEFAULT_SCORE,
  DEFAULT_CUR_LEFT,
  DEFAULT_CUR_TOP,
  squares
} from './contants';

export function handleReRender(draft: IState, action: IAction) {
  draft.gameData = DEFAULT_GAME_DATA;
  draft.next = getRandomSquares();
  draft.score = DEFAULT_SCORE;
  draft.current = getRandomSquares();
  draft.curLeft = DEFAULT_CUR_LEFT;
  draft.curTop = DEFAULT_CUR_TOP;
  draft.gameOver = false;
  return draft;
}
export function handleKeyUp(draft: IState, action: IAction) {
  const { gameData, current, curLeft, curTop, gameOver } = draft;
  if (gameOver) {
    return draft;
  }
  const [sIdx, cIdx] = current;
  const sData = squares[sIdx];
  const newCIdx = (cIdx + 1) % sData.length;
  const newCurrent = [sIdx, newCIdx] as [number, number];
  const canroate = canRoate(curLeft, curTop, gameData, newCurrent);

  draft.current = canroate ? newCurrent : current;
  return draft;
}

export function handleKeyLeft(draft: IState, action: IAction) {
  const { gameData, current, curLeft, curTop, gameOver } = draft;
  // 如果已经gameOver不再进行其他的操作
  if (gameOver) {
    return draft;
  }
  const cur = squares[current[0]][current[1]];
  let canMoveLeft = true;
  for (let i = 0; i < cur.length; i++) {
    if (!canMoveLeft) {
      break;
    }
    for (let j = 0; j < cur[0].length; j++) {
      if (
        cur[i][j] &&
        (curLeft + j === 0 ||
          (curTop + i > 0 && gameData[curTop + i][curLeft + j - 1]))
      ) {
        canMoveLeft = false;
        break;
      }
    }
  }
  draft.curLeft = canMoveLeft ? curLeft - 1 : curLeft;
  return draft;
}

export function handleKeyRight(draft: IState, action: IAction) {
  const { gameData, current, curLeft, curTop, gameOver } = draft;
  // 如果已经gameOver不再进行其他的操作
  if (gameOver) {
    return draft;
  }
  const cur = squares[current[0]][current[1]];
  let canMoveRight = true;
  for (let i = 0; i < cur.length; i++) {
    if (!canMoveRight) {
      break;
    }
    for (let j = 0; j < cur[0].length; j++) {
      if (
        cur[i][j] &&
        (curLeft + j + 1 === gameData[0].length ||
          (curTop + i > 0 && gameData[curTop + i][curLeft + j + 1]))
      ) {
        canMoveRight = false;
        break;
      }
    }
  }
  draft.curLeft = canMoveRight ? curLeft + 1 : curLeft;
  return;
}

export function handleKeyDown(draft: IState, action: IAction) {
  const { current, gameData, curTop, curLeft, next, score, gameOver } = draft;

  // 如果已经gameOver不再进行其他的操作
  if (gameOver) {
    return draft;
  }

  let isEnd = false;
  let newGameOver = false;
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
        ((i + 1) * 20 + curTop * 20 >= 400 ||
          (curTop + i + 1 >= 0 && gameData[curTop + i + 1][curLeft + j]))
      ) {
        isEnd = true;
        newGameOver = curTop + i <= 0;
        pos = [curTop, curLeft];
        break;
      }
    }
  }

  const { gameData: newGameData, score: newScore } = genGameData(
    isEnd || newGameOver,
    cur,
    gameData,
    pos,
    score
  );

  draft.current = newGameOver ? current : isEnd ? next : current;
  draft.next = newGameOver ? next : isEnd ? getRandomSquares() : next;
  draft.curTop = isEnd ? DEFAULT_CUR_TOP : curTop + 1;
  draft.curLeft = isEnd ? DEFAULT_CUR_LEFT : curLeft;
  draft.gameData = newGameData;
  draft.score = newScore;
  draft.gameOver = newGameOver;
  return draft;
}

export function getRandomSquares(): [number, number] {
  const sIdx = Math.floor(Math.random() * squares.length);
  const temp = squares[sIdx];
  const cIdx = Math.floor(Math.random() * temp.length);

  return [sIdx, cIdx];
}

export function genGameData(
  isEnd: boolean,
  current: number[][],
  gameData: number[][],
  pos: [number, number],
  score: number
) {
  if (!isEnd) {
    return { gameData, score };
  }

  const result = [...gameData];
  for (let i = 0; i < current.length; i++) {
    for (let j = 0; j < current[0].length; j++) {
      if (current[i][j] && pos[0] + i >= 0 && pos[1] + j >= 0) {
        result[pos[0] + i][pos[1] + j] = 1;
      }
    }
  }

  const filteredData = result.filter(item => !item.every(_ => _));
  const filterLine = result.length - filteredData.length;
  if (filterLine !== 0) {
    for (let i = 0; i < filterLine; i++) {
      filteredData.unshift(Array.from({ length: 10 }).map(item => 0));
    }
  }
  const newScore = calcScore(score, filterLine);
  return { gameData: filteredData, score: newScore };
}

export function calcScore(score: number, filterLine: number) {
  if (filterLine === 1) {
    return score + 10;
  } else if (filterLine === 2) {
    return score + 30;
  } else if (filterLine === 3) {
    return score + 60;
  } else if (filterLine === 4) {
    return score + 100;
  } else {
    return score;
  }
}

function canRoate(
  curLeft: number,
  curTop: number,
  gameData: number[][],
  current: [number, number]
): boolean {
  let flag = true;

  const newCurrent = squares[current[0]][current[1]];
  for (let i = 0; i < newCurrent.length; i++) {
    if (!flag) {
      break;
    }
    for (let j = 0; j < newCurrent[0].length; j++) {
      if (
        (newCurrent[i][j] &&
          curTop + i > 0 &&
          curLeft + j > 0 &&
          gameData[curTop + i][curLeft + j]) ||
        (curTop + i > gameData.length || curLeft + j > gameData[0].length)
      ) {
        flag = false;
        break;
      }
    }
  }
  return flag;
}
