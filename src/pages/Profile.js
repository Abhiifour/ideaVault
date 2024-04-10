import React from "react";
import { Button } from "../components/ui/button";
import { useRecoilValue } from "recoil";
import { userState } from "../Atom";

function Profile() {
  const userData = useRecoilValue(userState)
  return (
    <div className="profile w-[1200px] m-auto px-8 max-sm:w-full max-sm:h-full max-sm:pb-0 max-sm:mt-4 max-sm:mb-[210px]">
      <div className="top text-8xl font-bold text-white text-start  max-sm:text-5xl max-sm:text-center max-sm:w-full max-sm:mt-4">
        Profile
      </div>
      <div className="content mt-8 flex flex-col items-center gap-4">
        <div className="avatar">
          <div className="img-wrapper w-[80px] h-[80px] rounded-full border-[1px] overflow-hidden border-stone-600">
            <img src={userData.imageUrl} alt="icon" className="w-[80px] h-[80px]" />
          </div>
        </div>
        <div className="username text-xl font-semibold">{userData.name}</div>
        <div className="bio font-semibold">
          its my personal space to bomb ideas.
        </div>
        <div className="email font-semibold">{userData.email}</div>
        <div className="icons flex flex-row flex-wrap gap-4 w-[300px] justify-center mt-4 max-sm:hidden">
          <div className="img-wrapper w-[80px] h-[80px] rounded-full border-[1px] overflow-hidden border-stone-600">
            <img src="" alt="" className="w-[80px] h-[80px]" />
          </div>
          <div className="img-wrapper w-[80px] h-[80px] rounded-full border-[1px] overflow-hidden border-stone-600">
            <img src="" alt="" className="w-[80px] h-[80px]" />
          </div>
          <div className="img-wrapper w-[80px] h-[80px] rounded-full border-[1px] overflow-hidden border-stone-600">
            <img src="" alt="" className="w-[80px] h-[80px]" />
          </div>
          <div className="img-wrapper w-[80px] h-[80px] rounded-full border-[1px] overflow-hidden border-stone-600">
            <img src="" alt="" className="w-[80px] h-[80px]" />
          </div>
          <div className="img-wrapper w-[80px] h-[80px] rounded-full border-[1px] overflow-hidden border-stone-600">
            <img src="" alt="" className="w-[80px] h-[80px]" />
          </div>
          <div className="img-wrapper w-[80px] h-[80px] rounded-full border-[1px] overflow-hidden border-stone-600">
            <img src="" alt="" className="w-[80px] h-[80px]" />
          </div>
        </div>
        <div className="save mt-6 pb-6">
            <Button className="px-8 py-2">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
