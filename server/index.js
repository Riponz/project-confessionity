const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoutes');
const postRoute = require('./routes/postRoutes');
const groupRoute = require('./routes/groupRoutes');

const PORT = 3000
const app = express();



require('dotenv').config()


app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


mongoose.connect('mongodb+srv://biswasdiganta2001:hxuhYZ6LdwCapRjU@cluster0.vn82wq6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('Connected to database')
})




app.use("/user", userRoute)
app.use("/post", postRoute)
app.use("/group", groupRoute)


// Function to make the HTTP request
function makeRequest() {
    fetch("https://confessionity-server-2-0.onrender.com/post/getpost")
        .then(() => console.log("up and running"))
        .catch(err => console.log("opps! server down"))
}


makeRequest();

setInterval(makeRequest, 13 * 60 * 1000)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}
)