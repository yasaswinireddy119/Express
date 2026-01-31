import analyticsRouter from "./routes/analytics.Router.js"
append.use("/",analyticsRouter)
append.use((req,res)=>{
    res.status(404).json({message:"Request Not Found"})
})