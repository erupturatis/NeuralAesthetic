import React from "react";
import { useEffect } from "react";
import {
  shiftNeurons,
  TransitionNetwork,
  PhysicsNetwork,
  centerNeuronForce,
  additionalForces,
} from "../../..";

const Comp = () => {
  useEffect(() => {
    // testing custom positioning
    let paint = new TransitionNetwork(document.querySelector("#root-svg-comp"));
    paint.arrangeCustom(6, (neurons) => {
      neurons[0].posX = 0;
      neurons[0].posY = 0;
      neurons[1].posX = 0;
      neurons[1].posY = 100;
      neurons[2].posX = 0;
      neurons[2].posY = 200;
      neurons[3].posX = 100;
      neurons[3].posY = 0;
      neurons[4].posX = 100;
      neurons[4].posY = 100;
      neurons[5].posX = 100;
      neurons[5].posY = 200;
    });

    paint.addConnections([
      {
        idxNeuron1: 0,
        idxNeuron2: 1,
      },

      {
        idxNeuron1: 1,
        idxNeuron2: 2,
      },
      {
        idxNeuron1: 2,
        idxNeuron2: 3,
      },
    ]);

    // paint.startRendering({
    //   infinite: true,
    //   transitionTime: 1000,
    //   transitionInterval: 1000,
    //   propertiesUpdater: shiftNeurons,
    // });
    paint.drawStaticNetwork();
  }, []);

  return (
    <div>
      <div className="big">
        <div className="full-size ">
          <svg
            id="root-svg-comp"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          ></svg>
        </div>
      </div>
    </div>
  );
};

export default Comp;
