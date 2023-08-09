import { useEffect, useState } from "react"
import { UserService } from "../../services/users"

export const ExploreUsersHook = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        console.log("HERE ??")

        const fetchUsers = async () => {

            const response: any = await UserService.getAllUsers()
            console.log(response)
            if (response && response.data?.data) {
                console.log("SETTING")
                setUsers(response.data.data)
            }

        }

        fetchUsers();
    }, [])


    return {
        users
    }
}