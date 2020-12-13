import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'


const authUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body

    const user = await User.findOne({email})
    if (user && (await user.matchPasswords(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: jwt.sign({id: user._id},
                 process.env.JWT_SECRET, {expiresIn: '30d'})
        })
    }else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const getUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User is Not Found')
    }
})

const updateUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    if (user) {
       
            user.name = req.body.name || user.name 
            user.email= req.body.email || user.email
            if(req.body.password){
                user.password = req.body.password
            }
            const updatedUser = await user.save()
    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: jwt.sign({id: updatedUser._id},
                 process.env.JWT_SECRET, {expiresIn: '30d'})
    })
    }
    else{
        res.status(404)
        throw new Error('User Not Found')
    }
})

const registerUser = asyncHandler(async(req,res)=>{
    const {name, email , password} = req.body
    const userExist = await User.findOne({email})
    if (userExist){
       res.status(400)
       throw new Error('User Already Exist')
    }
        const user = await User.create({name, email, password})
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: jwt.sign({id: user._id},
                 process.env.JWT_SECRET, {expiresIn: '30d'})
        })
    } else {
       res.status(400)
       throw new Error('Invalid user data')
    }
})



export {authUser,
     getUserProfile,
     updateUserProfile,
      registerUser
    }