import "./resizable.css";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import React from "react";
interface ResizableProps {
  direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  switch (direction) {
    case "vertical":
      resizableProps = {
        height: 300,
        width: Infinity,
        minConstraints: [Infinity, 24],
        maxConstraints: [Infinity, window.innerHeight * 0.9],
        resizeHandles: ["s"],
      };
      break;
    case "horizontal":
      resizableProps = {
        className: "resize-horizontal",
        height: Infinity,
        width: window.innerWidth * 0.6,
        minConstraints: [window.innerWidth * 0.2, Infinity],
        maxConstraints: [window.innerWidth * 0.9, Infinity],
        resizeHandles: ["e"],
      };
      break;
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
