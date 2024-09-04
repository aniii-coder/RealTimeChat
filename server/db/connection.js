const mongoose = require('mongoose');

const url = `mongodb+srv://<userName>:<password>@cluster0.7vohf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`


mongoose.connect(url)
.then(()=>{
    console.log('Connected to db')
})
.catch((err) => {
    console.log('error', err)
})
    


// const mongoose = require('mongoose');
// const url = ('mongodb+srv://chat-app-admin:NewPasswordMongo%4093263@cluster0.7vohf.mongodb.net/')

// mongoose.connect(url)
// .then(()=>{
//     console.log('Connected to db')
// })
// .catch((err) => {
//     console.log('error', err)
// })



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://chat-app-admin:NewPasswordMongo%4093263@cluster0.7vohf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// // usrnam:chat-app-admin

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
