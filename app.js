// Your First Database: the shop's inventory
// Run it with: npm start
import { connect, disconnect } from "./db.js";

const client = await connect();

// ---------- Part 2: CREATE ----------
const db = client.db("inventoryDB");
const products = db.collection("products");

const before = await client.db().admin().listDatabases();
console.log("Database:", before.databases.map((d) => d.name));

const hoodie = await products.insertOne({
    _id: "hoodie",
    name: "West-MEC Hoodie",
    price: 38,
    stock: 3
});

console.log("insertOne added:", hoodie.insertedId);

const more = await products.insertMany([
    {
        _id: "tee",
        name: "Code Crew Tee",
        price: 18,
        stock: 10
    },
    {
        _id: "cap",
        name: "Snapback Cap",
        price: 22.5,
        stock: 5
    },
    {
        _id: "lanyard",
        name: "Lanyard",
        price: 6,
        stock: 0
    }
]);

console.log("insertMany added:", more.insertedCount);

const after = await client.db().admin().listDatabases();
console.log("Databases now:", after.databases.map((d) => d.name));

// ---------- Part 3: READ ----------
// YOUR CODE: Part 3
const all = await products.find({}).toArray();
console.table(all);

const inStock = await products.find({ stock: { $gt: 0 } }).toArray();
console.log("In stock:", inStock.map((p) => p.name));

const soldOut = await products.find({ stock: 0 }).toArray();
console.log("Sold out:", soldOut.map((p) => p.name));

const cap = await products.findOne({ _id: "cap" });
console.log("The cap costs:", cap.price);

const socks = await products.findOne({ _id: "socks" });
// ---------- Part 4: UPDATE ----------
// YOUR CODE: Part 4, UPDATE
const sale = await products.updateOne(
    { _id: "hoodie" },
    { $set: { price: 30 } }
);

console.log(
    "updateOne matched:", sale.matchedCount,
    "modified:", sale.modifiedCount
);

await products.updateOne(
    { _id: "lanyard" },
    { $inc: { stock: 5 } }
);

console.log(await products.findOne({ _id: "lanyard" }));
// ---------- Part 4: DELETE and DROP ----------
// YOUR CODE: Part 4, DELETE and DROP
const gone = await products.deleteOne({ _id: "cap" });

console.log("deleteOne deleted:", gone.deletedCount);

console.log("Products left:", await products.countDocuments({}));

await db.dropDatabase();

const last = await client.db().admin().listDatabases();

console.log(
    "After dropDatabase:",
    last.databases.map((d) => d.name)
);

await disconnect();