const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load models
const Profile = require('../models/Profile.js');
const User = require('../models/User.js');

//@route - GET api/profile/test
//@desc - Tests profile route
//@access - public
router.get('/test', (req, res) => {
    res.json({
        message: "profile route connected"
    });
});

//@route - GET api/profile
//@desc - gets the current users profile
//@access - private

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                errors.noProfile = 'Profile could not be found'
                return res.status(404).json(errors)
            }
            res.json(profile);
        })
        .catch(err => res.json(404).json(err));
});


module.exports = router;