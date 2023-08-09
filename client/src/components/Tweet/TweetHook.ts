import { useCallback, useState } from "react"
import { TweetService } from "../../services/tweets"

export const TweetHook = (setTimeLine: any) => {
    const [loading, setLoading] = useState<{
        like: boolean;
        retweet: boolean;
    }>({
        like: false,
        retweet: false
    })

    const handleUpdateLikeStatus = useCallback(async (id: string) => {
        try {
            setLoading(prevState => ({
                ...prevState,
                like: true
            }))
            const res = await TweetService.updateLikeStatus(id)
            if (res.status === 200) {
                const updatedData = await TweetService.getTimelineTweets();
                setTimeLine(updatedData.data.data.tweets)
                setLoading(prevState => ({
                    ...prevState,
                    like: false
                }))
            }

        } catch (err) {
            console.log("err", err)
        }

    }, [setTimeLine])

    const handleUpdateRetweetStatus = useCallback(async (id: string) => {
        try {
            setLoading(prevState => ({
                ...prevState,
                retweet: true
            }))

            const res = await TweetService.updateRetweetStatus(id)
            if (res.status === 200) {
                const updatedData = await TweetService.getTimelineTweets();
                setTimeLine(updatedData.data.data.tweets)
                setLoading(prevState => ({
                    ...prevState,
                    retweet: false
                }))
            }
        } catch (err) {
            console.log("err", err)
        }

    }, [setTimeLine])

    const handleDeleteTweet = useCallback(async (id: string) => {
        try {
            const res = await TweetService.deleteTweet(id)
            if (res.status === 200) {
                const updatedData = await TweetService.getTimelineTweets();
                setTimeLine(updatedData.data.data.tweets)
            }
        } catch (err) {
            console.log("err", err)
        }

    }, [setTimeLine])

    return {
        loading,
        handleUpdateLikeStatus,
        handleUpdateRetweetStatus,
        handleDeleteTweet
    }

}