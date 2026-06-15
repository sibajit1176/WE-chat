const express=require('express')
const errorMiddleware = require('./middlewares/errormiddleware')
const authRoute=require('./modules/auth/auth.route')

const app=express()


app.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Wechat run"
    })
})
app.use('/wechat',authRoute)
app.use(errorMiddleware)

module.exports=app