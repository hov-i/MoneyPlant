import axios from "axios";
const DOMAIN = "https://localhost:8888";

const UserAxiosAPI = {
    getUserInfo : async() => {
        try {
            return await axios.get(DOMAIN + "/user/me", {withCredentials: true});
        } catch (e) {
            console.log("getUserInfo : " + e)
        }
    },

    postEmailSend : async(inputEmail) => {
        try {
            const response = await axios.post(DOMAIN + "/mail/sendmail", inputEmail, {withCredentials: true});
            return response.data;
        } catch (e) {
            console.log("postEmailSend : " + e)
        }
    }
}

export default UserAxiosAPI;