const User = require('../model/auth.model');
const validation = require('./validation/validation');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.postRegister = async (req, res) => {
    try {
        // Validate Data
        const val = await validation.validateRegistar(req.body);
        // Check If Email Exist
        const checkEmail = await User.findOne({email: req.body.email});
        if(checkEmail) return res.status(400).send('Email Already Exist');
        // Hashed Password
        const saltRounds = 10;
        const hashedpassword = await bcrypt.hashSync( req.body.password, saltRounds);
        // Create New User
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedpassword
        });
        await user.save();
        res.send({user: user._id});
    } catch (error) {
        res.status(400).send(error.details[0].message);
    }
};

exports.postLogin = async (req, res) => {
    try {
        // Validate Data
        const val = await validation.validateLogin(req.body);
        // Check If Email Exist In DB
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Email is not found');

        // Check Password Is Correct
        const comp = await bcrypt.compare(req.body.password, user.password);
        // If Password Is Worng
        if(!comp) return res.status(400).send('Invalid Password');
        // If Password Correct
        // Create And Assgin A Token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);      
    } catch (error) {
        res.status(400).send(error.details[0].message);
    }
};
