import { neuron } from "src/interfaces/interface";
import { assignRandomPositions, generateNeuron } from "./generator";

interface posObject {
  index: number;
  posX: number;
  posY: number;
}

export class BasePainter {
  running: boolean;
  neurons: neuron[]; // keeping the index equal to the arr index,
  // since the neuron number will not change much if at all
  svgElement: SVGElement;
  min: number;
  max: number;

  constructor(htmlElement: SVGElement) {
    this.neurons = [];
    this.running = false;
    this.svgElement = htmlElement;
    this.min = 0; //calculated from svg element
    this.max = 10; //calculated from svg element
  }

  setPosition(index: number, posX: number, posY: number): void {
    this.neurons[index].posX = posX;
    this.neurons[index].posY = posY;
  }

  setPositions(neuronArr: posObject[]) {
    for (let posObj of neuronArr) {
      // pos will be an object with an index, posX and posY
      this.setPosition(posObj.index, posObj.posX, posObj.posY);
    }
  }

  generateNeurons(numberNeuons: number) {
    // generates boilerplate neurons for the class
    // assumes neurons array is empty

    for (let idx: number = 0; idx < numberNeuons; idx++) {
      let neuron: neuron = generateNeuron();
      neuron.index = idx;
      this.neurons.push(neuron);
    }
  }

  assignRandomPosition() {
    assignRandomPositions(this.neurons, min, max);
  }
}
