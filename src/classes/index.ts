import { delay } from "../Utils/general";
import {
  layerParams,
  neuron,
  coord,
  posUpdater,
} from "../interfaces/interface";
import * as d3 from "d3";

import { assignRandomPositions, generateNeuron } from "../Utils/generator";

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

    // calculating X positions based on layerDistance
    let unit: number = params.distanceLayers;
    let neuronUnit: number = params.distanceNeurons;
    let middle: number = (args.length - 1) / 2;
    let neuronIdx = 0;
    for (let idx: number = 0; idx < args.length; idx += 1) {
      // keeping index of neurons because they should be in order
      let layerNr = 0;
      for (; layerNr < args[idx]; layerNr += 1) {
        let layerMiddle = (args[idx] - 1) / 2;

        this.neurons[neuronIdx + layerNr].flags["layer"] = idx;
        this.neurons[neuronIdx + layerNr].flags["layerIdx"] = layerNr;
        //formula for centering the neurons in the svg
        this.neurons[neuronIdx + layerNr].posX = unit * (idx - middle);
        this.neurons[neuronIdx + layerNr].posY = unit * (layerNr - layerMiddle);
      }
      neuronIdx += layerNr;
    }
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
  drawInitialNeurons() {
    // draws the neurons
    d3.select(this.svgElement)
      .selectAll("circle")
      .data(this.neurons, (el: any): number => {
        return el.index;
        // return the index of the neuron
      })
      .enter()
      .append("circle")
      .attr("r", (el: neuron) => {
        return el.radius;
      })
      .attr("cx", (el: neuron) => {
        return el.posX + this.center.x;
      })
      .attr("cy", (el: neuron) => {
        return el.posY + this.center.y;
      })
      .attr("fill", (el: neuron) => {
        return el.bgColor;
      })
      .attr("stroke", (el: neuron) => {
        return el.strokeColor;
      })
      .attr("stroke-width", (el: neuron) => {
        return el.strokeWidth;
      });
  }

  transitionNeurons() {
    // transitions the neurons to their new positions
    d3.select(this.svgElement)
      .selectAll("circle")
      .data(this.neurons, (el: any): number => {
        return el.index;
        // return the index of the neuron
      })
      .transition()
      .duration(1000)
      .attr("cx", (el: neuron) => {
        return el.posX + this.center.x;
      })
      .attr("cy", (el: neuron) => {
        return el.posY + this.center.y;
      });
  }

  applyPositions() {
    // applies newPos to pos for all neurons
    for (let neuron of this.neurons) {
      neuron.posX = neuron.newPosX;
      neuron.posY = neuron.newPosY;
    }
  }
}

// the program will have a physics based implementation and an transition based implementation
export class PhysicsNetwork extends BasePainter {
  constructor(htmlElement: SVGSVGElement, debug?: boolean) {
    super(htmlElement, debug);
  }
}

export class TransitionNetwork extends BasePainter {
  transitionTime: number = 500;
  transitionInterval: number = 2000; // the time between the transitions
  positionUpdater: posUpdater = (neurons: neuron[]) => {}; // gets called to set next transition positions

  constructor(htmlElement: SVGSVGElement, debug?: boolean) {
    super(htmlElement, debug);
  }

  async startRendering(iterations?: number) {
    // draws the initial neurons applying the properties
    this.drawInitialNeurons();
    // starts the render loop
    while (true && (iterations === undefined || iterations-- > 0)) {
      //the new positions will be calculated
      this.positionUpdater(this.neurons);
      // applies the new positions
      this.applyPositions();
      // sleep for transitionInterval
      await delay(this.transitionInterval);
      // in the transition network the neurons will be moved to their new positions
      this.transitionNeurons();
    }
    // write code for drawing the neurons
  }
}
