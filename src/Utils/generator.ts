import { neuron } from "src/interfaces/interface";

export const generateNeuron = (): neuron => {
  let neuron: neuron = {
    index: -1,
    posX: -1,
    posY: -1,
    radius: -1,
    strokeWidth: -1,
    strokeColor: "",
    bgColor: "",
    args: {},
  };
  return neuron;
};

export const assignRandomPositions = (
  neuronsList: neuron[],
  min: number,
  max: number
): void => {
  for (let neuron of neuronsList) {
    neuron.posY = rand(min, max);
    neuron.posY = rand(min, max);
  }
};

export const rand = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
