import {
  propUpdater,
  neuron,
  forceUpdater,
  coord,
  connection,
} from "../interfaces/interface";
// contains all the premade functions
import { delay } from "./general";

export const shiftNeurons: propUpdater = (
  neurons: neuron[],
  connections: connection[],
  iter: number
) => {
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

export const centerIdleMovement: forceUpdater = (
  neurons: neuron[],
  forces: coord[],
  iter: number
) => {
  // pythagorean theorem for distance between two points
  let distance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };
  for (let idx: number = 0; idx < neurons.length; idx += 1) {
    const neuron: neuron = neurons[idx];
    if (
      distance(
        neuron.originalPosX,
        neuron.originalPosY,
        neuron.posX,
        neuron.posY
      ) > 5
    ) {
      forces[idx].x += 0.2 * (neuron.originalPosX - neuron.posX);
      forces[idx].y += 0.2 * (neuron.originalPosY - neuron.posY);
    } else {
      forces[idx].x += Math.random() * 20 - 10;
      forces[idx].y += Math.random() * 20 - 10;
    }
  }
};

export const additionalForces: forceUpdater = async (neurons, forces, iter) => {
  await delay(1000);
  forces[0].y += 1000;
};
