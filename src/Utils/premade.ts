import { posUpdater, neuron } from "../interfaces/interface";
// contains all the premade functions

const shiftNeurons: posUpdater = (neurons: neuron[]) => {
  let lng: number = neurons.length;
  neurons[0].newPosX = neurons[lng].posX;
  neurons[0].newPosY = neurons[lng].posY;

  for (let idx: number = 1; idx < neurons.length; idx += 1) {
    neurons[idx].newPosX = neurons[idx - 1].posX;
    neurons[idx].newPosY = neurons[idx - 1].posY;
  }
};
