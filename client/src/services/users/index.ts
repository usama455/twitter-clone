import axios from "axios";

export const UserService = {
    loginUser: async (data: any) => {
        try {
            const { userName, password } = data;

            const requestBody = {
                email: userName,
                password: password
            }
            return await axios.post("/user/login", requestBody);

        } catch (err) {
            console.log("err", err)
        }
    }
}