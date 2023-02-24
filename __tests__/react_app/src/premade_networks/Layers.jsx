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
      distanceLayers: 50,
      distanceNeurons: 50,
      layers: [2, 3, 4, 5, 6],
    });
    paint.addForces = centerNeuronForce;
    paint.addInitialForces = additionalForces;
    paint.startRendering();
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
