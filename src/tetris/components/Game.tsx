import React, { useRef, useEffect } from "react";
import draw, { drawCurrent } from "../utils/draw";
import { IAction } from "../hooks/reducer";
// import useInterval from "../hooks/useInterval";

const style = {
  width: "200px",
  height: "400px",
  border: "1px solid #aaa",
  borderTop: "none"
};

interface IProps {
  gameData: number[][];
  current: number[][];
  curLeft: number;
  curTop: number;
  dispatch: React.Dispatch<IAction>;
}

export default function Game({
  gameData,
  current,
  curTop,
  curLeft,
  dispatch
}: IProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.height = 400;
      canvasRef.current.width = 200;
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      draw(canvasRef.current, gameData);
      drawCurrent(canvasRef.current, current, curTop, curLeft);
    }
  }, [gameData, current, curTop, curLeft]);

  // useInterval(() => {
  //   dispatch({ type: "AUTO_DOWN" });
  // }, 1000);

  return (
    <div style={style}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%"
        }}
      />
    </div>
  );
}
