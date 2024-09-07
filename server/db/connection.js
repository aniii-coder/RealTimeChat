const mongoose = require('mongoose');

const url = `mongodb+srv://<username>:<password>@cluster0.7vohf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`


mongoose.connect(url)
.then(()=>{
    console.log('Connected to db')
})
.catch((err) => {
    console.log('error', err)
})
    


