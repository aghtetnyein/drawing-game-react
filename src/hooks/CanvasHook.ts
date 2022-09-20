import { useEffect, useRef } from "react";

const useOnDraw = (
  onDraw: (
    ctx: CanvasRenderingContext2D,
    point: { x: number; y: number },
    previousPointRef: { x: number; y: number } | null
  ) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);

  const mouseMoveListenerRef = useRef<((e: MouseEvent) => void) | null>(null);
  const mouseDownListenerRef = useRef<((e: MouseEvent) => void) | null>(null);
  const mouseUpListenerRef = useRef<((e: MouseEvent) => void) | null>(null);

  const previousPointRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    return () => {
      if (mouseMoveListenerRef.current) {
        document.removeEventListener("mousemove", mouseMoveListenerRef.current);
      }
      if (mouseUpListenerRef.current) {
        document.removeEventListener("mouseup", mouseUpListenerRef.current);
      }
    };
  }, []);

  function setCanvasRef(canvas: HTMLCanvasElement) {
    if (!canvas) return; // if canvas is not ready
    canvasRef.current?.removeEventListener(
      "mousedown",
      mouseDownListenerRef.current!
    );
    canvasRef.current = canvas;
    initMouseMoveListener();
    initMouseDownListener();
    initMouseUpListener();
  }

  // init mouse move listener
  function initMouseMoveListener() {
    const mouseMoveListener = (e: MouseEvent) => {
      if (canvasRef.current && isDrawingRef.current) {
        const point = computePointInCanvas(e.clientX, e.clientY);
        const ctx = canvasRef.current.getContext("2d");
        if (onDraw && ctx && point)
          onDraw(ctx, point, previousPointRef.current);
        previousPointRef.current = point;
      }
    };
    mouseMoveListenerRef.current = mouseMoveListener;
    window.addEventListener("mousemove", mouseMoveListener);
  }

  // init mouse up listener
  function initMouseUpListener() {
    const mouseUpListener = () => {
      isDrawingRef.current = false;
      previousPointRef.current = null;
    };
    mouseUpListenerRef.current = mouseUpListener;
    window.addEventListener("mouseup", mouseUpListener);
  }

  // init mouse down listener
  function initMouseDownListener() {
    if (!canvasRef.current) return;
    const mouseDownListener = () => {
      isDrawingRef.current = true;
    };
    mouseDownListenerRef.current = mouseDownListener;
    window.addEventListener("mousedown", mouseDownListener);
  }

  // compute the point in canvas
  function computePointInCanvas(clientX: number, clientY: number) {
    if (canvasRef.current) {
      const boundingRect = canvasRef.current.getBoundingClientRect();
      const x = clientX - boundingRect.left;
      const y = clientY - boundingRect.top;
      return { x, y };
    } else {
      return null;
    }
  }

  return setCanvasRef;
};

export { useOnDraw };
