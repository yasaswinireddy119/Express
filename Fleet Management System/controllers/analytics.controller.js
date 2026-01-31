import {supabase} from ".../config"
supabaseClient.js";
export const getAnalytics=asyn(req,res)=>{
    try{
        const{count:totalCustomers}=await supabase
           .from('users')
           .select('*',{count:"exact",head:"true"})
           .eq("role","customer");
           const{count:totalOwners} = await supabase
           .from("users")
           .select('*',{count:"exact",head:"true"})
           .eq("role","customer");
    }
}