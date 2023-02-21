import { layerParams, neuron, coord } from "src/interfaces/interface";

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
  svgElement: SVGSVGElement;
  minX: number = 0;
  maxX: number = 0;
  minY: number = 0;
  maxY: number = 0;

  center: coord = {
    x: 0,
    y: 0,
  };

  constructor(htmlElement: SVGSVGElement, debug?: boolean) {
    this.neurons = [];
    this.running = false;
    this.svgElement = htmlElement;
    if (!debug) {
      // if debugging we might need to test only some of the internal functions without an actual svg
      this.calculateSVGSizes();
    }
  }

  set neuronRadius(value: number) {
    for (let idx = 0; idx < this.neurons.length; idx += 1) {
      this.neurons[idx].radius = value;
    }
  }

  set strokeWidth(value: number) {
    for (let idx = 0; idx < this.neurons.length; idx += 1) {
      this.neurons[idx].strokeWidth = value;
    }
  }

  set strokeColor(value: string) {
    for (let idx = 0; idx < this.neurons.length; idx += 1) {
      this.neurons[idx].strokeColor = value;
    }
  }

  set bgColor(value: string) {
    for (let idx = 0; idx < this.neurons.length; idx += 1) {
      this.neurons[idx].bgColor = value;
    }
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

  generateNeurons(numberNeurons: number) {
    // generates boilerplate neurons for the classp
    // assumes neurons array is empty

    for (let idx: number = 0; idx < numberNeurons; idx++) {
      let neuron: neuron = generateNeuron();
      neuron.index = idx;
      this.neurons.push(neuron);
    }
  }

  addNeurons(numberNeurons: number) {
    // adds more neurons to the existing ones
  }

  assignRandomPosition() {
    assignRandomPositions(
      this.neurons,
      this.minX,
      this.maxX,
      this.minY,
      this.maxY
    );
  }

  addArg(index: number, key: string, flag: any): void {
    this.neurons[index].flags[key] = flag;
  }

  generateNeuronLayers(params: layerParams, ...args: number[]) {
    let nrNeurons: number = args.reduce(
      (prevVal, currVal) => prevVal + currVal
    );
    this.generateNeurons(nrNeurons);
    this.arrangeInLayers(params, ...args);
  }

  arrangeInLayers(params: layerParams, ...args: number[]) {
    // arranges existent neurons in layers
    // the network will be centered around in the middle of the svg or group
  }

  calculateSVGSizes() {
    // if the svg size changes it will try to adjust the neuron positions accordingly
    // Calculate the min and max values of the x and y coordinates

    const rect = this.svgElement.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    this.minX = 0;
    this.maxX = width;

    this.minY = 0;
    this.maxY = height;
    this.center.x = (this.maxX + this.minX) / 2;
    this.center.y = (this.maxY + this.minY) / 2;
  }
}
