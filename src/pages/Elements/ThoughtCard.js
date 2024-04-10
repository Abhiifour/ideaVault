import React from "react";
import { Card } from "../../components/ui/card";
import { MdDelete } from "react-icons/md";
import { supabase } from "../../supabase/auth";
import { useRecoilState } from "recoil";
import { isThoughtUpdated } from "../../Atom";
import { toast } from "react-hot-toast";

function ThoughtCard({ time, content, id }) {
  const date = new Date(time);
  const formatedDate = date.toDateString();
  const formatedTime = date.toLocaleTimeString();
  const [isUpdated, setIsUpdated] = useRecoilState(isThoughtUpdated);

  const deleteThoughts = async () => {
    try {
      const { error } = await supabase.from("thoughts").delete().eq("id", id);
    } catch (e) {
      console.log(e);
    }
    toast("Thought removed !", {
      icon: "💭",
    });
    setIsUpdated(!isUpdated);
  };

  return (
    <div className="card ">
      <Card className="w-[370px] px-4 py-6 flex flex-col gap-3 shadow-sm max-sm:w-[320px]">
        <div className="top flex justify-between gap-6">
          <div className="left text-semibold text-sm text-gray-400 max-sm:text-sm">
            {formatedDate} {formatedTime}
          </div>
          <div className="right">
            <MdDelete
              className="text-xl cursor-pointer text-stone-400 hover:text-stone-800"
              onClick={deleteThoughts}
            />
          </div>
        </div>
        <div className="content text-lg max-sm:text-base">
          <p className="text-start"> {content}</p>
        </div>
      </Card>
    </div>
  );
}

export default ThoughtCard;
