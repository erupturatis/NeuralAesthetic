import React from "react";
import {
  shiftNeurons,
  TransitionNetwork,
  PhysicsNetwork,
  centerNeuronForce,
  additionalForces,
} from "../../..";
import { useEffect } from "react";

const Circle = () => {
  useEffect(() => {
    let paint = new TransitionNetwork(
      document.querySelector("#root-svg-circle")
    );
    paint.arrangeInCircle({
      neurons: 20,
      radius: 200,
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
          id="root-svg-circle"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        ></svg>
      </div>
    </div>
  );
};

export default Circle;
