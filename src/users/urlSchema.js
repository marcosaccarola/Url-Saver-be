import mongoose from 'mongoose'

const{Schema,model}=mongoose

const urlSchema=new Schema(
    {
        urlName:{type:String,required:true},
        urlString:{type:String,required:true}
    },{timestamps:true}
)

export default model('url',urlSchema)