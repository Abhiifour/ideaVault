import React, { useEffect, useState } from "react";
import { ScrollArea } from "../components/ui/scroll-area";
import ThoughtCard from "./Elements/ThoughtCard";
import { supabase } from "../supabase/auth";
import { useRecoilValue } from "recoil";
import { isThoughtUpdated, userState } from "../Atom";

function Vault() {
  const userData = useRecoilValue(userState);
  const [thoughts, setThoughts] = useState([]);
  const isUpdated = useRecoilValue(isThoughtUpdated);

  const getThoughts = async () => {
    try {
      const { data, error } = await supabase
        .from("thoughts")
        .select()
        .eq("createdBy", userData.userId);

      data.reverse();
      setThoughts([...data]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getThoughts();
  }, [isUpdated]);

  return (
    <div className="vault w-[1200px] m-auto pb-2 max-sm:w-full max-sm:pb-[250px]  ">
      <div className="content flex flex-col items-start px-8 gap-10 ">
        <div className="heading text-8xl font-bold text-white max-sm:text-5xl max-sm:mt-4 max-sm:w-full max-sm:m-auto">My Vault</div>
        <ScrollArea className="w-[1160px] h-[500px] max-sm:w-[350px] max-sm:h-[400px] ">
          <div className="wrapper flex flex-row flex-wrap gap-x-5 gap-y-6 max-sm:flex-col">
            {thoughts.map((thought) => (
              <ThoughtCard
                time={thought.created_at}
                content={thought.content}
                id={thought.id}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default Vault;
