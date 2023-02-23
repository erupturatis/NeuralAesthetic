export interface neuron {
  index: number;
  originalPosX: number;
  originalPosY: number;
  posX: number;
  posY: number;
  newPosX: number;
  newPosY: number;
  radius: number;
  strokeWidth: number;
  strokeColor: string;
  bgColor: string;
  flags: { [key: string]: any }; // needed to easily identify a specific subset of neurons for effects
}

export interface layerParams {
  distanceNeurons: number;
  distanceLayers: number;
}

export interface coord {
  x: number;
  y: number;
}

export type posUpdater = (neurons: neuron[], iter: number) => void; // updating newPosX and newPosY
export type forceUpdater = (
  neurons: neuron[],
  forces: coord[],
  iter: number
) => void; // updating forces array
