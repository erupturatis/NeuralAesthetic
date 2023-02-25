import React from "react";
import { useEffect } from "react";

const Ball = () => {
  useEffect(() => {
    // ball physics network
    let paint = new PhysicsNetwork(document.querySelector("#root-svg-ball"));
    paint.arrangeInCircle({
      neurons: 10,
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
          id="root-svg-ball"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        ></svg>
      </div>
    </div>
  );
};

export default Ball;
