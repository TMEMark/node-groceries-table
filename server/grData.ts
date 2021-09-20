const express = require("express");
const mongoose = require("mongoose");
const api = express();
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
    // console.log(doc);
  });
});

api.get("/groceries", function (req, res) {
  var quantity = grocery.aggregate(
    [
      {
        $group: {
          _id: null,
          total: {
            $sum: "$quantity",
          },
        },
      },
    ],
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
  var price = grocery.aggregate(
    [
      {
        $group: {
          _id: null,
          price: {
            $sum: {
              $multiply: [
                {
                  $add: [
                    "$price",
                    {
                      $multiply: ["$price", 0.18],
                    },
                  ],
                },
                "$quantity",
              ],
            },
          },
        },
      },
    ],
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
  var object = {
    numberOfArticles: quantity,
    taxes: 18,
    totalPrice: price,
  };

  res.json(object);

  // console.log(quantity);
});

api.get("/groceries1", function (req, res) {
  var price = grocery.aggregate(
    [
      {
        $group: {
          _id: null,
          price: {
            $sum: {
              $multiply: [
                {
                  $add: [
                    "$price",
                    {
                      $multiply: ["$price", 0.18],
                    },
                  ],
                },
                "$quantity",
              ],
            },
          },
        },
      },
    ],
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );

  // console.log(quantity);
});

api.listen(3001, () => {
  console.log("running on port 3001");
});
