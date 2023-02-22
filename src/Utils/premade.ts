import { posUpdater, neuron } from "../interfaces/interface";
// contains all the premade functions

export const shiftNeurons: posUpdater = (neurons: neuron[]) => {
  let lng: number = neurons.length;
  neurons[lng - 1].newPosX = neurons[0].posX;
  neurons[lng - 1].newPosY = neurons[0].posY;

  for (let idx: number = 0; idx < neurons.length - 1; idx += 1) {
    neurons[idx].newPosX = neurons[idx + 1].posX;
    neurons[idx].newPosY = neurons[idx + 1].posY;
  }
};
