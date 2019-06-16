import React, { CSSProperties } from "react";

const style: CSSProperties = {
  width: "80px",
  height: "80px",
  position: "absolute",
  top: "120px",
  left: "220px"
};

export default function Score({ score }: { score: number }) {
  return <div style={style}> 得分：{score}</div>;
}
