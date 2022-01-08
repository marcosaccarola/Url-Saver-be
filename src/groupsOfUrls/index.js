import express from 'express'
import GroupModel from './schema.js'
import UserModel from '../users/schema.js'

const groupRouter=express.Router()

groupRouter
.post('/:userId',async(req,res,next)=>{
    try {
        const newGroup=new GroupModel(req.body)
        const savedNewGroup=await newGroup.save()
        const user=await UserModel.findByIdAndUpdate(
            req.params.userId,
            {$push:{groups:savedNewGroup}},
            {new:true}
            )
        res.status(201).send(user)
    } catch (error) {
        next(error)
    }
})
.get('/:groupId',async(req,res,next)=>{
    try {
        const group=await GroupModel.findById(req.params.groupId)
        res.status(200).send(group)
    } catch (error) {
        next(error)
    }
})
.put('/:groupId',async(req,res,next)=>{
    try {
        const modifiedGroup=await GroupModel.findByIdAndUpdate(req.params.groupId,req.body,{new:true})
        if(modifiedGroup){
            res.status(200).send(modifiedGroup)
        }else{
            res.status(404).send(`GROUP ID ${req.params.groupId} NOT FOUND`)
        }
    } catch (error) {
        next(error)
    }
})
.delete('/:groupId',async(req,res,next)=>{
    try {
        const deletedGroup=await GroupModel.findByIdAndDelete(req.params.groupId)
        if(deletedGroup){
            res.status(200).send(`GROUP ID ${req.params.groupId} IS GONE`)
        }else{
            res.status(404).send(`GROUP ID ${req.params.groupId} NOT FOUND`)
        }
    } catch (error) {
        next(error)
    }
})

export default groupRouter