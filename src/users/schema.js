import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const{Schema,model}=mongoose

const userSchema=new Schema(
    {
        email:{type:String,required:true},
        pw:{type:String,required:true},
        avatar:{type:String},
        groups:[{type:Array,default:[]}]
    },{timestamps:true}
)
userSchema.pre('save',async function(next){
    const newUser=this
    const plainPW=newUser.pw
    if(newUser.isModified('pw')){
        newUser.pw=await bcrypt.hash(plainPW,10)
    }
    next()
})
userSchema.methods.toJSON=function(){
    const userDocument=this
    const userObj=userDocument.toObject()
    delete userObj.pw
    delete userObj.__v
    return userObj
}
userSchema.statics.checkCredentials=async function(email,plainPW){
    const user=await this.findOne({email})
    if(user){
        const isMatch=await bcrypt.compare(plainPW,user.pw)
        if(isMatch) return user
        else return null
    }else return null
}

export default model('user',userSchema)