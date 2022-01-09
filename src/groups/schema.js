import mongoose from 'mongoose'

const{Schema,model}=mongoose

const groupSchema=new Schema(
    {
        name:{type:String,required:true},
        index:{type:Number,required:true},
        color:{type:Number,required:true},
        urls:[{type:Schema.Types.ObjectId,ref:'url'}]
    },{timestamps:true}
)
groupSchema.methods.toJSON=function(){
    const groupDocument=this
    const groupObj=groupDocument.toObject()
    delete groupObj.createdAt
    delete groupObj.updatedAt
    delete groupObj.__v
    return groupObj
}

export default model('group',groupSchema)