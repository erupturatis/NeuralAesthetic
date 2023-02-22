import { JSDOM } from "jsdom";
import {
  assignRandomPositions,
  generateNeuron,
  BasePainter,
  TransitionNetwork,
  shiftNeurons,
} from "..";

describe("tests generation of neurons positions", () => {
  let dom;
  let svg;
  beforeAll(() => {
    dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    svg = createMockSvg(1000, 500);
    dom.window.document.body.appendChild(svg);
  });

  function createMockSvg(width, height) {
    const svg = dom.window.document.createElement("svg");
    Object.assign(svg.style, {
      width: width + "px",
      height: height + "px",
    });
    // we have to mock this for jsdom.
    svg.getBoundingClientRect = () => ({
      width,
      height,
      top: 0,
      left: 0,
      right: width,
      bottom: height,
    });
    return svg;
  }

  test("test random positions", () => {
    const paint = new BasePainter(svg);
    paint.generateNeurons(10);
    expect(paint.neurons.length).toBe(10);
  });

  test("test layer positions", () => {
    //
    const paint = new BasePainter(svg);
    let params = {
      distanceNeurons: 12,
      distanceLayers: 20,
    };

    paint.generateNeuronLayers(params, 2, 3, 5, 5);

    expect(paint.neurons.length).toBe(15);
    expect(paint.neurons[2].flags["layer"]).toBe(1); // layers indexed from 0
  });

  test("test arguments adding", () => {
    const paint = new BasePainter(svg);
    paint.generateNeurons(10);
    paint.addArg(5, "customArg", 23);

    expect(paint.neurons[5].flags["customArg"]).toBe(23);
  });

  test("setters for neuron props", () => {
    const paint = new BasePainter(svg);
    paint.generateNeurons(12);
    paint.neuronRadius = 23;
    expect(paint.neurons[3].radius).toBe(23);
    paint.strokeWidth = 3;
    expect(paint.neurons[2].strokeWidth).toBe(3);
    paint.strokeColor = "red";
    expect(paint.neurons[5].strokeColor).toBe("red");
    paint.bgColor = "green";
    expect(paint.neurons[1].bgColor).toBe("green");
  });

  test("TransitionNetwork", async () => {
    const paint = new TransitionNetwork(svg);
    let params = {
      distanceNeurons: 12,
      distanceLayers: 20,
    };

    paint.generateNeuronLayers(params, 2, 3, 5, 5);
    expect(paint.neurons.length).toBe(15);
    paint.transitionInterval = 0;
    paint.transitionTime = 0;
    paint.positionUpdater = shiftNeurons;
    await paint.startRendering(1); // 1 iteration
    paint.checkSvg = false;
    expect(paint.neurons[0].posX).toBe(paint.neurons[14].posX);
    expect(paint.neurons[0].posY).toBe(10);
  });
});
