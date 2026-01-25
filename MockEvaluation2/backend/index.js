const express = require("express");
const cors=require("cors");
require("dotenv").config();
const supabase = require("./supabase");
const app = express();
app.use(cors());
app.use(express.json());

app.post("/register",asyn(req,res)=>{
    const{full_name || !email ||!phone}=req.body;
    if(!full_name || !email || !phone){
        return res.status(400).json({error:"All fields are requires"})
    }
    const {data: existingCustomer} = await supabase
    .from("customers")
    .select("*")
    .eq("emial",email)
    .single();

    
    
})
app.listen(3000,()=>{
    console.log("Server running on port 3000")
})
