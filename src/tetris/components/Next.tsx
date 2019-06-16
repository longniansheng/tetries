import React, { CSSProperties, useRef, useEffect } from "react";
import draw from "../utils/draw";

const style: CSSProperties = {
  width: "80px",
  height: "80px",
  position: "absolute",
  top: "20px",
  left: "220px",
  boxSizing: "border-box",
  background: "#eee",
  border: "1px solid blue"
};

const canvasStyle = {
  height: "100%",
  width: "100%"
};

export default function Next({ next }: { next: number[][] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.height = 80;
      canvasRef.current.width = 80;
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      draw(canvasRef.current, next);
    }
  }, [next]);

  return (
    <div style={style}>
      <canvas style={canvasStyle} ref={canvasRef} />
    </div>
  );
}
