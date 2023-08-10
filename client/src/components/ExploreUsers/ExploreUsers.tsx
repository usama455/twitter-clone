import React from "react";
import { ExploreUsersHook } from "./ExploreUsersHook";
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


const ExploreUsers = () => {
  const { users, loading, currentUserProfile, handleFollow } = ExploreUsersHook()
  return (
    <div className="mt-6">
      {users &&
        users.map((user: any) => {
          return (
            user._id !== currentUserProfile.id &&
            <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
              <div className="flex justify-between items-center">
                <Link className="w-12 h-12 flex flex-col items-center justify-center" to={`/profile/${user._id}`}>
                  <h3 className="font-bold">{user.userName}</h3>
                  <span className="mt-1">@{user.userName}</span>
                </Link>
                {loading === user._id ? <CircularProgress size={20} />
                  :

                  currentUserProfile.following.includes(user._id) ? (
                    <button
                      className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                      onClick={() => handleFollow(user._id)}
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                      onClick={() => handleFollow(user._id)}
                    >
                      Follow
                    </button>
                  )
                }

              </div>
              <hr className="my-4 border-gray-300" />

            </div>

          );
        })}
    </div>
  );
};

export default ExploreUsers;