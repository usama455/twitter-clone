import React from "react";
// import TimelineTweet from "../TimelineTweet/TimelineTweet";

// import { useSelector } from "react-redux";
// import axios from "axios";

const MainFeed = () => {
//   const [tweetText, setTweetText] = useState("");

//   const { currentUser } = useSelector((state) => state.user);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const submitTweet = await axios.post("/tweets", {
//         userId: currentUser._id,
//         description: tweetText,
//       });
//       window.location.reload(false);
//     } catch (err) {
//       console.log(err);
//     }
//   };

  return (
    <div>
      {/* {currentUser && (
        <p className="font-bold pl-2 my-2">{currentUser.username}</p>
      )} */}
        <p className="font-bold pl-2 my-2">username</p>

      <form className="border-b-2 pb-6">
        <textarea
        //   onChange={(e) => setTweetText(e.target.value)}
        //   type="text"
          placeholder="What's happening"
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <button
        //   onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
        >
          Tweet
        </button>
      </form>
      {/* <TimelineTweet /> */}
    </div>
  );
};

export default MainFeed;