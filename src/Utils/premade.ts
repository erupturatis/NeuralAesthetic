import {
  posUpdater,
  neuron,
  forceUpdater,
  coord,
} from "../interfaces/interface";
// contains all the premade functions
import { delay } from "./general";

export const shiftNeurons: posUpdater = (neurons: neuron[], iter: number) => {
  let lng: number = neurons.length;
  neurons[lng - 1].newPosX = neurons[0].posX;
  neurons[lng - 1].newPosY = neurons[0].posY;

  for (let idx: number = 0; idx < neurons.length - 1; idx += 1) {
    neurons[idx].newPosX = neurons[idx + 1].posX;
    neurons[idx].newPosY = neurons[idx + 1].posY;
  }
};

export const centerNeuronForce: forceUpdater = (
  neurons: neuron[],
  forces: coord[],
  iter: number
) => {
  for (let idx: number = 0; idx < neurons.length; idx += 1) {
    const neuron: neuron = neurons[idx];
    forces[idx].x += neuron.originalPosX - neuron.posX;
    forces[idx].y += neuron.originalPosY - neuron.posY;
  }
};

export const additionalForces: forceUpdater = async (neurons, forces, iter) => {
  await delay(1000);
  forces[0].y += 500;
};
