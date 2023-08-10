import { useCallback, useEffect, useState } from "react";
import { TweetService } from "../../services/tweets";
import { useSelector } from "react-redux";

export const TimelineHook = () => {
    const [timeLine, setTimeLine] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const { currentUser } = useSelector((state: any) => state.user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const timelineTweets = await TweetService.getTimelineTweets()
                setTimeLine(timelineTweets.data.data.tweets);
                setCurrentPage(timelineTweets.data.data.currentPage);
                setTotalPages(timelineTweets.data.data.totalPages);
            } catch (err) {
                console.log("error", err);
            }
        };

        fetchData();
    }, [currentUser._id]);


    const fetchRequiredPage = useCallback(async (page: number) => {
        const timelineTweets = await TweetService.getTimelineTweets(page)
        setTimeLine(timelineTweets.data.data.tweets);
        setCurrentPage(timelineTweets.data.data.currentPage);
        setTotalPages(timelineTweets.data.data.totalPages);

    }, [])

    return {
        timeLine,
        currentPage,
        totalPages,
        setTimeLine,
        fetchRequiredPage
    }

}