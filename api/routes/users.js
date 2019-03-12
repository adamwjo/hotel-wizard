const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');



//@route -  GET /api/users/test
//@desc - tests users route
//@access - public
router.get('/test', (req, res) => {
    res.json({
        message: "user route connected"
    });
});

//@route - GET /api/users
//@desc - user index for test purposes
//@access - test
router.get('/', (req, res) => {
    User.find().then(users => {
        res.json(users)
    });
});

//@route - POST /api/users/user-sign-up
//@desc - User sign up route
//@access - public
router.post('/user-sign-up', (req, res) => {
    User.findOne({
        email: req.body.email
    }).then(
        user => {
            if(user){
                return res.status(400).json({
                    email: 'Email already exists'
                })
            } else {
                const newUser = new User({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if (err) throw err;
                      newUser.password = hash;
                      newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                    });
                  })
            }
        }
    )
});



module.exports = router;