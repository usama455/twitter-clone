import { useEffect, useState } from "react";
import { TweetService } from "../../services/tweets";
import { useSelector } from "react-redux";

export const TimelineHook = () => {
    const [timeLine, setTimeLine] = useState([]);
    const { currentUser } = useSelector((state: any) => state.user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const timelineTweets = await TweetService.getTimelineTweets()
                setTimeLine(timelineTweets.data.data.tweets);
            } catch (err) {
                console.log("error", err);
            }
        };

        fetchData();
    }, [currentUser._id]);
    return {
        timeLine,
        setTimeLine,

    }

}