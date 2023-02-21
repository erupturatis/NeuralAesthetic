import { assignRandomPositions, generateNeuron, BasePainter } from "..";

describe("tests generation of neurons positions", () => {
  test("test random positions", () => {
    const paint = new BasePainter(null, true);
    paint.generateNeurons(10);
    expect(paint.neurons.length).toBe(10);
  });

  test("test layer positions", () => {
    //
    const paint = new BasePainter(null, true);
    let params = {
      distanceNeurons: 12,
      distanceLayers: 20,
    };

    paint.generateNeuronLayers(params, 2, 3, 5, 5);

    expect(paint.neurons.length).toBe(15);
    expect(paint.neurons[2].flags["layer"]).toBe(1); // layers indexed from 0
  });

  test("test arguments adding", () => {
    const paint = new BasePainter(null, true);
    paint.generateNeurons(10);
    paint.addArg(5, "customArg", 23);

    expect(paint.neurons[5].flags["customArg"]).toBe(23);
  });

  test("setters for neuron props", () => {
    const paint = new BasePainter(null, true);
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
});
