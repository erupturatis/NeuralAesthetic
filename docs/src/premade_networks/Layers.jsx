import React from "react";
import { useEffect } from "react";
import {
  shiftNeurons,
  TransitionNetwork,
  PhysicsNetwork,
  centerNeuronForce,
  additionalForces,
} from "../../index";

const Layers = () => {
  useEffect(() => {
    let paint = new TransitionNetwork(
      document.querySelector("#root-svg-layers")
    );
    // initial position

    paint.generateNeuronLayers({
      distanceLayers: 80,
      distanceNeurons: 40,
      layers: [2, 4, 6, 4, 2],
    });

    paint.addFullConnections();
    paint.startRendering({
      infinite: true,
      transitionTime: 1000,
      transitionInterval: 1000,
      propertiesUpdater: shiftNeurons,
    });
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
