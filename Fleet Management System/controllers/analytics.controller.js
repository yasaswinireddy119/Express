import {supabase} from ".../config"
supabaseClient.js
export const getAnalytics=asyn(req,res)=>{
    try{
        const{count:totalCustomers}=await supabase
           .from('users')
           .select('*',{count:"exact",head:"true"})
           .eq("role","customer");
           const{count:totalOwners} = await supabase
           .from("users")
           .select('*',{count:"exact",head:"true"})
           .eq("role","Owners");
           const{count:totalDrivers} = await supabase
           .from("users")
           .select('*',{count:"exact",head:"true"})
           .eq("role","drivers");
           const{count:totalVehicles} = await supabase
           .from("users")
           .select('*',{count:"exact",head:"true"})
           .eq("role","Vehicles");
           const{count:totalTrips} = await supabase
           .from("users")
           .select('*',{count:"exact",head:"true"})
           .eq("role","Trips");

           res.status(200),json({
            totalCustomers,
            totalOwners,
            totalDrivers,
            totalVehicles,
            totalTrips
           })
    }catch(error){
        res.status(500).json({message:errormessage})
    }
}