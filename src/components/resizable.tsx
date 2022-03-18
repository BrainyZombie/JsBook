import "./resizable.css";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import React, { useState, useEffect } from "react";
interface ResizableProps {
  direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  useEffect(() => {
    const listener = (e: Event) => {
      setInnerHeight(window.innerHeight);
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  switch (direction) {
    case "vertical":
      resizableProps = {
        height: 300,
        width: Infinity,
        minConstraints: [Infinity, 24],
        maxConstraints: [Infinity, innerHeight * 0.9],
        resizeHandles: ["s"],
      };
      break;
    case "horizontal":
      resizableProps = {
        className: "resize-horizontal",
        height: Infinity,
        width: innerWidth * 0.6,
        minConstraints: [innerWidth * 0.2, Infinity],
        maxConstraints: [innerWidth * 0.9, Infinity],
        resizeHandles: ["e"],
      };
      break;
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
