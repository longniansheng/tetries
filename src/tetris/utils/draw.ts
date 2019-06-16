function draw(canvas: HTMLCanvasElement, cur: number[][]) {
  const context = canvas && canvas.getContext("2d");
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  for (let i = 0; i < cur.length; i++) {
    for (let j = 0; j < cur[0].length; j++) {
      if (cur[i][j] !== 0 && context) {
        context.fillStyle = cur[i][j] === 2 ? "#FF1493" : "#778899";
        context.fillRect(j * 20, i * 20, 20, 20);
      }
    }
  }
}

function drawCurrent(
  canvas: HTMLCanvasElement,
  cur: number[][],
  top: number,
  left: number
) {
  const context = canvas && canvas.getContext("2d");
  // if (context) {
  //   context.clearRect(left, top, 80, 800);
  // }
  for (let i = 0; i < cur.length; i++) {
    for (let j = 0; j < cur[0].length; j++) {
      if (cur[i][j] !== 0 && context) {
        context.fillStyle = "#FF1493";
        context.fillRect((left + j) * 20, (top + i) * 20, 20, 20);
      }
    }
  }
}

export { drawCurrent };

export default draw;
