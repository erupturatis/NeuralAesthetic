import document from "../Utils/document";

import { delay } from "../Utils/general";
import {
  layerParams,
  neuron,
  coord,
  propUpdater,
  forceUpdater,
  renderingParamsTransition,
  renderingParamsPhysics,
  circleParams,
  initialPositions,
  connection,
} from "../interfaces/interface";
import * as d3 from "d3";

import {
  assignRandomPositions,
  generateNeuron,
  generateConnProps,
} from "../Utils/generator";

interface posObject {
  index: number;
  posX: number;
  posY: number;
}

class Params {
  svgWidth: number = 0;
  svgHeight: number = 0;

  running = false;
  refresh = false;

  checkSvg = true;

  distanceLayers: number = 100;
  distanceNeurons: number = 50;

  iter: number = 0;
  hidden = false;
  document: any = undefined;
}

export class BasePainter extends Params {
  running: boolean;
  neurons: neuron[]; // keeping the index equal to the arr index,
  // since the neuron number will not change much if at all
  connections: connection[] = [];
  svgElement: SVGSVGElement;
  minX: number = 0;
  maxX: number = 0;
  minY: number = 0;
  maxY: number = 0;

  center: coord = {
    x: 0,
    y: 0,
  };

  constructor(htmlElement: SVGSVGElement) {
    super();
    this.document = document;
    if (
      this.document !== "undefined" &&
      typeof this.document.hidden !== "undefined"
    ) {
      // Add a visibility change event listener
      this.document.addEventListener("visibilitychange", () => {
        this.hidden = this.document.hidden;
      });
    }
    this.neurons = [];
    this.running = false;
    this.svgElement = htmlElement;

    this.calculateSVGSizes();
  }

  set neuronRadius(value: number) {
    for (let idx = 0; idx < this.neurons.length; idx += 1) {
      this.neurons[idx].radius = value;
    }
  }

  set neuronStrokeWidth(value: number) {
    for (let idx = 0; idx < this.neurons.length; idx += 1) {
      this.neurons[idx].strokeWidth = value;
    }
  }

  set neuronStrokeColor(value: string) {
    for (let idx = 0; idx < this.neurons.length; idx += 1) {
      this.neurons[idx].strokeColor = value;
    }
  }

  set neuronBgColor(value: string) {
    for (let idx = 0; idx < this.neurons.length; idx += 1) {
      this.neurons[idx].bgColor = value;
    }
  }

  set connectionStrokeWidth(value: number) {
    for (let idx = 0; idx < this.connections.length; idx += 1) {
      this.connections[idx].strokeWidth = value;
    }
  }

  set connectionStrokeColor(value: string) {
    for (let idx = 0; idx < this.connections.length; idx += 1) {
      this.connections[idx].strokeColor = value;
    }
  }

