import axios from "axios";
const API = process.env.REACT_APP_API_ENDPOINT
const req = axios.create({
    baseURL: API, // The base URL of your backend server
});
export const TweetService = {
    getTimelineTweets: async (page: number | string = 1) => {

        const token = localStorage.getItem('token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        return await req.get(`/tweet/feed?page=${page}&limit=10`, config)
    },
    getUserSpecificTweets: async (id: string, page: number | string = 1) => {

        const token = localStorage.getItem('token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        return await req.get(`/tweet/user/${id}?page=${page}&limit=10`, config)
    },

    updateLikeStatus: async (id: string) => {

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return await req.patch(`/tweet/update-like/${id}`, null, config)
    },

    updateRetweetStatus: async (id: string) => {

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return await req.patch(`/tweet/update-retweet/${id}`, null, config)
    },
    deleteTweet: async (id: string) => {

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return await req.delete(`/tweet/${id}`, config)
    },

    createTweet: async (content: string) => {

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const reqBody = {
            content
        }
        return await req.post(`/tweet/create`, reqBody, config)
    }


}