import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import Login from "./Elements/Login";
import { Switch } from "../components/ui/switch";
import { Button } from "../components/ui/button";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, userState } from "../Atom";
import { getUser } from "../supabase/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/auth";

function Home() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useRecoilState(loginState);
  const [userData, setUserData] = useRecoilState(userState);
  const [content, setContent] = useState("");

  const createThought = async () => {
    try {
      const { data, error } = await supabase
        .from("thoughts")
        .insert({ content: content, createdBy: userData.userId })
        .select();
    } catch (e) {
      console.log(e);
    }
    toast("Thought Added !", {
      icon: "💬",
    });
  };

  const fetchUser = async () => {
    const user = await getUser();
    console.log(user);
    setUserData({
      userId: user?.id,
      email: user?.email,
      name: user?.user_metadata?.name,
      imageUrl: user?.user_metadata?.avatar_url,
    });

    console.log(userData);
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session === null) {
        setIsLogged(false);
      } else {
        setIsLogged(true);
      }
    });
    fetchUser();
  }, []);

  return (
    <div className="home pb-10 w-[1200px] m-auto px-8  max-sm:w-full max-sm:h-full max-sm:pb-[260px]">
      <div className="hero-section flex justify-start flex-col items-start max-sm:w-full max-sm:mt-8 ">
        <div className="title text-[150px] text-white font-bold max-sm:text-[60px] max-sm:m-auto   ">
          <p className="tracking-wider">Idea Vault.</p>
        </div>
        <div className="subtitle text-4xl text-stone-800 font-semibold px-2 max-sm:text-lg">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Unload Your Mind")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Embrace Clarity")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Thought Dumping Made Simple")
                .start();
            }}
          />
        </div>
      </div>
      {isLogged ? (
        <div className="post-feed mt-[200px] flex flex-col  items-start gap-4 pb-[28px] max-sm:mt-[200px] max-sm:w-full ">
          <textarea
            className="w-[800px] h-[60px] rounded-lg px-4 py-4 font-semibold shadow-lg max-sm:w-[350px]"
            placeholder="Add thoughts to vault !"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="bottom flex justify-between items-center w-[800px] max-sm:w-[350px]">
            <div className="left flex gap-2 ">
              <Switch
                id="visibilty"
                className="shadow-sm border-[1px] border-stone-400"
              />
              <label htmlFor="visibility " className="font-semibold">
                Public
              </label>
            </div>
            <div className="right">
              <Button className="px-8 max-sm:px-4 py-1" onClick={createThought}>
                FreeUp
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="login mt-[200px] pb-8">
          <Login />
        </div>
      )}
    </div>
  );
}

export default Home;
