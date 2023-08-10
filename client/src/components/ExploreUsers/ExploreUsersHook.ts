import { useCallback, useEffect, useState } from "react"
import { UserService } from "../../services/users"
import { useSelector } from "react-redux";

export const ExploreUsersHook = () => {
    const [users, setUsers] = useState([])
    const [currentUserProfile, setCurrentUserProfile] = useState(null)

    const { currentUser } = useSelector((state: any) => state.user);

    useEffect(() => {
        const fetchUsers = async () => {
            const response: any = await UserService.getAllUsers()
            const currentUserProfileDetails = await UserService.getUserInfo(currentUser._id)
            setCurrentUserProfile(currentUserProfileDetails.data.data)

            if (response && response.data?.data) {
                setUsers(response.data.data)
            }
        }

        fetchUsers();
    }, [currentUser._id])



    const handleFollow = useCallback(
        async (userId: string) => {
            try {
                await UserService.updateFollowUser(userId)
                window.location.reload();
            } catch (err) {
                console.log("error", err);
            }
        }

        , [])
    return {
        users,
        currentUserProfile,
        handleFollow
    }
}