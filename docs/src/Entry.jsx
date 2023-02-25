import React from "react";
import { Link } from "react-router-dom";

const Entry = () => {
  return (
    <div>
      <h1>
        This is the official page for neuralaesthetics. Not good not terrible.
      </h1>
      <h2>Here, have some examples to go to</h2>
      <Link to={"circleTransition"}>
        <div className="w-28 border-2 m-4 p-4 hover:bg-green-700 ">
          {" "}
          Transition shift Circle{" "}
        </div>
      </Link>
      <Link to={"circlePhysicsJiggle"}>
        <div className="w-28 border-2 m-4 p-4 hover:bg-green-700 ">
          {" "}
          Idle Circle{" "}
        </div>
      </Link>
      <Link to={"layerTransition"}>
        <div className="w-28 border-2 m-4 p-4 hover:bg-green-700 ">
          {" "}
          Layers Shifting
        </div>
      </Link>

      <Link to={"circlePhysicsChaotic"}>
        <div className="w-28 border-2 m-4 p-4 hover:bg-green-700 ">
          {" "}
          Chaotic Circle{" "}
        </div>
      </Link>
    </div>
  );
};

export default Entry;
