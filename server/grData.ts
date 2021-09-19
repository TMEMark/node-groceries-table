const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://localhost:3000/groceries");
}

const grocerySchema = mongoose.Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

const grocery = mongoose.model("grocery", grocerySchema);

const groceries = [
  { _id: 1, name: "Milk", quantity: 2, price: 5.99 },
  { _id: 2, name: "Beer", quantity: 6, price: 11 },
  { _id: 3, name: "Watermelon", quantity: 1, price: 38.8 },
];

grocery.insertMany(groceries, function (error, docs) {
  if (error) {
    return console.error(error);
  } else {
    console.log(groceries);
  }
});
