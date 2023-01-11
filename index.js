const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://projects:xsScaYv4fYLP1gzo@cluster0.gvfpmor.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const collection = client.db("portfolio").collection("projects");


        app.get("/projects", async (req, res) => {
            const query = {};
            const cursor = await collection.find(query);
            const projects = await cursor.toArray();
            res.send(projects)
        });

        app.post("/projects", async (req, res) => {
            const { title, smallDesc, liveSite, frontCode, hasBackendLink, backendLink, email, primaryImage, secondaryImage, tertiaryImage } = req.body;

            const query = {
                title: title,
                liveSite: liveSite
            }
            const cursor = collection.find(query);
            const exist = await cursor.toArray();


            const data = {
                title, smallDesc, liveSite, frontCode, backendLink, email, primaryImage, secondaryImage, tertiaryImage
            }

            if (email === "smdshakibmia2001@gmail.com") {
                if(hasBackendLink) {
                    if (title && smallDesc && liveSite && frontCode && backendLink) {
                        if (exist.length) {
                            res.send({ message: "Site Already exists" })
                        } else {
                            const cursor = await collection.insertOne(data);
                            // const response = cursor.toArray();
                            res.send({ status: 200, message: "Adding the Site" })
                        }
    
                    } else {
                        res.send({ statusCode: 204, message: "No field can be empty" })
                    }
                } else {
                    if (title && smallDesc && liveSite && frontCode) {
                        if (exist.length) {
                            res.send({ message: "Site Already exists" })
                        } else {
                            const cursor = await collection.insertOne(data);
                            // const response = cursor.toArray();
                            res.send({ status: 200, message: "Adding the Site" })
                        }
    
                    } else {
                        res.send({ statusCode: 204, message: "No field can be empty" })
                    }
                }
            } else {
                res.status(401);
                res.send({ message: "Unauthorized" })
            }
        })

        app.delete("/projects/:id", async (req, res) => {
            // console.log(req.params.id === "63be6cd19ecbbf65d6f9b07c");
            const query = {
                _id: new ObjectId(req.params.id)
            }
            const cursor = await collection.deleteOne(query)
            // const response = await cursor.toArray();

            // console.log(cursor);
            res.send(cursor)
        })

    } finally { }
}

run().catch(console.dir)


app.get("/", (req, res) => res.send({ message: "Welcome to project management" }));

app.listen(port, () => console.log("listening", port))