let express=require("express");
let userRouter=require("/.user")
let router=express.Router();

router.use("/user",userRouter);

module.exports=router;