export interface neuron {
  index: number;
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

export type posUpdater = (neurons: neuron[]) => void;
