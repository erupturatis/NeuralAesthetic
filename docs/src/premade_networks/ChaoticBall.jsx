import React from "react";
import { useEffect } from "react";
import {
  centerIdleMovement,
  centerNeuronForce,
  PhysicsNetwork,
} from "../../index";

const ChaoticBall = () => {
  useEffect(() => {
    // ball physics network
    let paint = new PhysicsNetwork(document.querySelector("#root-svg-ball"));
    paint.arrangeInCircle({
      neurons: 10,
      radius: 175,
    });
    paint.addFullConnections();

    paint.startRendering(
      {
        infinite: true,
        FPS: 60,
        forceLoss: 0.01,
        forceMultiplier: 0.03,
        addForces: centerIdleMovement,
      },
      []
    );
  }, []);

  return (
    <div className="big">
      <div className="full-size ">
        <svg
          id="root-svg-ball"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        ></svg>
      </div>
    </div>
  );
};

export default ChaoticBall;
