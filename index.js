const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000


/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

app.use(express.json())
app.use(cors())


/*
|--------------------------------------------------------------------------
| Mongodb connection
|--------------------------------------------------------------------------
*/

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

const uri = `mongodb+srv://${dbUser}:${dbPass}@maincluster0.m4dyknx.mongodb.net/?appName=MainCluster0`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})


/*
|--------------------------------------------------------------------------
| root route
|--------------------------------------------------------------------------
*/

app.get('/', (req, res)=>{
    res.send('hello nature')
})

/*
|--------------------------------------------------------------------------
| all route
|--------------------------------------------------------------------------
*/

const run = async()=>{
    try {

        // mongodb connection
        client.connect()

        const plantsCollection = client.db("flora_tracker_DB").collection("plants");

        /*
        |--------------------------------------------------------------------------
        | all route
        |--------------------------------------------------------------------------
        */

        app.get('/plants', async(req, res)=>{
            const result = await plantsCollection.find().toArray()
            res.send(result)
        })

        app.post('/plants', async(req, res)=>{
            const newPlant = req.body
            const result = await plantsCollection.insertOne(newPlant)
            res.send(result)
        })

        app.delete('/plants/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const result = await plantsCollection.deleteOne(query)
            res.send(result)
        })

        app.patch('/plants/:id', async(req, res)=>{
            const id = req.params.id
            const filter = {_id : new ObjectId(id)}
            const updatedDoc = {
                $set: req.body
            }
            const result = await plantsCollection.updateOne(filter, updatedDoc)
            res.send(result)
        })

        // send a ping to suer connection is correct
        const ping = await client.db('flora_tracker_DB').command({ping: 1})
        if(ping.ok === 1){

            console.log('pinged you deployment. you successfully connect to the mongodb');
        }
        
    } catch (error) {
        console.error('database connection failed', error)
    }

}
run()




app.listen(port, ()=>{
    console.log(`listening from port ${port}`);
})
