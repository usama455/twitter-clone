import { useState } from "react";
import { useSelector } from "react-redux";
import { TweetService } from "../../services/tweets";

export const MainFeedHook = () => {

    const [tweetText, setTweetText] = useState("");
    const { currentUser } = useSelector((state: any) => state.user);

    const handleSubmit = async (e: any) => {
        console.log("HERE?")
        e.preventDefault();
        try {
            const submitTweet = await TweetService.createTweet(tweetText)
            console.log(submitTweet)

            // axios.post("/tweets", {
            //   userId: currentUser._id,
            //   description: tweetText,
            // });
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