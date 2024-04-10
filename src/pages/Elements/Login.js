import React from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { SiGmail } from "react-icons/si";
import { login } from "../../supabase/auth";

function Login() {
  const handleLogin = async () => {
    await login();
    console.log('login')
  };
  return (
    <div className="login mt-[100px] flex flex-col gap-8 max-sm:w-full">
      <div className="headin">
        <p className="text-2xl font-semibold max-sm:text-xl">Start Dumping Your Thoughts</p>
      </div>
      <div className="signin">
        <Dialog>
          <DialogTrigger>
            <Button className="px-16 py-6 text-lg shadow-lg max-sm:text-base max-sm:px-8 max-sm:py-3">Start</Button>
          </DialogTrigger>
          <DialogContent className="w-[400px] h-[300px] bg-blue-200 max-sm:w-[350px]">
            <DialogHeader>
              <DialogTitle className="text-lg">Login To Continue</DialogTitle>
            </DialogHeader>
            <div className="logo flex items-center justify-center">
              <p className="text-6xl font-bold  tracking-wider max-sm:text-4xl">Idea</p>
              <p className=" text-6xl font-bold tracking-wider text-white max-sm:text-4xl">
                Vault
              </p>
            </div>
            <div className="div m-auto ">
              <Button className="flex gap-2 text-lg max-sm:text-base" onClick={handleLogin}>
                Sign-in with Google <SiGmail />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Login;
