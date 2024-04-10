import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://qegqjzvnmpjpeuoddvjm.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlZ3FqenZubXBqcGV1b2RkdmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2OTI0MzIsImV4cCI6MjAyODI2ODQzMn0.QdF8cyVLuaHnjW3O9qKFfSEorNaxPmy-yN3ZVMLwzK4"

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