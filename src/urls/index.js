import express from 'express'
import UrlModel from './schema.js'
import GroupModel from '../groups/schema.js'

const urlRouter=express.Router()

urlRouter
.post('/:groupId',async(req,res,next)=>{
    try {
        const newUrl=new UrlModel(req.body)
        const savedUrl=await newUrl.save()
        const updatedGroup=await GroupModel.findByIdAndUpdate(
            req.params.groupId,
            {$push:{urls:savedUrl}},
            {new:true}
        )
        res.status(201).send(updatedGroup)
    } catch (error) {
        next(error)
    }
})

export default urlRouter