const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../../config.js');




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

//@route - GET /api/users/login
//@desc - Log user in and return JWT token
//@access Public
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password;
    //find the user by email;
    User.findOne({email: email})
        .then(user => {
            //check for user
            if(!user){
                return res.status(404).json({email: 'User with this email cannot be found'})
            }
            //check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch){
                    //when the user is matched create a payload

                    const payload = { 
                        _id: user.id, 
                        first_name: user.first_name, 
                        last_name: user.last_name
                    } // this is the jwt payload

                    //now the token can be signed
                    jwt.sign(payload, config.SECRET, { expiresIn: 3600 },
                        (error, token) => {
                            res.json({
                                message: 'successful login',
                                token: 'Bearer ' + token
                            })
                    } );

                } else {
                    return res.status(400).json({password: 'invalid password'})
                }
            })
        })
        .catch(err => console.log(err))
})

//@route -  GET api/users/current-user
//@desc - returns current user through jwt auth
//@access - private
router.get('/current-user', passport.authenticate('jwt', { session: false}), (req, res) => {
    res.json({
        message: 'success!'
    })
})



module.exports = router;