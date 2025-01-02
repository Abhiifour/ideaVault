import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
 env("SUPABASE_URL"),
 env("SUPABASE_CLIENT")
);



export const login = async () => {
  try {
    const {data , error} = await supabase.auth.signInWithOAuth({
      provider:"google"
    })
    console.log(data);
    console.log(error)
  } catch (e) {
    console.log(e)
  }   
}

export const getUser =async () => {
  try {
    const {data :{user}} = await supabase.auth.getUser()
    return user;
  } catch (e) {
    console.log(e)
  }
}