export interface neuron {
  index: number;
  posX: number;
  posY: number;
  radius: number;
  strokeWidth: number;
  strokeColor: string;
  bgColor: string;
  args: {}; // needed to easily identify a specific subset of neurons for effects
}
