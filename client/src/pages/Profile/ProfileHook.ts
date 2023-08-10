import { useCallback, useEffect, useState } from "react";
import { TweetService } from "../../services/tweets";
import { UserService } from "../../services/users";
import { useSelector } from "react-redux";

export const ProfileHook = (userId: string) => {
    const [userTweets, setUserTweets] = useState([]);
    const [userProfile, setUserProfile] = useState(null);

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [currentUserProfile, setCurrentUserProfile] = useState(null)
    const { currentUser } = useSelector((state: any) => state.user);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const userTweets = await TweetService.getUserSpecificTweets(userId)
                const userProfile = await UserService.getUserInfo(userId)
                const currentUserProfileDetails = await UserService.getUserInfo(currentUser._id)
                setCurrentUserProfile(currentUserProfileDetails.data.data)
                setCurrentPage(userTweets.data.data.currentPage);
                setTotalPages(userTweets.data.data.totalPages);
                setUserTweets(userTweets.data.data.tweets);
                setUserProfile(userProfile.data.data);
            } catch (err) {
                console.log("error", err);
            }
        };


        fetchData();
    }, [currentUser._id, userId]);


    const handleFollow = useCallback(
        async () => {
            try {
                await UserService.updateFollowUser(userId)
                window.location.reload();
            } catch (err) {
                console.log("error", err);
            }
        }

        , [userId])



    const fetchRequiredPage = useCallback(async (page: number) => {
        const timelineTweets = await TweetService.getUserSpecificTweets(userId, page)
        setUserTweets(timelineTweets.data.data.tweets);
        setCurrentPage(timelineTweets.data.data.currentPage);
        setTotalPages(timelineTweets.data.data.totalPages);

    }, [userId])


    return {
        userTweets,
        userProfile,
        currentUserProfile,
        currentPage,
        totalPages,
        setUserTweets,
        handleFollow,
        fetchRequiredPage,
    }
}