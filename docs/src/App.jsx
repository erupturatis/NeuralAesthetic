import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layers from "./premade_networks/layers";
import Comp from "./premade_networks/Comp";
import Circle from "./premade_networks/circle";
import Ball from "./premade_networks/Ball";
import Entry from "./Entry";
import ChaoticBall from "./premade_networks/ChaoticBall";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Entry />} />
          <Route exact path="/layerTransition" element={<Layers />} />
          <Route exact path="/circleTransition" element={<Circle />} />

          <Route exact path="/circlePhysicsJiggle" element={<Ball />} />
          <Route exact path="/circlePhysicsChaotic" element={<ChaoticBall />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
