import React, { useRef, useState } from "react";
import "../draw/DrawBoard.css";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { HexColorPicker } from "react-colorful";

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
  width: 1000,
  height: 576,
};

function DrawBoard() {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#aabbcc");
  const [size, setSize] = useState(1);
  const [data, setData] = useState("");

  const increment = () => {
    setSize(size + 1);
  };
  const decrement = () => {
    if (size > 0) setSize(size - 1);
  };

  const handleDownload = () => {
    canvasRef.current.exportImage("png").then((data) => {
      setData(data);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'Canvas-work.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    
  };
  const handleReset = () => {
    canvasRef.current.clearCanvas();
  };

  return (
    <div className="draw">
      <ReactSketchCanvas
        style={styles}
        ref={canvasRef}
        strokeWidth={size}
        strokeColor={color}
      />
      <div className="tool-bar">
        <HexColorPicker className="color-pick" color={color} onChange={setColor} />
        <h5 className="curr-color">Color Hex: {color}</h5>
        <div className="size">
          <h4 key={size}>Size: {size}</h4>
          <div className="size-btn">
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
          </div>
        </div>

        <div className="actions">
          <div className="mid-actions">
            <button
              onClick={() => {
                canvasRef.current.undo();
              }}
            >
              Undo
            </button>
            <button
              onClick={() => {
                canvasRef.current.redo();
              }}
            >
              Redo
            </button>
          </div>
          <div className="final-actions">
            <button onClick={handleDownload}>Download</button>
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrawBoard;
