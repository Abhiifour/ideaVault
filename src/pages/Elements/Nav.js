import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isThoughtUpdated, loginState, userState } from "../../Atom";
import { supabase } from "../../supabase/auth";
import {toast} from 'react-hot-toast'

function Nav() {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userState);
  const [isLogged, setIsLogged] = useRecoilState(loginState);
  const [content, setContent] = useState("");
  const [isUpdated, setIsUpdated] = useRecoilState(isThoughtUpdated);

  const createThought = async () => {
    try {
      const { data, error } = await supabase
        .from("thoughts")
        .insert({ content: content, createdBy: userData.userId })
        .select();

      console.log(data);
    } catch (e) {
      console.log(e);
    }
    toast("Thought Added !", {
      icon: "💬",
    });
    setIsUpdated(!isUpdated);
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
    } catch (e) {}
    setUserData({});
    setIsLogged(false);
    navigate("/");
  };

  return (
    <div className="nav px-8 py-4 w-[1200px] m-auto border-b-[1px] border-white  max-sm:w-full">
      <div className="flex justify-between items-center">
        <div
          className="logo text-3xl font-semibold font-sans cursor-pointer max-sm:text-xl"
          onClick={() => navigate("/")}
        >
          <p className="tracking-wider ">
            Idea <span className="font-bold"> Vault</span>
          </p>
        </div>
        <div className="usericon flex items-center gap-4">
          <div className="dump ">
            <Dialog>
              <DialogTrigger>
                <p className="text-lg font-semibold cursor-pointer tracking-wider text-base">
                  Dump
                </p>
              </DialogTrigger>
              <DialogContent className="w-[450px] h-[300px] bg-blue-200 max-sm:w-[350px]">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold max-sm:text-lg max-sm:w-[300px]">
                    Add a Thought
                  </DialogTitle>
                </DialogHeader>
                <div className="div ">
                  <div className="post-feed  flex flex-col  items-start gap-4 pb-[20px] max-sm:w-[300px]">
                    <textarea
                      className="w-[400px] h-[60px] rounded-lg px-4 py-4 font-semibold  border-stone-400 shadow-lg max-sm:w-[300px]"
                      placeholder="Add thoughts to vault !"
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <div className="bottom flex justify-between items-center w-[400px] max-sm:w-[300px]">
                      <div className="left flex gap-2 ">
                        <Switch
                          id="visibilty"
                          className="shadow-sm border-[1px] border-stone-400 "
                        />
                        <label htmlFor="visibility " className="font-semibold">
                          Public
                        </label>
                      </div>
                      <div className="right">
                        <DialogClose asChild>
                          <Button className="px-8" onClick={createThought}>
                            FreeUp
                          </Button>
                        </DialogClose>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {isLogged ? (
                <div className="img-wrapper w-[50px] h-[50px] rounded-full overflow-hidden max-sm:w-[40px] max-sm:h-[40px]">
                  <img
                    src={userData.imageUrl}
                    alt="avatar"
                    className="w-[50px] h-[50px] max-sm:w-[40px] max-sm:h-[40px]"
                  />
                </div>
              ) : (
                <div></div>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="px-12 bg-slate-800 text-white pb-6 max-sm:px-2 max-sm:pb-2">
              <DropdownMenuLabel className="cursor-pointer text-xl max-sm:text-base">
                {userData.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-lg font-sm max-sm:text-sm"
                onClick={() => navigate("/profile")}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer text-lg max-sm:text-sm"
                onClick={() => navigate("/vault")}
              >
                My Vault
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer text-lg max-sm:text-sm"
                onClick={logout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default Nav;
