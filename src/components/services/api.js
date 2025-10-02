import axios from "axios";

export  const api = async (url) => {
    return axios.create({
        url,
    }).get(url);
};
export default api;