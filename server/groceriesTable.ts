// const express = require("express");
// const app = require("express");
// const typescript = require("typescript");

function grocData(name, quantity, price) {
  this.name = name;
  this.quantity = quantity;
  this.price = price;
}

var groc = new Array();
groc[0] = new grocData("Milk", 2, 5.99);
groc[1] = new grocData("Beer", 6, 11);
groc[2] = new grocData("Watermelon", 1, 38.8);

let chartSumUp = groc.reduce(function (accumulator, item) {
  var price = groc.reduce(
    (accumulator, item) =>
      accumulator + item.quantity * (item.price + item.price * 0.18),
    0
  );

  var quantity = groc.reduce(
    (accumulator, item) => accumulator + item.quantity,
    0
  );

  var object = {
    numberOfArticles: quantity,
    taxes: 18,
    totalPrice: price,
  };
  return object;
}, 0);

console.log(chartSumUp);
