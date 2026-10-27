// Your First Database: the shop's inventory
// Run it with: npm start
import { connect, disconnect } from "./db.js";

const client = await connect();

// ---------- Part 2: CREATE (the database, the collection, the first products) ----------
// YOUR CODE: Part 2
    const db = client.db("inventory");
    const products = db.collection("products");

    await products.insertOne({
        _id: "Hoodie",
        name: "Hoodie",
        price: 35
    });

    await products.insertMany([
        {
            _id: "Shirt",
            name: "T-Shirt",
            price: 20
        },
        {
            _id: "hat",
            name: "Hat",
            price: 15
        }
    ])
// ---------- Part 3: READ ----------
// YOUR CODE: Part 3

// ---------- Part 4: UPDATE ----------
// YOUR CODE: Part 4, UPDATE

// ---------- Part 4: DELETE and DROP ----------
// YOUR CODE: Part 4, DELETE and DROP

await disconnect();
