const express = require('express');

const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');

const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const salt = 10;

const jwt = require("jsonwebtoken");

const {
    uniqueNamesGenerator,
    adjectives,
    colors,
    animals,
} = require("unique-names-generator");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

require('dotenv').config()

//get specific user details
router.get('/getuser', async (req, res) => {


    const uid = req.query.uid
    console.log(uid)

    const user = await User.findOne({ uid: uid });

    console.log("user", user);
    if(user) {

            res.json({
                id: user?._id,
                email: user?.email,
                username: user?.username,
                status: "success",
                message: "success",
            });
        }
            else{
                console.log("no account found")
                res.json({
                    status: "error",
                    message: "no account found!",
                });
            }

    //   res.json({name:"diganta"});
});


//create user
router.post('/adduser', async (req, res) => {

    // const userid = auto-generated
    const email = req.body.email;
    const uid = req.body.uid;
    const username = req.body.username
    console.log(email, " email")
    console.log(uid, " uid")
    console.log(username, " username")

    const user = new User({
        username: username,
        email: email,
        uid: uid,
    });

    console.log("user####")
    // const users = await User.find({ uid: uid });
    // console.log(users.length)
    // if (users.length === 0) {
        console.log("user saved successfully")
        const ret = await user.save();
        const send = {
            uid:uid,
            username: ret.username,
            email: ret.email,
            groups: ret.groups,
            status: "success",
            message: "account created successfully",
        };

        res.json(send);
    // } else {
    //     res.json({ status: "failed", message: "email already exist" });
    // }


});


router.get("/uname/:uid", async (req, res) => {
    const uid = req.params.uid;
    console.log(uid)
    const user = await User.findOne({ uid: uid });
    console.log(user)
    res.json(user?.username)
});


router.post("/addgroup", async (req, res) => {

    const grpId = req.body.grpId
    const userId = req.body.userId

    await User.findOneAndUpdate(
        {
            _id: userId,
        },
        {
            $push: {
                groups: grpId,
            },
        }
    );

    const reslt = await User.findOne(
        {
            _id: userId,
        }
    )

    res.json(reslt)

})


module.exports = router;