import axios from "axios";
const req = axios.create({
    baseURL: 'http://localhost:8000/api', // The base URL of your backend server
});
export const TweetService = {
    getTimelineTweets: async () => {

        const token = localStorage.getItem('token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        return await req.get("/tweet/feed", config)
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