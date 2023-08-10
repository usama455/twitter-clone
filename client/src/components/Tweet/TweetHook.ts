import { useCallback, useState } from "react"
import { TweetService } from "../../services/tweets"
import { useLocation } from "react-router-dom";

export const TweetHook = (setTimeLine: any, userId: any | null = null, currentPage: number | string = 1) => {
    const [loading, setLoading] = useState<{
        like: boolean;
        retweet: boolean;
    }>({
        like: false,
        retweet: false
    })

    const location = useLocation().pathname;


    const handleUpdateLikeStatus = useCallback(async (id: string) => {
        try {
            setLoading(prevState => ({
                ...prevState,
                like: true
            }))
            const res = await TweetService.updateLikeStatus(id)
            if (res.status === 200) {


                if (location.includes("profile")) {
                    const updatedData = await TweetService.getUserSpecificTweets(userId, currentPage);
                    setTimeLine(updatedData.data.data.tweets)
                    // window.location.reload();
                } else {
                    const updatedData = await TweetService.getTimelineTweets();
                    setTimeLine(updatedData.data.data.tweets)
                }

                setLoading(prevState => ({
                    ...prevState,
                    like: false
                }))
            }

        } catch (err) {
            console.log("err", err)
        }

    }, [currentPage, location, setTimeLine, userId])

    const handleUpdateRetweetStatus = useCallback(async (id: string) => {
        try {
            setLoading(prevState => ({
                ...prevState,
                retweet: true
            }))
            const res = await TweetService.updateRetweetStatus(id)

            if (res.status === 200) {
                if (location.includes("profile")) {
                    const updatedData = await TweetService.getUserSpecificTweets(userId, currentPage);
                    setTimeLine(updatedData.data.data.tweets)
                    // window.location.reload();
                } else {
                    const updatedData = await TweetService.getTimelineTweets();
                    setTimeLine(updatedData.data.data.tweets)
                }
                setLoading(prevState => ({
                    ...prevState,
                    retweet: false
                }))
            }
        } catch (err) {
            console.log("err", err)
        }

    }, [currentPage, location, setTimeLine, userId])

    const handleDeleteTweet = useCallback(async (id: string) => {
        try {
            const res = await TweetService.deleteTweet(id)
            if (res.status === 200) {
                if (location.includes("profile")) {

                    window.location.reload();
                } else {
                    const updatedData = await TweetService.getTimelineTweets();
                    setTimeLine(updatedData.data.data.tweets)
                }
            }
        } catch (err) {
            console.log("err", err)
        }

    }, [location, setTimeLine])

    return {
        loading,
        handleUpdateLikeStatus,
        handleUpdateRetweetStatus,
        handleDeleteTweet
    }

}