import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key:"eac50a559bab9f866df94b3994fb6fbc",
        language: "en-US"
        // language: "ko-KR"
    }
})

export default instance;