import express from 'express'
import UserModel from './userSchema.js'

const userRouter=express.Router()

userRouter
.post('/',async(req,res,next)=>{
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
.put('/group/:userId',async(req,res,next)=>{
    try {
        const newGroup={
            groupName:req.body.name,
            groupNumber:req.body.number,
            groupColor:req.body.color,
            urls:[]
        }
        const updatedUser=await UserModel.findByIdAndUpdate(
            req.params.userId,
            {$push:{groups:newGroup}},
            {new:true}
        )
        if(updatedUser){
            res.status(201).send(updatedUser)
        }else{
            res.status(404).send('USER NOT FOUND')
        }
    } catch (error) {
        next(error)
    }
})
.put('/url/:userId/:groupName',async(req,res,next)=>{
    try {
        const newUrl={
            urlName:req.body.name,
            urlString:req.body.string
        }
        const updatedUser=await UserModel.findByIdAndUpdate(
            req.params.userId,
            {$push:{groups:{groupName:req.params.groupName}}},
            {new:true}
        )
        if(updatedUser){
            res.status(201).send(updatedUser)
        }else{
            res.status(404).send('USER NOT FOUND')
        }
    } catch (error) {
        next(error)
    }
})

export default userRouter