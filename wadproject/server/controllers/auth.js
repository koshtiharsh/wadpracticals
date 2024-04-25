
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/Users');
const { Mongoose } = require('mongoose');

// register user


const register = async(req,res)=>{
    try {
        
        const {
            firstName,
            lastName,
            email,
            password,
            picturepath,
            friends,
            location,
            occupation

        } = req.body;
        const salt = await bcrypt.genSalt();

        const passwordHash = await bcrypt.hash(password,salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
            picturepath,
            friends,
            location,
            occupation,
            
            
        })
            const savedUser = await newUser.save();
        
            res.status(201).json(savedUser)



    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
}

// logging in 

const login=async(req,res)=>{
    try {

        
        const {email,password} = req.body;
        const user =  await User.findOne({email:email})
        if(!user){
            return res.status(400).json({msg:"user not exist"})
        }
        
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({msg:"Invalid Credentials"})
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRETE)
        delete user.password;
        res.status(200).json({token,user})


    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports ={register,login};