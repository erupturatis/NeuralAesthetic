import { JSDOM } from "jsdom";
import { BasePainter } from "../../src";

describe("test integration ", () => {
  let dom;
  beforeAll(() => {
    dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
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

  test("setters for neuron props", () => {
    let svg = createMockSvg(1000, 500);
    dom.window.document.body.appendChild(svg);
    let painter = new BasePainter(svg);

    expect(painter.center.x).toBe(500);
    expect(painter.center.y).toBe(250);
  });
});
