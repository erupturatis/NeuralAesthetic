<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="https://cdn.discordapp.com/attachments/864542134391275543/1079043213920321707/neuralaesthetic.png" alt="Logo" width="80" height="80">
  </a>

<h1 align="center">Neural Aestetics</h1>

  <p align="center">
    NeuralAesthetics is a lightweight and easy-to-use JavaScript library for generating eye-catching neural networks on web pages
    <br />
    
  </p>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About The Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
  - [Positioning](#positioning)
    - [Layer Positioning](#layer-positioning)
    - [Circle Positioning](#circle-positioning)
    - [Custom Positioning](#custom-positioning)
  - [Neurons Properties](#neurons-properties)
  - [Connection Properties and Methods](#connection-properties-and-methods)
  - [Transition Network Rendering](#transition-network-rendering)
    - [Parameters](#parameters)
    - [Premade Transition Functions](#premade-transition-functions)
    - [Custom Transition Parameters](#custom-transition-parameters)
  - [Physics Network Rendering](#physics-network-rendering)
    - [Parameters](#parameters-1)
    - [Premade Forces Functions](#premade-forces-functions)
    - [Custom Forces Parameters](#custom-forces-parameters)
  - [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

<!-- ABOUT THE PROJECT -->

## About The Project

NeuralAesthetics is a JavaScript library for creating neural networks on web pages. Here's what you need to know:

- It's perfect for web developers and anyone interested adding gorgeous neural networks to their webpages
- With NeuralAesthetics, you can add a unique visual element to your website and take your web design to the next level.
- Use the premade functions and modify the examples for easy eye catching neural networks
- Customize your neural networks and their motion as much as you want

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>

### Powered by:

[![d3js logo](https://d3js.org/logo.svg)](https://d3js.org/)

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

1.Install NPM package
<br/>

```sh
npm install neuralaesthetics
```

<!-- USAGE EXAMPLES -->

## Usage

The library can generate 2 types of networks that will differ in the way their movement in created. <br/>
The first one the `TransitionNetwork` class which as the name suggests is based on properties transition from one state to the next at a certain interval given. The second one will be the ` PhysicsNetwork` is using frames and can use some "pseudo forces" I created to simulate some basics physics. I will put some examples below. It should be noted that the Physics network is more resource-demanding so it might impact your website performance compared to its counterpart

To start using the library you will first need an svg element.

```
const svg = document.querySelector("#root-svg");

```

The next 2 steps are common for both type of networks

- Creating the network

```
let paint = new TransitionNetwork(svg);

```

- Arranging the neurons in the desired position. There are 2 premade setups, layer and circle arrangement or custom arrangement where you can pass a function that takes as arguments all the parameters you might need.
- [Arrangements](#arrangements)

```
paint.arrangeInCircle({
      neurons: 10,
      radius: 150,
    });

```

```
paint.generateNeuronLayers({
      distanceLayers: 50,
      distanceNeurons: 50,
      layers: [2, 3, 4, 5, 6],
    });


```

Or

```
paint.arrangeCustom(6, (neurons) => { // an example of a custom arrangement function
      neurons[0].posX = 0;
      neurons[0].posY = 0;
      neurons[1].posX = 0;
      neurons[1].posY = 100;
      neurons[2].posX = 0;
      neurons[2].posY = 200;
      neurons[3].posX = 100;
      neurons[3].posY = 0;
      neurons[4].posX = 100;
      neurons[4].posY = 100;
      neurons[5].posX = 100;
      neurons[5].posY = 200;
    });

```

- You can also add [connections](#connections)
  -Now the `TransitionNetwork` and `PhysicsNetwork` begin to differ in the rendering methods - [Rendering the `TransitionNetwork`](#transition-network-rendering) - [Rendering the `PhysicsNetwork`](#physics-network-rendering)

# Documentation

## Positioning

As I said in usage there are 2 premade positioning types and a way to make any custom position you want

### Layer Positioning

The `generateNeuronLayers` function arranges the neurons in layers with a specified number of neurons per layer. The function takes a set of parameters that define the distance between the neurons and the layers, as well as the number of neurons in each layer.

### Parameters

- `params: layerParams` - An object containing the following properties:
  - `distanceNeurons: number` - The distance between neurons.
  - `distanceLayers: number` - The distance between layers.
  - `layers: number[]` - An array containing the number of neurons in each layer.

### Examples

Here are some examples of how to use the `generateNeuronLayers` function:

```typescript
// Example 1: Create 4 layers of 2, 4, 6, and 8 neurons with a distance of 50 between neurons and 100 between layers
paint.generateNeuronLayers({
  distanceLayers: 100,
  distanceNeurons: 50,
  layers: [2, 4, 6, 8],
});
```

```
// Example 2: Create 3 layers of 3, 3, and 3 neurons with a distance of 40 between neurons and 80 between layers
paint.generateNeuronLayers({
  distanceLayers: 80,
  distanceNeurons: 40,
  layers: [3, 3, 3],
});
```

<p align="center">
  <img src="https://cdn.discordapp.com/attachments/864542134391275543/1079068509054697564/image.png" width="400" />
  <img src="https://cdn.discordapp.com/attachments/864542134391275543/1079069788854292550/image.png" width="400" /> 
</p>
This are the 2 results
Note that the second network is zoomed.

### Circle Positioning

The `arrangeInCircle` function arranges the neurons in a circle with a specified radius. The function takes a set of parameters that define the number of neurons to arrange and the radius of the circle.

### Parameters

- `params: circleParams` - An object containing the following properties:
  - `radius: number` - The radius of the circle the neurons are arranged in
  - `neurons: number` - The number of neurons to arrange in the circle.

### Examples

Here are some examples of how to use the `arrangeInCircle` function:

```typescript
// Example 1: Arrange 20 neurons in a circle with a radius of 200
paint.arrangeInCircle({
  neurons: 20,
  radius: 200,
});
```

```
// Example 2: Arrange 4 neurons in a circle with a radius of 100
paint.arrangeInCircle({
  neurons: 4,
  radius: 100,
});
```

### Custom Positioning

The `arrangeCustom` function arranges the neurons in a custom arrangement defined by the user. The function takes a set of parameters that define the number of neurons to arrange and a callback function that sets the initial positions of the neurons in the custom arrangement.

### Parameters

- `numNeurons: number` - The number of neurons to arrange in the custom arrangement.
- `customArrangement: initialPositions` - A callback function that sets the initial positions of the neurons in the custom arrangement.

### How it works

The `arrangeCustom` function generates the specified number of neurons using the `generateNeurons` method. It then calls the `customArrangement` callback function, which sets the initial positions of the neurons in the custom arrangement.

The `customArrangement` function takes an array of `neuron` objects as its argument. It can set the `posX` and `posY` properties of each `neuron` object to specify its initial position in the custom arrangement.

Here's an example of how to use the `arrangeCustom` function to create a custom arrangement of 6 neurons:

```typescript
paint.arrangeCustom(6, (neurons) => {
  neurons[0].posX = 0;
  neurons[0].posY = 0;
  neurons[1].posX = 0;
  neurons[1].posY = 100;
  neurons[2].posX = 0;
  neurons[2].posY = 200;
  neurons[3].posX = 100;
  neurons[3].posY = 0;
  neurons[4].posX = 100;
  neurons[4].posY = 100;
  neurons[5].posX = 100;
  neurons[5].posY = 200;
});
```

In this example, a custom arrangement of 6 neurons is created using the arrangeCustom function. The customArrangement callback function sets the initial positions of the neurons to create a 3x2 grid of neurons.(this example can also be done with generateNeuronLayer)

Note that the arrangeCustom function can be used to create any custom arrangement of neurons, as long as the customArrangement callback function sets the initial positions of the neurons in the desired arrangement.

### Neurons Properties

The `neuron` represents a single neuron in a network.
After generating neurons, the class will have an array called `neurons` which contains all neurons.
Any neuron has the following properties

- `index: number` - The index of the neuron.
- `originalPosX: number` - The original x position of the neuron before any transformations.
- `originalPosY: number` - The original y position of the neuron before any transformations.
- `posX: number` - The current x position of the neuron.
- `posY: number` - The current y position of the neuron.
- `newPosX: number` - The new x position of the neuron after any transformations.
- `newPosY: number` - The new y position of the neuron after any transformations.
- `radius: number` - The radius of the neuron.
- `strokeWidth: number` - The stroke width of the neuron.
- `strokeColor: string` - The stroke color of the neuron.
- `bgColor: string` - The background color of the neuron.
- `flags: { [key: string]: any }` - A dictionary containing additional flags that can be used to identify a specific subset of neurons for effects.
  These are the default properties of a neuron. Note that when arranging neurons with a custom function or a premade function `generateNeurons(number)` will be called which assigns indexes to the neurons

```javascript
export const generateNeuron = (): neuron => {
  let neuron: neuron = {
    index: -1,
    originalPosX: 0,
    originalPosY: 0,
    posX: 0,
    posY: 0,
    newPosX: 0,
    newPosY: 0,
    radius: 20,
    strokeWidth: 1.5,
    strokeColor: "white",
    bgColor: "black",
    flags: {},
  };
  return neuron;
};
```

### Connection properties and methods

The `connection` represents a connection between two neurons in a neural network. Connections live in an array called `connections` and they have the following properties

- `index: number` - The index of the connection.
- `idxNeuron1: number` - The index of the first neuron connected by the connection.
- `idxNeuron2: number` - The index of the second neuron connected by the connection.
- `strokeColor: string` - The stroke color of the connection.
- `strokeWidth: number` - The stroke width of the connection.
- `strokeOpacity: number` - The stroke opacity of the connection.

#### Methods

- `myObj.addFullConnections();` connects all neurons with eachother
- `myObj.addConnections();` will allow you to add connections between existing neurons. For example

```
let paint = new TransitionNetwork(document.querySelector("#root-svg-comp"));
    paint.arrangeCustom(6, (neurons) => {
      neurons[0].posX = 0;
      neurons[0].posY = 0;
      neurons[1].posX = 0;
      neurons[1].posY = 100;
      neurons[2].posX = 0;
      neurons[2].posY = 200;
      neurons[3].posX = 100;
      neurons[3].posY = 0;
      neurons[4].posX = 100;
      neurons[4].posY = 100;
      neurons[5].posX = 100;
      neurons[5].posY = 200;
    });

    paint.addConnections([
      {
        idxNeuron1: 0,// not specifying stroke color and the other properties will lead
        idxNeuron2: 1,// to the default properties
      },

      {
        idxNeuron1: 1,
        idxNeuron2: 2,
      },
      {
        idxNeuron1: 2,
        idxNeuron2: 3,
      },
    ]);// will work since arrangeCustom generates 6 neurons with indexes from 0 to 5.
    //If you try to connect an index bigger than 5 the program will crash
```

## Transition Network Rendering

#### Function: `startRendering` for Transition Network

The `startRendering` function starts the rendering of the transition network by drawing the initial neurons and connections and applying the specified properties. The function takes a set of parameters that define how the rendering should behave.

### Parameters

- `params: renderingParamsTransition` - An object that specifies the rendering parameters for the transition network.

  - `infinite: boolean` - A flag indicating whether the rendering should be infinite or not. If set to `true`, the rendering will continue indefinitely
  - `iterations?: number` - The number of iterations to perform if `infinite` is set to `false`. If set to `undefined` and `infinite` is set to `false`, an error will be thrown.
  - `transitionTime: number` - The duration of the transition animation for the neurons, in milliseconds.
  - `transitionInterval: number` - The interval between each transition step, in milliseconds.
  - `propertiesUpdater: propUpdater` - A callback function that updates the properties of the neurons and connections at each iteration of the rendering. This is a required parameter and an error will be thrown if it is not provided.
  - Note that this function is asynchronous

### How it works

The function draws the inital neurons and connections (if any) . Then the function starts the rendering loop, which applies the `propertiesUpdater` callback function to update the properties of the neurons and connections at each iteration then pauses for the `transitionInterval` in ms . The loop continues until either the specified number of `iterations` is reached or `infinite` is set to `true`.

### Premade transition functions

#### function: `shiftNeurons`

The `shiftNeurons` function is a premade function that can be passed as a callback to the `startRendering` function for the transition network. It updates the positions of the neurons to shift them in a circular fashion, with the last neuron moving to the position of the first neuron, and all other neurons shifting down by one position.

#### Parameters

- `neurons: neuron[]` - An array of neurons representing the current state of the network.
- `connections: connection[]` - An array of connections representing the current state of the network.
- `iter: number` - The current iteration number of the rendering loop.

### How it works

The `shiftNeurons` function updates the `newPosX` and `newPosY` properties of the neurons to shift them in a circular fashion. The last neuron in the array is moved to the position of the first neuron, and all other neurons are shifted down by one position. The function does not update the `posX` and `posY` properties directly, as those are used to store the current positions of the neurons during the rendering loop.

### Custom transition parameters

The `propUpdater` type is a callback function type that can be used as a custom properties updater in the `renderingParamsTransition` parameter of the `startRendering` function for the transition network. It takes three parameters:

- `neurons: neuron[]` - An array of neurons representing the current state of the network.
- `connections: connection[]` - An array of connections representing the current state of the network.
- `iter: number` - The current iteration number of the rendering loop.

The `propUpdater` function should update the `newPosX` and `newPosY` properties of the neurons to reflect their new positions. The other properties like `bgColor` and such can be transition normally to the new desired state.These properties are used during the rendering loop to animate the transition from the old positions to the new positions.

## Physics Network Rendering

#### Function: `startRendering` for PhysicsNetwork

The `startRendering` function starts the rendering of the transition network by drawing the initial neurons and connections and applying the specified properties. The function takes a set of parameters that define how the rendering should behave.

### Parameters

- `params` (required): An object that contains the following properties:
  - `infinite`: A boolean value that determines if the render loop should run indefinitely.
  - `FPS`: A number that specifies the frames per second for rendering.
  - `seconds` (optional): A number that specifies the duration of the render loop in seconds if infinite is set to false
  - `forceLoss` (optional): A number that specifies the amount of force loss between each frame (a force of 100 and a force loss of 0.1 would mean the forces is decreased by 0.1 each frame, becoming 90 after 1 frame)
  - Here it should be noted that this is a "pseudo physics engine", so it tries to simulate the result of a physics engine.
  - `forceMultiplier` (optional): A number that specifies the force multiplier when calculating the new Position at each frame for each neuron. A force multiplier of 0.1 and a force on the x axis of 50 and on y axis of 100 will move the neuron in the next frame with 5 on x axis and 10 on y axis. Additionally if forceLoss is not 0, the force will decrease and so will the neuron movement in a smooth way.
  - `addInitialForces` (optional): A function that adds initial forces for the neurons
  - `addForces` (required): A function that adds forces to the neurons at each frame. Adding small ammount of forces at each frame can simulate something like acceleration or random movement. This should be paired with the other parameters to get the desired effect

#### Render Loop

This method runs a render loop to update the positions of nodes and edges by applying forces to them. The render loop performs the following steps:

- Initializes the forces and dispatches initial forces to the neurons.
- Starts the render loop which continues until either the duration of the loop is over or `infinite` is true.
- Uses the custom AddForce function if provided to modify the current forces in a desired manner
- Applies the forces to the neurons and calculates the new positions of the neurons in the way I described earlier
- Waits for 1000 / `FPS` milliseconds and continues the loop.

### Premade Forces functions

#### centerNeuronForce

This function is a pre-made force updater that can be passed as the addForces parameter to the `startRendering` function in the params object. It applies a force to each neuron that pulls it towards the center of the network

```
    paint.startRendering(
      {
        infinite: true,
        FPS: 60,
        forceLoss: 0.01,
        forceMultiplier: 0.003,
        addForces: centerNeuronForce,
      },
      []
    );
```

Definition

```typescript
export const centerNeuronForce: forceUpdater = (
  neurons: neuron[],
  forces: coord[],
  iter: number
) => {
  for (let idx: number = 0; idx < neurons.length; idx += 1) {
    const neuron: neuron = neurons[idx];
    forces[idx].x += neuron.originalPosX - neuron.posX;
    forces[idx].y += neuron.originalPosY - neuron.posY;
  }
};
```

#### centerIdleMovement

This function is a pre-made force updater that can be passed as a parameter to the `startRendering` function of the Forces Network. It applies a force to each neuron that pulls it towards the center of the network, and adds a random movement if the neuron is too close to its original position. You will see in examples how it works

### Custom forces parameters

The `addForces` parameter is a required function that modifies forces to the neurons at each iteration of the render loop. It takes in the following parameters:

- `neurons` (required): An array of neuron objects.
- `forces` (required): An array of force vectors. This is the array you are supposed to modify for the next frame
- `iter` (required): The current iteration of the render loop.

The `addForces` function should modify the `forces` array to apply forces to the neurons. For example, you could add repulsive forces between neurons to keep them from overlapping or add attractive forces between connected neurons to keep them close together.

The `addInitialForces` parameter is an optional function that adds initial forces to the neurons when the render loop starts. It takes in the same parameters as the `addForces` function:

- `neurons` (required): An array of neuron objects.
- `forces` (required): An array of force vectors.
- `iter` (required): The current iteration of the render loop.

The `addInitialForces` function can be used to set up the initial state of the network before the render loop begins. For example, you could use it to randomly push the neurons or add a gravitational force that pulls all the neurons towards the center of the network.

## Examples

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>
