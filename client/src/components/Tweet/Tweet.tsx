import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RepeatIcon from "@mui/icons-material/Repeat";
import DeleteIcon from "@mui/icons-material/Delete";
import { TweetHook } from "./TweetHook";

const Tweet = (data: any) => {
    const { tweet, setTimeLine } = data;
    const { currentUser } = useSelector((state: any) => state.user);
    const {
        loading,
        handleUpdateLikeStatus,
        handleUpdateRetweetStatus,
        handleDeleteTweet } = TweetHook(setTimeLine)
    return (
        <div>
            {tweet && (
                <>
                    <div className="flex space-x-2">
                        {/* <img src="" alt="" /> */}
                        <Link to={`/profile/${tweet.author._id}`}>
                            <h3 className="font-bold">{tweet.author.userName}</h3>
                        </Link>

                        <span className="font-normal">@{tweet.author.userName}</span>
                    </div>

                    <p>{tweet.content}</p>
                    <div className="flex items-center space-x-4"> {/* Increased spacing */}
                        {loading.like ?
                            <CircularProgress size={20} />
                            : <button onClick={() => handleUpdateLikeStatus(tweet._id)}>
                                {tweet.likes.includes(currentUser._id) ? (
                                    <FavoriteIcon className="mr-2 my-2 cursor-pointer text-red-500" />
                                ) : (
                                    <FavoriteBorderIcon className="mr-2 my-2 cursor-pointer" />
                                )}
                                {tweet.likes.length}
                            </button>}

                        {loading.retweet ?
                            <CircularProgress size={20} />
                            : <button onClick={() => handleUpdateRetweetStatus(tweet._id)}>
                                {tweet.retweets.includes(currentUser._id) ? (
                                    <RepeatIcon className="mr-2 my-2 cursor-pointer  text-green-500" />
                                ) : (
                                    <RepeatIcon className="mr-2 my-2 cursor-pointer" />
                                )}
                                {tweet.retweets.length}
                            </button>}
                        {tweet.author._id === currentUser._id &&

                            <button onClick={() => handleDeleteTweet(tweet._id)}>
                                <DeleteIcon className="mx-6 my-4 cursor-pointer text-red-500" /> {/* Red color */}
                            </button>}
                    </div>

                    <hr className="my-4 border-gray-300" />
                </>
            )}
        </div>
    );
};

export default Tweet;