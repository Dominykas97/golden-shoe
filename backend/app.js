const express = require("express");
const app = express();
const port = 4000;
const mongodb = require("./mongodb");
const uri =
    "mongodb+srv://mongo:bpmtj4zw8oXvGKfl@cluster0.1utsn.mongodb.net/golden-shoe-db?retryWrites=true&w=majority";

app.get("/", async (req, res) => {
    res.send("Hello World!");
});

app.get("/shoes", async (req, res) => {
    const mongoClient = mongodb.get();
    const shoes = await mongoClient
        .db("golden-shoe-db")
        .collection("shoes")
        .find({})
        .toArray();
    console.log(shoes);
    res.json(shoes);
});

app.get("/shoes/:id", async (req, res) => {
    const shoeId = req.params.id;
    console.log(shoeId);
    const mongoClient = mongodb.get();
    const shoe = await mongoClient
        .db("golden-shoe-db")
        .collection("shoes")
        .findOne({ id: shoeId });
    console.log(shoe);
    res.send(shoe);
});

app.get("/orders", async (req, res) => {
    const mongoClient = mongodb.get();
    const orders = await mongoClient
        .db("golden-shoe-db")
        .collection("orders")
        .find({})
        .toArray();
    console.log(orders);
    res.send(orders);
});

app.get("/orders/:id", async (req, res) => {
    const orderId = req.params.id;
    console.log(orderId);
    const mongoClient = mongodb.get();
    const order = await mongoClient
        .db("golden-shoe-db")
        .collection("orders")
        .findOne({ orderId: orderId });
    console.log(order);
    res.send(order);
});

// app.get("/my/orders", async (req, res) => {
//     const mongoClient = mongodb.get();
//     const user = await mongoClient
//         .db("golden-shoe-db")
//         .collection("users")
//         .findOne({});
//     console.log(user);
//     const userId = user._id;


//     const orders = await mongoClient
//         .db("golden-shoe-db")
//         .collection("orders")
//         .find({ userId: userId })
//         .toArray();
//     console.log(orders);
//     res.send(orders);
// });


mongodb.connect(uri, function (err) {
    if (err) {
        console.log("Unable to connect to MongoDB.");
        process.exit(1);
    } else {
        app.listen(port, function () {
            console.log(`Listening on port ${port}...`);
        });
    }
});
