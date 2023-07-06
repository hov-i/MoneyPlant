import axios from "axios";
const DOMAIN = "https://localhost:8888";

const UserAxiosAPI = {
    getUserInfo : async() => {
        try {
            return await axios.get(DOMAIN + "/user/me", {withCredentials: true});
        } catch (e) {
            console.log("getUserInfo : " + e)
        }
    }
}

export default UserAxiosAPI;