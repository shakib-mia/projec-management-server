const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());

console.log(process.env.projectName);


const uri = `mongodb+srv://projects:xsScaYv4fYLP1gzo@cluster0.gvfpmor.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try {
        await client.connect();
        const collection = client.db("portfolio").collection("projects");
        

        app.get("/projects", async (req, res) => {
            const query = {};
            const cursor = collection.find(query);
            const projects = await cursor.toArray();
            res.send(projects)
        })

    } finally {}
}

run().catch(console.dir)


app.get("/", (req, res) => res.send({message: "Welcome to project management"}));

app.listen(port, () => console.log("listening" , port))