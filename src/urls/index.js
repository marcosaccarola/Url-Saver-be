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
.delete('/:urlId',async(req,res,next)=>{
    try {
        const deletedUrl=await UrlModel.findByIdAndDelete(req.params.urlId)
        if(deletedUrl){
            res.status(200).send(`URL ID ${req.params.urlId} IS GONE`)
        }else{
            res.status(404).send(`URL ID ${req.params.urlId} NOT FOUND`)
        }
    } catch (error) {
        next(error)
    }
})

export default urlRouter