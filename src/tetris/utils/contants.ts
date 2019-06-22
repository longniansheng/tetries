import square1 from "./square1";
import square2 from "./square2";
import square3 from "./square3";
import square4 from "./square4";
import square5 from "./square5";
import square6 from "./square6";
import square7 from "./square7";

const DEFAULT_SCORE = 0;
const DEFAULT_GAME_DATA = Array.from({ length: 20 }).map(() => {
  const arr = Array.from({ length: 10 }).map(() => 0);
  return [...arr];
});

const DEFAULT_CUR_LEFT = 4;
const DEFAULT_CUR_TOP = -4;

const squares = [square1, square2, square3, square4, square5, square6, square7];

export {
  DEFAULT_SCORE,
  DEFAULT_GAME_DATA,
  DEFAULT_CUR_LEFT,
  DEFAULT_CUR_TOP,
  squares
};
