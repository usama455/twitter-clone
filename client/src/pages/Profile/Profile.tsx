import React from "react";
import LeftSidebar from "../../components/LeftSideBar/LeftSideBar";
import RightSidebar from "../../components/RightSideBar/RightSideBar";

import { useParams } from "react-router-dom";
import { ProfileHook } from "./ProfileHook";
import Tweet from "../../components/Tweet/Tweet";

const Profile = () => {


  const { id } = useParams();
  const {
    currentUserProfile,
    userTweets,
    userProfile,
    setUserTweets,
    handleFollow } = ProfileHook(id)

  return (
    <>
      {currentUserProfile && userProfile &&
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="px-6">
            <LeftSidebar />
          </div>
          <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
            <div className="flex justify-between items-center">
              <span className="w-12 h-12 font-bold">@{userProfile.userName}</span>

              {currentUserProfile.id === id ? (
                <span
                  className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                >
                  My Profile
                </span>
              ) : currentUserProfile.following.includes(id) ? (
                <button
                  className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                  onClick={handleFollow}
                >
                  Following
                </button>
              ) : (
                <button
                  className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                  onClick={handleFollow}
                >
                  Follow
                </button>
              )}
            </div>

            {/* Followers and Following count */}
            <div className="mt-2 text-gray-600">
              <span className="mr-4">
                <strong>{userProfile.followers.length}</strong> Followers
              </span>
              <span>
                <strong>{userProfile.following.length}</strong> Following
              </span>
            </div>

            <hr className="my-4 border-gray-300" />

            <div className="mt-6">
              {userTweets &&
                userTweets.map((tweet) => {
                  return (
                    <div className="p-2" key={tweet._id}>
                      <Tweet tweet={tweet} setData={setUserTweets} />
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="px-6">
            <RightSidebar />
          </div>
        </div>}
    </>
  );
};

export default Profile;