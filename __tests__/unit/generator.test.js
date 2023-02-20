import { assignRandomPositions, generateNeuron, BasePainter } from "..";

describe("tests generation of neurons positions", () => {
  test("test random positions", () => {
    const paint = new BasePainter();
    paint.generateNeurons(10);
    expect(paint.neurons.length).toBe(10);
  });

  test("test layer positions", () => {
    //
    const paint = new BasePainter();
    paint.generateNeuronLayers(2, 3, 5, 5);
    expect(paint.neurons.length).toBe(16);
    expect(paint.neurons[2].args["layer"]).toBe(1); // layers indexed from 0
  });

  test("test arguments adding", () => {
    const paint = new BasePainter();
    paint.generateNeurons(10);
    paint.addArg(5, "customArg", 23);

    expect(paint.neurons[5].args["customArg"]).toBe(23);
  });
});
