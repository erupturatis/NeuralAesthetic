import Layers from "./premade_networks/layers";
import Circle from "./premade_networks/circle";
function App() {
  // integration testing will be done manually here, will set up some tests
  // later probably in this react app to run along with the normal tests
  return (
    <div className="App ">
      <Circle />
      <Layers />
    </div>
  );
}

export default App;
