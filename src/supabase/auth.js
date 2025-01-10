import { createClient } from "@supabase/supabase-js";

// Assuming you have a function to get environment variables

export const supabase = createClient(
  "https://chabcajejlhxsowqbwpq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoYWJjYWplamxoeHNvd3Fid3BxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4MTQ2MjIsImV4cCI6MjA1MTM5MDYyMn0.WruvfIvtNyzTJyJmn3OShk5IlKXY5iXOt0FPG7jmB6s",
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