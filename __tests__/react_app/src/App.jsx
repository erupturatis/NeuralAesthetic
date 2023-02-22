import { useEffect } from "react";
import { shiftNeurons, TransitionNetwork } from "../../";

function App() {
  useEffect(() => {
    let paint = new TransitionNetwork(document.querySelector("#root-svg"));
    paint.generateNeuronLayers(
      { distanceLayers: 50, distanceNeurons: 50, layers: 3 },
      2,
      3,
      5,
      6
    );
    paint.positionUpdater = shiftNeurons;
    paint.startRendering(100);
  }, []);

  // integration testing will be done manually here, will set up some tests
  // later probably in this react app to run along with the normal tests
  return (
    <div className="App big">
      <div className="full-size ">
        <svg
          id="root-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        ></svg>
      </div>
    </div>
  );
}

export default App;
