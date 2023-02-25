import Layers from "./premade_networks/layers";
import Comp from "./premade_networks/Comp";
import Circle from "./premade_networks/circle";
import Ball from "./premade_networks/Ball";

function App() {
  // integration testing will be done manually here, will set up some tests
  // later probably in this react app to run along with the normal tests
  return (
    <div className="App ">
      <Ball />
    </div>
  );
}

export default App;
