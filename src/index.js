import React from "react";
import ReactDOM from "react-dom";
import CanvasImg from "./canvas-image";
import { Body3, Subtitle1 } from "./text-styles";

import img from "../stock.png";

function App() {
  return (
    <div className="App">
      <CanvasImg
        width={255}
        height={255}
        parentBackgroundColor="#fff"
        accentColor="#e30613"
        borderThickness={3}
        hoverFillStyle="rgba(0, 0, 0, .4)"
        image={img}
        name={<Subtitle1>Eugene Holmes</Subtitle1>}
        title={
          <Body3>
            Co-Founder &<br /> Talent Acquisition Specialist
          </Body3>
        }
      />
      <CanvasImg
        width={255}
        height={255}
        parentBackgroundColor="#fff"
        accentColor="#e30613"
        borderThickness={3}
        hoverFillStyle="rgba(0, 0, 0, .4)"
        image={img}
        name={<Subtitle1>Eugene Holmes</Subtitle1>}
        title={
          <Body3>
            Co-Founder &<br /> Talent Acquisition Specialist
          </Body3>
        }
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
