import express from 'express'
import uniqid from 'uniqid'
import UrlModel from './schema.js'
import GroupModel from '../groups/schema.js'
import UserModel from '../users/schema.js'

const urlRouter=express.Router()

urlRouter
// .post('/:groupId/:userId',async(req,res,next)=>{
//     try {
//         const newUrl=new UrlModel(req.body)
//         const savedUrl=await newUrl.save()
//         const updatedGroup=await GroupModel.findByIdAndUpdate(
//             req.params.groupId,
//             {$push:{urls:savedUrl}},
//             {new:true}
//             )
//         res.status(201).send(updatedGroup)
//     } catch (error) {
//         next(error)
//     }
// })
.post('/:groupId',async(req,res,next)=>{
    try {
        const urlObj={id:uniqid(),...req.body}
        const updatedGroup=await GroupModel.findByIdAndUpdate(
            req.params.groupId,
            {$push:{urls:urlObj}},
            {new:true}
        )
        if(updatedGroup){
            res.send(updatedGroup)
        }
    } catch (error) {
        next(error)
    }
})
.delete('/:groupId/:urlId',async(req,res,next)=>{
    try {
        console.log(req.params.groupId,req.params.urlId)
        const updatedGroup=await GroupModel.findByIdAndUpdate(
            req.params.groupId,
            {$pull:{urls:{id:req.params.urlId}}},
            {new:true}
        )
        if(updatedGroup){
            res.send(updatedGroup)
        }
    } catch (error) {
        next(error)
    }
})
.get('/:urlId',async(req,res,next)=>{
    try {
        const url=await UrlModel.findById(req.params.urlId)
        res.status(200).send(url)
    } catch (error) {
        next(error)
    }
})
.put('/:urlId',async(req,res,next)=>{
    try {
        const modifiedUrl=await UrlModel.findByIdAndUpdate(req.params.urlId,req.body,{new:true})
        if(modifiedUrl){
            res.status(200).send(modifiedUrl)
        }else{
            res.status(404).send(`URL ID ${req.params.urlId} NOT FOUND`)
        }
    } catch (error) {
        next(error)
    }
})
// .delete('/:groupId/:urlId',async(req,res,next)=>{
//     try {
//         const updatedGroup=await GroupModel.findOneAndUpdate({_id:req.params.groupId},{urls:UrlModel.findByIdAndDelete(req.params.urlId)},{new:true})
//         console.log(updatedGroup)
//     } catch (error) {
//         next(error)
//     }
// })

export default urlRouter