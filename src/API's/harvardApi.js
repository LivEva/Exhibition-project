import axios from "axios";

const api = axios.create({
    baseURL: "https://api.harvardartmuseums.org/",
params: {
    apikey: `5057e844-28d1-4bc1-acfe-1b9f6d27807e`
}});


const collectionList = () => {
    return api.get(`/object`).then((response) => {

        console.log(response.data)

        return response.data;
        
    }).catch((error) => {
        console.log(error)
        return error;
    })
}

export default collectionList;