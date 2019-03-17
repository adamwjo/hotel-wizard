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

//@route - POST api/profile
//@desc - creates a profile for a user
//@access - private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const profileData = {};
    profileData.user = req.user.id;
    if(req.body.handle) profileData.handle = req.body.handle
    if(req.body.bio) profileData.bio = req.body.bio
    if(typeof req.body.languages !== 'undefined') {
        profileData.languages = req.body.languages.split(',')
    }
    
    Profile.findOne({ user: req.user.id }).then(profile => {
        if(profile){
            //if a profile is found update it
            Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileData },
                { new: true }
            ).then(profile => res.json(profile))
        } else {
            // if a profile is not found create one
            //check if the handle exits
            Profile.findOne({ handle: profileData.handle }).then(profile => {
                if (profile) {
                    errors.handle = 'Handle already exits'
                    res.status(400).json(errors)
                }
                //save profile
                new Profile(profileData).save().then(profile => res.json(profile))
            })
        }
    })
})


module.exports = router;