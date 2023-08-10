import React from "react";
import LeftSidebar from "../../components/LeftSideBar/LeftSideBar";
import RightSidebar from "../../components/RightSideBar/RightSideBar";

import { useParams } from "react-router-dom";
import { ProfileHook } from "./ProfileHook";
import Tweet from "../../components/Tweet/Tweet";
import Button from '@mui/material/Button';

const Profile = () => {


  const { id } = useParams();
  const {
    currentUserProfile,
    userTweets,
    userProfile,
    currentPage,
    totalPages,
    setUserTweets,
    handleFollow,
    fetchRequiredPage
  } = ProfileHook(id)
  const pageButtonsToShow = 5;
  const pageButtonStart = Math.max(1, currentPage - Math.floor(pageButtonsToShow / 2));
  const pageButtonEnd = Math.min(totalPages, pageButtonStart + pageButtonsToShow - 1);

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
                      <Tweet tweet={tweet} setTimeLine={setUserTweets} userId={userProfile.id} currentPage={currentPage} />
                    </div>
                  );
                })}
              {totalPages > 1 && <div className="flex justify-center mt-4 my-8 pb-4 space-x-2">
                {currentPage > 1 && (
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={() => fetchRequiredPage(currentPage - 1)}
                  >
                    Previous
                  </Button>
                )}

                {Array.from({ length: pageButtonEnd - pageButtonStart + 1 }, (_, index) => pageButtonStart + index).map((page) => (
                  <Button
                    key={page}
                    // eslint-disable-next-line eqeqeq
                    variant={page == currentPage ? "contained" : "outlined"}
                    size="small"
                    color="primary"
                    onClick={() => fetchRequiredPage(page)}
                  >
                    {page}
                  </Button>
                ))}

                {currentPage < totalPages && (
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={() => fetchRequiredPage(currentPage + 1)}
                  >
                    Next
                  </Button>
                )}
              </div>}
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