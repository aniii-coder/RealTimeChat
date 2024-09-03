const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

require("./db/connection");

const Users = require("./models/Users.js");
const Conversations = require("./models/Conversations.js");
const Messages = require("./models/Messages.js");
// const Messages = require("./models/Messages.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("welcome");
});

app.post("/api/register", async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      res.status(400).send("plz fill the fields !");
    } else {
      const isAlreadyExist = await Users.findOne({ email });
      if (isAlreadyExist) {
        res.status(400).send("User already exist");
      } else {
        const newUser = new Users({ fullName, email });
        bcryptjs.hash(password, 10, (error, hashedPassword) => {
          newUser.set("password", hashedPassword);
          newUser.save();
          next();
        });
        return res.status(200).send("user registered successfully");
      }
    }
  } catch (error) {}
});

app.post("/api/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("plz fill the fields !");
    } else {
      const user = await Users.findOne({ email });
      if (!user) {
        res.status(400).send("User email or password is incorrect");
      } else {
        const validateUser = await bcryptjs.compare(password, user.password);
        if (!validateUser) {
          res.status(400).send("User email or password is incorrect");
        } else {
          const payload = {
            userId: user.userId,
            email: user.email,
          };
          const JWT_SCRT_KEY = process.env.JWT_SCRT_KEY || "This is key";

          jwt.sign(
            payload,
            JWT_SCRT_KEY,
            { expiresIn: 84600 },
            async (err, token) => {
              await Users.updateOne(
                { _id: user._id },
                {
                  $set: { token },
                }
              );
              user.save();
              next();
            }
          )
          res.status(200).json({ user : {email: user.email, fullName: user.fullName, password: user.hashedPassword}, token: user.token })
        }
      }
    }
  } catch (error){
    console.log(error, 'error');
    
  }
});


app.post('/api/conversation', async(req, res)=>{
  try{
    const { senderId, recieverId } = req.body;
    const newConversation = new Conversations({ members: [ senderId, recieverId ]});
    await newConversation.save();
    res.status(200).send('Conversation created successfully');

  }
  catch(error){
    console.log(error, 'error');
    
  }
})



app.get('/api/conversation/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const conversation = await Conversations.find({ members: { $in: [userId] } });
    const conversationUserData = Promise.all(conversation.map( async (conversation) => {
      const recieverId = conversation.members.find((member) => member != userId);
      const user = await Users.findById(recieverId);
      return { user: {email: user.email, fullName: user.fullName}, conversationId: conversation._id}
    }))
    res.status(200).json(await conversationUserData);
  } catch (error) {
    console.log(error, 'error');
    res.status(500).send('Error retrieving conversation');
  }
})


app.post('/api/message', async(req, res) =>{
  try{
    const  { conversationId, senderId, message } = req.body;
    const newMessage = new Messages({  conversationId, senderId, message });
    await newMessage.save();
    res.status(200).send('Message sent successfully')

  }
  catch(error){
    console.log(error, 'error');   
  }
})


app.get("/api/message/:conversationId", async(req ,res) =>{
  try{
    const { conversationId } = req.params;
    const messages = await Messages.find({ conversationId });
    res.status(200).json(messages);
    }
    catch(error){
      console.log(error, 'error');
      }
})



app.get("/api/users", async(req, res) => {
  try{
    const users = await Users.find();
    const userData = Promise.all(user.map(async (user) =>{
      return { user: {email: user.emai, fullName: user.fullName}, userId: user._id}
    }))
    res.status(200).json(await userData)
    }
    catch(error){
      console.log(error, 'error');
  }
})



app.listen(port, () => {
  console.log("listening port " + port);
});
