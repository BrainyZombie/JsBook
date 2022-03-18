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
  const [width, setWidth] = useState(window.innerWidth * 0.75);
  useEffect(() => {
    let timer: any;
    const listener = (e: Event) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
      }, 100);
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
      if (width > innerWidth * 0.75) {
        setWidth(innerWidth * 0.75);
      }
      resizableProps = {
        className: "resize-horizontal",
        height: Infinity,
        width,
        minConstraints: [innerWidth * 0.2, Infinity],
        maxConstraints: [innerWidth * 0.9, Infinity],
        resizeHandles: ["e"],
        onResizeStop: (event, data) => {
          setWidth(data.size.width);
        },
      };
      break;
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
