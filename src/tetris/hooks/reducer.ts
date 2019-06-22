import {
  handleKeyUp,
  handleKeyDown,
  handleKeyLeft,
  handleKeyRight,
  handleReRender
} from '../utils/game';
import produce from 'immer';

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

const reducer = (state: IState, action: IAction) =>
  produce(state, draft => {
    switch (action.type) {
      case 'RERENDER-GAME':
        return handleReRender(draft, action);
      case 'HANDLE_KEYUP':
        return handleKeyUp(draft, action);
      case 'HANDLE_KEYLEFT':
        return handleKeyLeft(draft, action);
      case 'HANDLE_KEYRIGHT':
        return handleKeyRight(draft, action);
      case 'HANDLE_KEYDOWN':
      case 'AUTO_DOWN':
        return handleKeyDown(draft, action);
      default:
        return;
    }
  });

export default reducer;
