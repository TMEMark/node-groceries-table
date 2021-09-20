const mongoose = require("mongoose");
import api from "express";
const dotenv = require("dotenv");

dotenv.config();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/groceries");
}

const grocery = mongoose.model("grocery", {
  _id: { type: Number },
  name: { type: String },
  quantity: { type: Number },
  price: { type: Number },
});

const groceryArray = [
  { _id: 1, name: "Milk", quantity: 2, price: 5.99 },
  { _id: 2, name: "Beer", quantity: 6, price: 11 },
  { _id: 3, name: "Watermelon", quantity: 1, price: 38.8 },
];

groceryArray.forEach(function (n) {
  grocery.findOneAndUpdate(n, n, { upsert: true }, function (err, doc) {
    console.log(doc);
  });
});

api.get("/grocery", function (req, res) {
  res.send("hello world");
});
