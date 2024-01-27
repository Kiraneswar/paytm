let express=require("express");
let zod=require("zod");
let {User}=require("../db");
let jwt=require("jsonwebtoken") 
const { JWT_SECRET } = require("../config");
let router=express.Router();

let signupSchema=zod.object({
     username:zod.string(),
     password:zod.string(),
     firstname:zod.string(),
     lastname:zod.string()
})
router.post("/signup",async(req,res)=>{
      let {success}=signupSchema.safeParse(req.body);
      if(!success){
        return res.status(411).json({
            message:"Email already taken/incorrect inputs"
        })
    }
    let existingUser=await User.findOne({
        username:req.body.username
    })
    if(existingUser){
        return res.status(411).json({
            message:"Email already taken/incorrect inputs"
        })
    }
    let user= await User.create({
        username:req.body.username,
        password:req.body.password,
        firstname:req.body.firstname,
        lastname:req.body.lastname
    })
    let userId=user._id;
    let token=jwt.sign({
        userId
    },JWT_SECRET)
    res.json({
        message:"User created sucessfully",
        token:token
    })
})


let signinSchema=zod.object({
    username:zod.string(),
    password:zod.string()
})
router.post("/signin",async(req,res)=>{
  let {success}=signinSchema.safeParse(req.body);
  if(!success){
    return res.status(411).json({
        message:"Incorrect inputs"
    })
  }

  const user=await User.findOne({
    username:req.body.username,
    password:req.body.password
  })

  if(user){
    let token=jwt.sign({
        userId:user._id
    },JWT_SECRET);
    res.json({
        token:token
    })
    return;
  }

  res.status(411).json({
    message:"Error while logging in"
  })
})

module.exports=router;