  set connectionStrokeOpacity(value: number) {
    for (let idx = 0; idx < this.connections.length; idx += 1) {
      this.connections[idx].strokeOpacity = value;
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

  addNeuron(neuron: neuron) {
    // adds more neurons to the existing ones
    this.neurons.push(neuron);
  }

  addFullConnections() {
    // adds connections between all neurons
    let connections: connection[] = [];
    for (let idx: number = 0; idx < this.neurons.length; idx++) {
      for (let idx2: number = idx + 1; idx2 < this.neurons.length; idx2++) {
        let connection: any = {
          index: connections.length,
          idxNeuron1: idx,
          idxNeuron2: idx2,
        };
        connections.push(connection);
      }
    }
    this.addConnections(connections);
  }

  addConnections(connections: connection[]) {
    // validating and adding missing props
    let basicConn = generateConnProps();
    for (let idx: number = 0; idx < connections.length; idx++) {
      if (connections[idx].strokeWidth === undefined) {
        connections[idx].strokeWidth = basicConn.strokeWidth;
      }
      if (connections[idx].strokeColor === undefined) {
        connections[idx].strokeColor = basicConn.strokeColor;
      }
      if (connections[idx].strokeOpacity === undefined) {
        connections[idx].strokeOpacity = basicConn.strokeOpacity;
      }
      connections[idx].index = idx + this.connections.length;
    }
    this.connections.push(...connections);
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

  generateNeuronLayers(params: layerParams) {
    let nrNeurons: number = params.layers.reduce(
      (prevVal, currVal) => prevVal + currVal
    );
    this.generateNeurons(nrNeurons);
    this.arrangeInLayers(params);
  }

  arrangeCustom(numNeurons: number, customArrangement: initialPositions) {
    this.generateNeurons(numNeurons);
    customArrangement(this.neurons);
  }

  arrangeInLayers(params: layerParams) {
    this.distanceLayers = params.distanceLayers;
    this.distanceNeurons = params.distanceNeurons;
    // arranges existent neurons in layers
    // the network will be centered around in the middle of the svg or group

    // calculating X positions based on layerDistance
    let unit: number = params.distanceLayers;
    let neuronUnit: number = params.distanceNeurons;
    let layerNumber: number = params.layers.length;
    let middle: number = (layerNumber - 1) / 2;
    let neuronIdx = 0;
    for (let idx: number = 0; idx < layerNumber; idx += 1) {
      // keeping index of neurons because they should be in order
      let layerNr = 0;
      for (; layerNr < params.layers[idx]; layerNr += 1) {
        let layerMiddle = (params.layers[idx] - 1) / 2;

        this.neurons[neuronIdx + layerNr].flags["layer"] = idx;
        this.neurons[neuronIdx + layerNr].flags["layerIdx"] = layerNr;
        //formula for centering the neurons in the svg
        this.neurons[neuronIdx + layerNr].posX = unit * (idx - middle);
        this.neurons[neuronIdx + layerNr].posY = unit * (layerNr - layerMiddle);
      }
      neuronIdx += layerNr;
    }
  }

  checkParams(params: any, mustHave: any) {
    let missing = mustHave.filter(
      (item: any) => !Object.keys(params).includes(item)
    );
    if (missing.length > 0) {
      throw new Error(`missing params: ${missing}`);
    }
  }

  arrangeInCircle(params: circleParams) {
    this.checkParams(params, ["neurons", "radius"]);
    // arranges neurons in a circle
    this.generateNeurons(params.neurons);
    const numNeurons = params.neurons; // The number of neurons you want to place on the circle
    const radius = params.radius; // The radius of the circle

    for (let i = 0; i < numNeurons; i++) {
      const angle = (2 * Math.PI * i) / numNeurons; // Calculate the angle for this neuron
      const x = radius * Math.cos(angle); // Calculate the x position
      const y = radius * Math.sin(angle); // Calculate the y position

      this.neurons[i].posX = x;
      this.neurons[i].posY = y;
    }
  }

  calculateSVGSizes() {
    // if the svg size changes it will try to adjust the neuron positions accordingly
    // Calculate the min and max values of the x and y coordinates

    const rect = this.svgElement.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    this.svgWidth = width;
    this.svgHeight = height;

    this.minX = 0;
    this.maxX = width;

    this.minY = 0;
    this.maxY = height;
    this.center.x = (this.maxX + this.minX) / 2;
    this.center.y = (this.maxY + this.minY) / 2;
  }

  drawInitialConnections() {
    // draws the connections between the neurons

    // appending a g element for connections to the root svg
    d3.select(this.svgElement).append("g").attr("id", "connections");

    // appending the lines to the g element

    d3.select(this.svgElement)
      .selectChildren("#connections")
      .selectAll("line")
      .data(this.connections, (el: any): number => {
        return el.index;
        // return the index of the connection
      })
      .enter()
      .append("line")
      .attr("x1", (el: connection) => {
        return this.neurons[el.idxNeuron1].posX + this.center.x;
      })
      .attr("y1", (el: connection) => {
        return this.neurons[el.idxNeuron1].posY + this.center.y;
      })
      .attr("x2", (el: connection) => {
        return this.neurons[el.idxNeuron2].posX + this.center.x;
      })
      .attr("y2", (el: connection) => {
        return this.neurons[el.idxNeuron2].posY + this.center.y;
      })
      .attr("stroke", (el: connection) => {
        return el.strokeColor;
      })
      .attr("stroke-width", (el: connection) => {
        return el.strokeWidth;
      })
      .attr("stroke-opacity", (el: connection) => {
        return el.strokeOpacity;
      });
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

      .attr("cx", (el: neuron) => {
        return el.posX + this.center.x;
      })
      .attr("cy", (el: neuron) => {
        return el.posY + this.center.y;
      })
      .attr("r", (el: neuron) => {
        return el.radius;
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

    // draws the connections
  }

  applyPositions() {
    // applies newPos to pos for all neurons
    for (let neuron of this.neurons) {
      neuron.posX = neuron.newPosX;
      neuron.posY = neuron.newPosY;
    }
  }

  instantTransition() {
    // same as transitionNeurons but without the transition
    d3.select(this.svgElement)

      .selectAll("circle")
      .data(this.neurons, (el: any): number => {
        return el.index;
        // return the index of the neuron
      })
      .attr("cx", (el: neuron) => {
        return el.posX + this.center.x;
      })
      .attr("cy", (el: neuron) => {
        return el.posY + this.center.y;
      });

    d3.select(this.svgElement)
      .selectAll("line")
      .data(this.connections, (el: any): number => {
        return el.index;
        // return the index of the connection
      })
      .attr("x1", (el: connection) => {
        return this.neurons[el.idxNeuron1].posX + this.center.x;
      })
      .attr("y1", (el: connection) => {
        return this.neurons[el.idxNeuron1].posY + this.center.y;
      })
      .attr("x2", (el: connection) => {
        return this.neurons[el.idxNeuron2].posX + this.center.x;
      })
      .attr("y2", (el: connection) => {
        return this.neurons[el.idxNeuron2].posY + this.center.y;
      })
      .attr("stroke", (el: connection) => {
        return el.strokeColor;
      })
      .attr("stroke-width", (el: connection) => {
        return el.strokeWidth;
      })
      .attr("stroke-opacity", (el: connection) => {
        return el.strokeOpacity;
      });
  }

  async checkSvgSize() {
    // if svg size changes, we need to recalculate the center with the calculateSVGSizes function
    while (true && this.checkSvg) {
      await delay(50);
      if (this.running) {
        const rect = this.svgElement.getBoundingClientRect();
        if (rect.width != this.svgWidth || rect.height != this.svgHeight) {
          this.calculateSVGSizes();
          /* since the network in already running, we need to transition the neurons to their new positions
         relattive to the new center */
          this.instantTransition();
        }
      }
    }
  }
  saveOriginalPositions() {
    // saves the original positions of the neurons
    for (let neuron of this.neurons) {
      neuron.originalPosX = neuron.posX;
      neuron.originalPosY = neuron.posY;
    }
  }

  drawStaticNetwork() {
    // draws the network without any transitions
    this.drawInitialConnections();
    this.drawInitialNeurons();
  }
}

export class TransitionNetwork extends BasePainter {
  transitionTime: number = 500;
  transitionInterval: number = 2000; // the time between the transitions
  propertiesUpdater: propUpdater = (neurons: neuron[], iter: number) => {}; // gets called to set next transition positions

  constructor(htmlElement: SVGSVGElement) {
    super(htmlElement);
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
      .duration(this.transitionTime)
      .attr("cx", (el: neuron) => {
        return el.posX + this.center.x;
      })
      .attr("cy", (el: neuron) => {
        return el.posY + this.center.y;
      })
      .attr("r", (el: neuron) => {
        return el.radius;
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

  transitionConnections() {
    // transitions the connections to their new positions
    d3.select(this.svgElement)
      .selectAll("line")
      .data(this.connections, (el: any): number => {
        return el.index;
        // return the index of the connection
      })
      .transition()
      .duration(this.transitionTime)
      .attr("x1", (el: connection) => {
        return this.neurons[el.idxNeuron1].posX + this.center.x;
      })
      .attr("y1", (el: connection) => {
        return this.neurons[el.idxNeuron1].posY + this.center.y;
      })
      .attr("x2", (el: connection) => {
        return this.neurons[el.idxNeuron2].posX + this.center.x;
      })
      .attr("y2", (el: connection) => {
        return this.neurons[el.idxNeuron2].posY + this.center.y;
      })
      .attr("stroke", (el: connection) => {
        return el.strokeColor;
      })
      .attr("stroke-width", (el: connection) => {
        return el.strokeWidth;
      })
      .attr("stroke-opacity", (el: connection) => {
        return el.strokeOpacity;
      });
  }

  paramsChecker(params: renderingParamsTransition) {
    if (params.infinite == false && params.iterations == undefined) {
      throw "You need to specify the number of iterations or set infinite to true";
    }
    if (params.transitionTime != undefined) {
      this.transitionTime = params.transitionTime;
    } else {
      throw "You need to specify the transition time in ms";
    }
    if (params.transitionInterval != undefined) {
      this.transitionInterval = params.transitionInterval;
    } else {
      throw "You need to specify the transition interval in ms";
    }
    if (params.propertiesUpdater != undefined) {
      this.propertiesUpdater = params.propertiesUpdater;
    } else {
      throw "You need to specify the properties updater function";
    }
  } // checks if the params are valid and sets them to class

  async startRendering(params: renderingParamsTransition) {
    // draws the initial neurons applying the properties
    this.paramsChecker(params);
    this.calculateSVGSizes();
    this.checkSvgSize();
    this.drawInitialConnections();
    this.drawInitialNeurons();
    // saving the original positions
    this.saveOriginalPositions();
    this.running = true;
    // starts the render loop

    this.iter = 0;
    while (
      params.infinite ||
      (params.iterations !== undefined && this.iter < params.iterations)
    ) {
      //the new positions will be calculated
      if (this.hidden) {
        await delay(200);
        continue;
      }

      this.propertiesUpdater(this.neurons, this.iter);

      // applies the new positions
      this.applyPositions();
      // sleep for transitionInterval
      await delay(this.transitionInterval);
      // in the transition network the neurons will be moved to their new positions
      this.transitionNeurons();
      this.transitionConnections();
      this.iter += 1;
    }
    this.running = false;
    // write code for drawing the neurons
  }
  saveOriginalPositions() {
    // saves the original positions of the neurons
    for (let neuron of this.neurons) {
      neuron.originalPosX = neuron.posX;
      neuron.originalPosY = neuron.posY;
    }
  }
}

// the program will have a physics based implementation and an transition based implementation
export class PhysicsNetwork extends BasePainter {
  FPS: number = 60;
  forceLoss: number = 0; // the force loss per frame
  forceMultiplier: number = 0.005; // the force multiplier

  forces: coord[] = []; // the forces that will be applied to the neurons

  addForces: forceUpdater = (
    neurons: neuron[],
    forces: coord[],
    iter: number
  ) => {}; // gets called to add forces to the neurons

  addInitialForces: forceUpdater = (
    neurons: neuron[],
    forces: coord[],
    iter: number
  ) => {}; // gets called to add initial forces to the neurons

  constructor(htmlElement: SVGSVGElement) {
    super(htmlElement);
  }

  // movement will have no transition, positions will be calculated in the render loop
  applyForces() {
    for (let idx = 0; idx < this.neurons.length; idx++) {
      const neuron = this.neurons[idx];
      const force = this.forces[idx];
      // the force will be applied to the neuron
      neuron.newPosX = neuron.posX + force.x * this.forceMultiplier;
      neuron.newPosY = neuron.posY + force.y * this.forceMultiplier;
      // the force will be reduced
      force.x *= 1 - this.forceLoss;
      force.y *= 1 - this.forceLoss;
    }
  }

  initializeForces() {
    for (let idx: number = 0; idx < this.neurons.length; idx++) {
      this.forces[idx] = { x: 0, y: 0 };
    }
  }

  // render loop
  async startRendering(iterations?: number) {
    // draws the initial neurons applying the properties
    this.calculateSVGSizes();
    this.checkSvgSize();
    this.drawInitialNeurons();
    this.drawInitialConnections();
    //intialization of the positionsDx and positionsDy arrays with 0 for each neuron

    // saving the original positions
    this.saveOriginalPositions();
    this.running = true;
    this.initializeForces();
    // dispatch initial forces (may also pe async for loops)
    this.addInitialForces(this.neurons, this.forces, this.iter);
    // starts the render loop
    while (true && (iterations === undefined || iterations-- > 0)) {
      if (this.hidden) {
        await delay(200);
        continue;
      }
      // drawing the neurons with new positions
      this.instantTransition();
      // forces are added on Neurons
      this.addForces(this.neurons, this.forces, this.iter);
      // forces are applied, calculates dx and dy
      this.applyForces();
      // the new positions are calculated from the old positions and the dx and dy
      this.applyPositions();
      await delay(1000 / this.FPS);
      this.instantTransition();
    }
    this.running = false;
    // write code for drawing the neurons
  }
}
