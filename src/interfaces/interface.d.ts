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

export interface connection {
  index: number;
  idxNeuron1: number;
  idxNeuron2: number;
  strokeColor: string;
  strokeWidth: number;
  strokeOpacity: number;
}

export interface layerParams {
  distanceNeurons: number;
  distanceLayers: number;
  layers: number[];
}

export interface circleParams {
  radius: number;
  neurons: number;
}

export interface coord {
  x: number;
  y: number;
}

export interface renderingParamsTransition {
  infinite: boolean;
  iterations?: number;
  transitionTime: number;
  transitionInterval: number;
  propertiesUpdater: propUpdater;
}

export interface renderingParamsPhysics {
  infinite: boolean;
  FPS: number;
  seconds?: number;
  forceLoss?: number;
  forceMultiplier?: number;
  addInitialForces?: forceUpdater;
  addForces: forceUpdater;
}

export type initialPositions = (neurons: neuron[]) => void; // assigning initial positions to neurons (posX and posY

export type propUpdater = (
  neurons: neuron[],
  connections: connection[],
  iter: number
) => void; // updating newPosX and newPosY

export type forceUpdater = (
  neurons: neuron[],
  forces: coord[],
  iter: number
) => void; // updating forces array
