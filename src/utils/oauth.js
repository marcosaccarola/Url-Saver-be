import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import UserModel from '../users/schema.js'

const googleStrategy=new GoogleStrategy(
    {
        clientID:process.env.GOOGLE_OAUTH_ID,
        clientSecret:process.env.GOOGLE_OAUTH_SECRET,
        callbackURL:process.env.GOOGLE_REDIRECT_URL
    },
    async(accessToken,refreshToken,profile,passportNext)=>{
        console.log(profile)
        const user=await UserModel.findOne({googleId:profile.id})
        console.log(user)
        if(user){
            const token=await generateJwt({id:user._id.toString()})
            console.log(user._id)
            passportNext(null,{token})
        }else{
            const user=new UserModel(
                {
                    email:profile.emails[0].value,
                    googleId:profile.id
                }
            )
            await user.save()
            console.log(user._id)
            const token=await generateJwt({id:user._id.toString()})
            passportNext(nulla,{token})
        }
    }
)

passport.serializeUser(function (userData,passportNext){
    passportNext(null,userData)
})

export default googleStrategy