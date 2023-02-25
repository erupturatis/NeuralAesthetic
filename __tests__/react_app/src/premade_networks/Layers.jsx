import React from "react";
import { useEffect } from "react";
import {
  shiftNeurons,
  TransitionNetwork,
  PhysicsNetwork,
  centerNeuronForce,
  additionalForces,
} from "../../..";

const Layers = () => {
  useEffect(() => {
    let paint = new PhysicsNetwork(document.querySelector("#root-svg-layers"));
    // initial position

    paint.generateNeuronLayers({
      distanceLayers: 80,
      distanceNeurons: 40,
      layers: [3, 3, 3],
    });
    // paint.neuronRadius = 10;
    paint.drawStaticNetwork();
  }, []);

  return (
    <div className="big">
      <div className="full-size ">
        <svg
          id="root-svg-layers"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        ></svg>
      </div>
    </div>
  );
};

export default Layers;
