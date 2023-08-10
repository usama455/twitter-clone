import React from "react";
import Timeline from "../Timeline/Timeline";
import { MainFeedHook } from "./MainFeedHook";

const MainFeed = () => {
  const { currentUser, setTweetText, handleSubmit } = MainFeedHook()


  return (
    <div>
      <p className="font-bold pl-2 my-2">{currentUser.userName}</p>
      <form className="border-b-2 pb-6">
        <textarea
          onChange={(e) => setTweetText(e.target.value)}
          placeholder="What's happening"
          maxLength={255}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
        >
          Tweet
        </button>
      </form>
      <Timeline />
    </div>
  );
};

export default MainFeed;