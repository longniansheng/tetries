import React, { CSSProperties, useCallback } from "react";
import { IAction } from "../hooks/reducer";

const style: CSSProperties = {
  position: "absolute",
  top: "320px",
  left: "220px"
};
interface IProps {
  dispatch: React.Dispatch<IAction>;
}

export default function Reset({ dispatch }: IProps) {
  const handleClick = useCallback(() => {
    dispatch({ type: "RERENDER-GAME" });
  }, []);
  return (
    <button style={style} onClick={handleClick}>
      重新开始
    </button>
  );
}
