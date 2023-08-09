import axios from "axios";
const req = axios.create({
    baseURL: 'http://localhost:8000/api', // The base URL of your backend server
});
export const UserService = {
    loginUser: async (data: any) => {
        try {
            const { userName, password } = data;

            const requestBody = {
                userName: userName,
                password: password
            }
            return await req.post("/user/login", requestBody);

        } catch (err) {
            console.log("err", err)
        }
    },
    signupUser: async (data: any) => {
        try {
            const { userName, password, email } = data;

            const requestBody = {
                userName: userName,
                password: password,
                email: email
            }
            return await req.post("/user/register", requestBody);

        } catch (err) {
            console.log("err", err)
        }
    }
}