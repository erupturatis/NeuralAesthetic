import { neuron, connection } from "../interfaces/interface";

export const generateNeuron = (): neuron => {
  let neuron: neuron = {
    index: -1,
    originalPosX: 0,
    originalPosY: 0,
    posX: 0,
    posY: 0,
    newPosX: 0,
    newPosY: 0,
    radius: 20,
    strokeWidth: 1.5,
    strokeColor: "white",
    bgColor: "black",
    flags: {},
  };
  return neuron;
};

export const generateConnProps = (): connection => {
  let connection: connection = {
    index: -1,
    idxNeuron1: -1,
    idxNeuron2: -1,
    strokeColor: "white",
    strokeWidth: 2,
    strokeOpacity: 1,
  };
  return connection;
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
