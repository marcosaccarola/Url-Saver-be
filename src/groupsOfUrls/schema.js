import mongoose from 'mongoose'

const{Schema,model}=mongoose

const groupSchema=new Schema(
    {
        name:{type:String,required:true},
        index:{type:Number,required:true},
        color:{type:Number,required:true},
        urls:[{type:Object}]
    },{timestamps:true}
)

export default model('group',groupSchema)