import { useOnDraw } from "../hooks/CanvasHook";

interface ICanvasProps {
  width: number | string;
  height: number | string;
  children?: React.ReactNode;
}

const Canvas = ({ width, height, children }: ICanvasProps) => {
  function onDraw(
    ctx: CanvasRenderingContext2D,
    point: { x: number; y: number },
    previousPoint: { x: number; y: number } | null
  ) {
    if (ctx && point) {
      drawLine(previousPoint, point, ctx, "#000000", 2);
    }
  }

  function drawLine(
    start: { x: number; y: number } | null,
    end: { x: number; y: number },
    ctx: CanvasRenderingContext2D,
    color: string,
    width: number
  ) {
    start = start ?? end;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, width / 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  const setCanvasRef = useOnDraw(onDraw);

  return (
    <canvas
      className="rounded-lg"
      width={width}
      height={height}
      ref={setCanvasRef}
    />
  );
};

export default Canvas;
