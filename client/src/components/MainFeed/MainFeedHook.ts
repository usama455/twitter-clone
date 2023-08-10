import { useState } from "react";
import { useSelector } from "react-redux";
import { TweetService } from "../../services/tweets";

export const MainFeedHook = () => {

    const [tweetText, setTweetText] = useState("");
    const { currentUser } = useSelector((state: any) => state.user);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await TweetService.createTweet(tweetText)

            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return {
        setTweetText,
        currentUser,
        handleSubmit
    }

}