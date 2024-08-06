const express = require('express');
const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const cors = require('cors');

const Post = require('../models/postModel');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

require('dotenv').config()


router.get('/getpost', async (req, res) => {

    const posts = await Post.find();

    res.json(posts)

});



router.post('/addpost', async (req, res) => {

    const username = req.body.username;
    const userid = req.body.uid;
    const content = req.body.content;
    const topicstr = req.body.topic;
    const topics = topicstr.split(/\s+/).slice(0, 3)
    try {
        const post = new Post({
            username: username,
            uid: userid,
            content: content,
            topics: topics
        });

        await post.save();

        res.send({ message: "Upload successful!" })
    } catch (err) {
        res.json({ message: "Validation error. Try again!" })
    }


})


router.post("/getuserpost", async (req, res) => {
    const uid = req.body.uid;
    console.log(uid)
    const posts = await Post.find({ uid: uid });
    // console.log(posts)

    res.json(posts)
})


router.delete("/deletepost/:pid", async (req, res) => {
    const pid = req.params.pid;
    try {
        const post = await Post.findOneAndDelete({ _id: pid })
        res.json({ message: "deleted successfully!" })
    } catch (err) {
        res.json({ message: err.message })
    }
})


router.post("/addcomment", async (req, res) => {
    const comment = req.body.comment;
    const pid = req.body.pid;
    console.log(comment)
    try {
        const post = await Post.findOneAndUpdate({ _id: pid }, { "$push": { "comments": comment } })
        console.log("post added successfully")
        res.json({ message: "added successfully!" })
    } catch (err) {
        res.json({ message: "comment was not added!" })
    }
})


router.get("/postbytopic", async (req, res) => {
    const topic = req.body.topic;
    const posts = await Post.find({ topics: topic })
    res.json(posts)
})


module.exports = router