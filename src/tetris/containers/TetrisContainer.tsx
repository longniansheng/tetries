import React, { CSSProperties, useEffect } from "react";
import Game from "../components/Game";
import Score from "../components/Score";
import Next from "../components/Next";
import Reset from "../components/Reset";
import useCanvasHooks from "../hooks/useCanvasHooks";

const style: CSSProperties = {
  position: "relative"
};

export default function TetrisContainer() {
  const [
    { gameData, next, score, current, curTop, curLeft, gameOver },
    dispatch
  ] = useCanvasHooks();

  useEffect(() => {
    if (gameOver) {
      confirm("游戏结束！");
    }
  }, [gameOver]);
  return (
    <div style={style}>
      <Game
        gameData={gameData}
        current={current}
        curTop={curTop}
        curLeft={curLeft}
        dispatch={dispatch}
      />
      <Next next={next} />
      <Score score={score} />
      <Reset dispatch={dispatch} />
    </div>
  );
}
