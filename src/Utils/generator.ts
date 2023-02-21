import { neuron } from "src/interfaces/interface";

export const generateNeuron = (): neuron => {
  let neuron: neuron = {
    index: -1,
    posX: 0,
    posY: 0,
    radius: 10,
    strokeWidth: 1,
    strokeColor: "black",
    bgColor: "white",
    flags: {},
  };
  return neuron;
};

export const assignRandomPositions = (
  neuronsList: neuron[],
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
): void => {
  for (let neuron of neuronsList) {
    neuron.posX = rand(minX, maxX);
    neuron.posY = rand(minY, maxY);
  }
};

export const rand = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
