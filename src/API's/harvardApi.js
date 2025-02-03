import axios from "axios";

const api = axios.create({
    baseURL: "https://api.harvardartmuseums.org/",
params: {
    apikey: `5057e844-28d1-4bc1-acfe-1b9f6d27807e`
}});


const getExhibitionList = () => {
    return api.get(`/exhibition?size=100`).then((response) => {

        console.log(response.data)
        
        return response.data;
        
    }).catch((error) => {
        console.log(error)
        return error;
    })
}

const getExhibitionItemById = (object_id) => {

    return api.get(`/exhibition/${object_id}`).then((response) => {

        console.log(response.data)

        return response;

    }).catch((error) => {
        console.log(error)
        return error;
    })
}

export {getExhibitionList, getExhibitionItemById};