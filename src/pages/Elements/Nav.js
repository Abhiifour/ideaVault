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
import { toast } from 'react-hot-toast';

function Nav() {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userState);
  const [isLogged, setIsLogged] = useRecoilState(loginState);
  const [content, setContent] = useState("");
  const [isUpdated, setIsUpdated] = useRecoilState(isThoughtUpdated);
  console.log(userData)
  const createThought = async () => {
    try {
      const { data, error } = await supabase
        .from("thoughts")
        .insert({ content: content, createdBy: userData.userId })
        .select();

      if (!error) {
        setContent("");
        toast("Thought Added!", {
          icon: "💭",
          className: "bg-white",
        });
        setIsUpdated(!isUpdated);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to add thought");
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUserData({});
      setIsLogged(false);
      navigate("/");
    } catch (e) {
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-sm bg-white/60">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer group"
          >
            <h1 className="text-2xl font-light tracking-wide text-gray-800 font-Playwrite">
              Idea<span className="font-bold tracking-tighter font-Poppins">Vault</span>
            </h1>
          </div>

          {/* Right Side Menu */}
          <div className="flex items-center gap-2 md:gap-6">
            <div> <button className="text-gray-600 hover:text-gray-800" onClick={() => navigate("/features")}>Features</button></div>
            {isLogged && (
              <Dialog>
                <DialogTrigger>
                  <Button 
                    variant="ghost" 
                    className="text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 hidden md:block"
                  >
                    New Thought
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white/95 backdrop-blur-md border-none shadow-xl max-w-lg w-full font-Poppins">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-medium text-gray-800">
                      Add a Thought
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full h-32 p-4 rounded-xl bg-gray-50/80 
                               text-gray-800 resize-none transition-all
                               focus:outline-none focus:ring-2 focus:ring-purple-200
                               placeholder:text-gray-400"
                      placeholder="What's on your mind?"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Switch className="bg-white shadow-sm" />
                        <label className="text-gray-600">Make Public</label>
                      </div>
                      <DialogClose asChild>
                        <Button
                          onClick={createThought}
                          className="bg-gray-900 hover:bg-gray-800 text-white"
                        >
                          Save
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {isLogged ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/50 transition-all hover:ring-white/80">
                    <img
                      src={userData?.imageUrl}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/95 backdrop-blur-md border-none shadow-lg w-48 font-Poppins">
                  <DropdownMenuLabel className="text-gray-800">
                    {userData.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem
                    onClick={() => navigate("/profile")}
                    className="cursor-pointer text-gray-600 hover:text-gray-900 hover:bg-gray-50/80"
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/vault")}
                    className="cursor-pointer text-gray-600 hover:text-gray-900 hover:bg-gray-50/80"
                  >
                    My Vault
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer text-gray-600 hover:text-gray-900 hover:bg-gray-50/80"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;