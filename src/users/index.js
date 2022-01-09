import express from 'express'
import UserModel from './schema.js'

const userRouter=express.Router()

userRouter
.post('/register',async(req,res,next)=>{
    try {
        const user=new UserModel(req.body)
        const{_id}=user.save()
        res.status(201).send(user)
    } catch (error) {
        next(error)
    }
})
.post('/login',async(req,res,next)=>{
    try {
        const{email,pw}=req.body
        const user=await UserModel.checkCredentials(email,pw)
        if(user){
            res.send(user)
        }else{
            res.status(404).send('USER NOT FOUND')
        }
    } catch (error) {
        next(error)
    }
})

export default userRouter