const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//Middleware
app.use(cors());
app.use(express.json());

//pass : PM8PDkrV5a8F2E1q
// user: database

const uri =
  "mongodb+srv://user1:PM8PDkrV5a8F2E1q@cluster0.5yyvobb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const userCollection = client.db("nodeMongoCrud").collection("users");

    //R
    // Database to cliend side vews
    app.get("/users", async (req, res) => {
      const query = {};

      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    //update User
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await userCollection.findOne(query);
      res.send(user);
    });

    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const user = req.body;
      const option = { upsert: true };
      const updateUser = {
        $set: {
          name: user.name,
          email: user.email,
        },
      };
      const result = await userCollection.updateOne(filter, updateUser, option);
      res.send(result);
      console.log(updateUser);
    });

    //C
    // Cliend side data reseve server
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);

      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    //D
    //Database Delete infomeson
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("Deleting ID:", id);
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      console.log(result);
      res.send(result);
    });
  } finally {
  }
}

run().catch((err) => console.log(err));

app.get("/users", (req, res) => {
  res.send("Hello from node mongo crud server");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
