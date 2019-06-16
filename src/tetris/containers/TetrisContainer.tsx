import React, { CSSProperties } from "react";
import Game from "../components/Game";
import Score from "../components/Score";
import Next from "../components/Next";
import useCanvasHooks from "../hooks/useCanvasHooks";

const style: CSSProperties = {
  position: "relative"
};

export default function TetrisContainer() {
  const [
    { gameData, next, score, current, curTop, curLeft },
    dispatch
  ] = useCanvasHooks();
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
    </div>
  );
}
