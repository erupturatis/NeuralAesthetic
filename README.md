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
- [Contributing](#contributing)
- [License](#license)

<!-- ABOUT THE PROJECT -->

## About The Project

NeuralAesthetics is a JavaScript library for creating neural networks on web pages. Here's what you need to know:

- It's perfect for web developers and anyone interested adding gorgeous neural networks to their webpages
- With NeuralAesthetics, you can add a unique visual element to your website and take your web design to the next level.
- Use the premade functions and modify the examples for easy eye catching neural networks
- Customize your neural networks and their motion as much as you want

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Powered by:

[![d3js logo](https://d3js.org/logo.svg)](https://d3js.org/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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

## Documentation

## Positioning

As I said in usage there are 2 premade positioning types and a way to make any custom position you want

### Layer Positioning

The `layerPositioning` function arranges the neurons in layers with a specified number of neurons per layer. The function takes a set of parameters that define the distance between the neurons and the layers, as well as the number of neurons in each layer.

#### Parameters

- `params: layerParams` - An object containing the following properties:
  - `distanceNeurons: number` - The distance between neurons.
  - `distanceLayers: number` - The distance between layers.
  - `layers: number[]` - An array containing the number of neurons in each layer.

#### Examples

Here are some examples of how to use the `layerPositioning` function:

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

#### Custom Positioning

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

### Transition Network Rendering

#### Parameters

#### Premade transition functions

#### Custom transition parameters

### Physics Network Rendering

#### Parameters

#### Premade Forces functions

#### Custom forces parameters

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>
