import mongoose from 'mongoose'

const{Schema,model}=mongoose

const groupSchema=new Schema(
    {
        groupName:{type:String,required:true},
        groupNumber:{type:Number,required:true},
        groupColor:{type:Number,required:true},
        urls:[{type:Schema.Types.Object ,ref:'url'}]
    },{timestamps:true}
)

export default model('group',groupSchema)