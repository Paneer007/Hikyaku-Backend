const User = require("../model/User")
const loginRouter= require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const passport= require('passport')
const { v4: uuidv4 } = require('uuid');
const app = require("../app")
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GitHubStrategy= require('passport-github2').Strategy;
const TwitterStrategy= require('passport-twitter').Strategy;
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3001/api/login/oauth2/redirect/twitter"
  },
  async(accessToken, refreshToken, profile, cb)=> {
    try{
        let user = await User.findOne({Name:profile.displayName})
        if(!user){
            const pass = uuidv4()
            let saltRound = 10
            const passHash = await bcrypt.hash(pass,saltRound)
            user = new User({
                Name:profile.displayName,
                Password: passHash
            })
            await user.save()
        }

        const tokenBody = {id:user._id,username:user.Name}
        const jwtToken = jwt.sign(tokenBody,process.env.SECRET)
        return cb(null,jwtToken)
    }
    catch(e){
        return cb(e,null)
    }
}));
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/api/login/oauth2/redirect/github"
  },async(accessToken, refreshToken, profile, cb)=> {
    try{
        let user = await User.findOne({Name:profile.displayName})
        if(!user){
            const pass = uuidv4()
            let saltRound = 10
            const passHash = await bcrypt.hash(pass,saltRound)
            user = new User({
                Name:profile.displayName,
                Password: passHash
            })
            await user.save()
        }

        const tokenBody = {id:user._id,username:user.Name}
        const jwtToken = jwt.sign(tokenBody,process.env.SECRET)
        return cb(null,jwtToken)
    }
    catch(e){
        return cb(e,null)
    }
}));
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/api/login/oauth2/redirect/google"
  },
  async(accessToken, refreshToken, profile, cb)=> {
    try{
        let user = await User.findOne({Name:profile.displayName})
        console.log("the user is",user)
        if(!user){
            const pass = uuidv4()
            let saltRound = 10
            const passHash = await bcrypt.hash(pass,saltRound)
            user = new User({
                Name:profile.displayName,
                Password: passHash
            })
            await user.save()
            console.log('status')
        }

        const tokenBody = {id:user._id,username:user.Name}
        const jwtToken = jwt.sign(tokenBody,process.env.SECRET)
        return cb(null,jwtToken)
    }
    catch(e){
        return cb(e,null)
    }
  }
));
loginRouter.get('/oauth2/redirect/twitter',passport.authenticate('twitter'),async(req,res)=>{
    const token={token:req.user}
    return res.redirect(`http://localhost:3000?personalToken=${req.user}`)
})
loginRouter.get('/oauth2/redirect/github',passport.authenticate('github'),async(req,res)=>{
    const token={token:req.user}
    return res.redirect(`http://localhost:3000?personalToken=${req.user}`)
})
loginRouter.get('/oauth2/redirect/google',passport.authenticate('google') ,async(req,res)=>{
    const token={token:req.user}
    return res.redirect(`http://localhost:3000?personalToken=${req.user}`)
})
loginRouter.post('/',async(req,res)=>{
    const body= req.body
    console.log(body)
    const user = await User.findOne({Name:body.Name})
    if(user==undefined){
        return res.status(400).send({error:"user has not made an account"})
    }
    const passValid = bcrypt.compare(body.Password,user.Password)
    if(!passValid){
        return res.status(400).send({message:"error user not found"})
    }
    const tokenBody = {id:user._id,username:body.Name}
    const jwtToken = jwt.sign(tokenBody,process.env.SECRET)
    await user.save()
    res.cookie('jwt',jwtToken,{httpOnly:true})
    return res.status(200).send({jwtToken:jwtToken})
})
loginRouter.get('/federated/google',passport.authenticate('google',{ scope: ['profile', 'email'] }))
loginRouter.get('/federated/github',passport.authenticate('github',{scope:['user:email']}))
loginRouter.get('/federated/twitter',passport.authenticate('twitter'))
module.exports = loginRouter