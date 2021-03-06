/*
 * This example demonstrates how the neural network can be
 * trained to successfully solve the exclusive or problem.
 *
 */

"use strict";

const NeuralNetwork = require("../index.js");


/*
 * We create a network with two input neurons (XOR has two inputs),
 * seven neurons in the hidden layer
 * (it is not necessary to have seven, less neurons would work as well)
 * and one output neuron (XOR returns either 1 or 0).
 * We also set the learning rate to 0.6. (You are free to play with this value)
 */
let NN = NeuralNetwork(2, 7, 1, 0.6);


/*
 * Here we define our inputs.
 * There are only 4 possible combinations,
 * so it is rather easy.
 *
 */
let inputs = [
  { input: [1, 1], expected: 0 },
  { input: [1, 0], expected: 1 },
  { input: [0, 1], expected: 1 },
  { input: [1, 1], expected: 0 }
];


/*
 * We will give the network 10000 * 4 examples
 * to train on.
 * Note that it is best to alternate the inputs that we give to the network
 * rather than just repeatedly give it the same input.
 */
for (let i = 0; i < 10000; i++) {
  for (let j = 0; j < inputs.length; j++) {
    NN.train(inputs[j]);
  }
}


/*
 * Time to see how well we trained the network..
 * The result should look like this:
 *
 * Testing the neural network...
 * input: [ 1, 1 ] | output: 0.007655196970540926
 * input: [ 1, 0 ] | output: 0.9918757893434477
 * input: [ 0, 1 ] | output: 0.9925807646447175
 * input: [ 1, 1 ] | output: 0.007655196970540926
 *
 */
console.log("Testing the neural network...");
for(let i = 0; i < inputs.length; i++) {
  console.log("input:", inputs[i].input, "| output:", NN.test(inputs[i].input));
}


/*
 * Optionally we can save the weights
 * so that the progress we made is not lost.
 */
NN.save("saved/XOR.json", (err) => {
  if(err) {
    console.error(err);
  } else {
    console.log("saved successfully");
  }
});
