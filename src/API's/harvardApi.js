import axios from "axios";

const api = axios.create({
    baseURL: "https://api.harvardartmuseums.org/",
params: {
    apikey: `5057e844-28d1-4bc1-acfe-1b9f6d27807e`
}});

const api2 = axios.create({
    baseURL: 'https://collectionapi.metmuseum.org/public/collection/v1'
});


const getAllHarvardObjectList = () => {
    return api.get(`/object?size=10`).then((response) => {
        
        return response.data;
        
    }).catch((error) => {
        console.log(error)
       
    })
}

const getAllMetObjectList = () => {
    return api2.get('/departments').then((response) => {

        console.log(response.data, "MET API TEST")

        return response.data;

    }).catch((error) => {

        console.log(error)


    })
}



// const getExhibitionItemById = (object_id) => {

//     return api.get(`/object/${object_id}`).then((response) => {

//         return response;

//     }).catch((error) => {
//         console.log(error)
//         return error;
//     })
// }

export { getAllHarvardObjectList, getAllMetObjectList };