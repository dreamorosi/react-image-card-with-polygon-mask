import React from "react";
import ReactDOM from "react-dom";
import CanvasImg from "./canvas-image";
import "./styles.css";

import img from "../stock.png";

function App() {
  return (
    <div className="App">
      <CanvasImg
        width={255}
        height={255}
        parentBackgroundColor="#fff"
        borderColor="#f00"
        borderThickness={1}
        hoverFillStyle="rgba(0, 0, 0, .4)"
        image={img}
      />
      <CanvasImg
        width={255}
        height={255}
        parentBackgroundColor="#fff"
        borderColor="#f00"
        borderThickness={1}
        hoverFillStyle="rgba(0, 0, 0, .4)"
        image={img}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
