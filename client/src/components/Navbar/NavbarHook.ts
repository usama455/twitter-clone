import { useEffect } from "react";
import { loginSuccess } from "../../redux/userSlice";

import { useDispatch } from "react-redux"
import { UserService } from "../../services/users";

export const NavbarHook = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            const currentUserId = localStorage.getItem("currentId")
            if (currentUserId) {
                const response: any = await UserService.getUserInfo(currentUserId)
                if (response && response.data?.data?.token) {
                    dispatch(loginSuccess(response.data.data))
                }
            }
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

}