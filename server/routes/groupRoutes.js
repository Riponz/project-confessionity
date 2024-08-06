const express = require('express');

const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');

const Group = require('./../models/groupModel');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

require('dotenv').config()

router.post('/creategroup', (req, res) => {
    const name = req.body.name;
    const bio = req.body.bio;
    const topicStr = req.body.topic;
    const admin = req.body.uid; //admin is also a member of the group
    const topic = topicStr.split(" ").slice(0, 3)

    try {
        const group = new Group({
            name: name,
            bio: bio,
            topics: topic,
            admin: admin,
            members: [admin]
        })
        group.save()
        res.json({ message: "group created successfully" })
    }
    catch (err) {
        res.json({ message: err })
    }



})

router.get('/usergroups/:uid', async (req, res) => {
    const uid = req.params.uid;
    const data = await Group.find({ members: { $in: uid } })
    res.json(data)
})


router.get('/groupposts/:gid', async (req, res) => {
    const gid = req.params.gid;
    console.log(gid)
    const data = await Group.findOne({ _id: gid })
    res.json(data)
})

router.post('/addmember', async (req, res) => {
    const uid = req.body.uid;
    const gid = req.body.gid;

    const group = await Group.findOne({ _id: gid })
    group.members.push(uid)
    group.save()

    res.json(group)

})


router.post('/addpost', async (req, res) => {
    const username = req.body.username;
    const content = req.body.content;
    const gid = req.body.gid;

    const group = await Group.findOne({ _id: gid })

    group.posts.push({
        username: username,
        content: content
    })

    group.save()

    res.json(group)

})

// router.get('/getgroup/:gid', async (req, res) => {
//     const gid = req.params.gid;
//     const groups = await Group.find({ _id: gid });
//     res.json(groups)
// })

router.get('/', async (req, res) => {
    const groups = await Group.find();
    res.json(groups)
})

router.get('/groupsearch/:name', (req, res) => {
    const name = req.params.name;
    console.log(name)
    Group.find({ name: { $regex: `${name}`, $options: 'i' } })
        .then((groups) => {
            console.log(groups)
            res.json(groups)
        })
})

module.exports = router;