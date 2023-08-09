import React from "react";
import { ExploreUsersHook } from "./ExploreUsersHook";


const ExploreUsers = () => {
  const { users } = ExploreUsersHook()
  console.log(users)
  return (
    <div className="mt-6">
      EXPLORE
      {users &&
        users.map((user: any) => {
          return (
            <div key={user._id} className="p-2">
              {user.userName}
              {/* <Tweet tweet={tweet} setData={setExplore} /> */}
            </div>
          );
        })}
    </div>
  );
};

export default ExploreUsers;