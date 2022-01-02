import express from 'express'
import UserModel from './userSchema.js'

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
.put('/:userId/group',async(req,res,next)=>{
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
.put('/:userId/:groupName/url',async(req,res,next)=>{
    try {
        const newUrl={
            urlName:req.body.name,
            urlString:req.body.string
        }
        
        const user=await UserModel.findById(
            req.params.userId
            )
        const targetGroup=user.groups.find(g=>g.groupName===req.params.groupName).urls.push(new)
        const updatedUser=targetGroup.urls.push(newUrl)
            
        if(user){
            res.status(201).send(updatedUser)
        }else{
            res.status(404).send('USER NOT FOUND')
        }
    } catch (error) {
        next(error)
    }
})

export default userRouter