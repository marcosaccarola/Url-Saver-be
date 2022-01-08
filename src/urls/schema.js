import mongoose from 'mongoose'

const{Schema,model}=mongoose

const urlSchema=new Schema(
    {
        name:{type:String},
        url:{type:String,required:true}
    },{timestamps:true}
)

export default model('url',urlSchema)