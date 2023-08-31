import axios from "axios";
const API = process.env.REACT_APP_API_ENDPOINT

const req = axios.create({
    baseURL: API, // The base URL of your backend server
});
export const UserService = {
    loginUser: async (data: any) => {

        const { userName, password } = data;

        const requestBody = {
            userName: userName,
            password: password
        }
        return await req.post("/user/login", requestBody);

    },
    signupUser: async (data: any) => {

        const { userName, password, email } = data;

        const requestBody = {
            userName: userName,
            password: password,
            email: email
        }
        return await req.post("/user/register", requestBody);

    },
    getUserInfo: async (id: string) => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            return await req.get(`/user/profile/${id}`, config);
        } catch (err) {
            console.log("err", err)
        }
    },
    getAllUsers: async () => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            return await req.get(`/user`, config);
        } catch (err) {
            console.log("err", err)
        }
    },
    updateFollowUser: async (id: string) => {

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return await req.post(`/user/update-follow/${id}`, null, config)
    },
}