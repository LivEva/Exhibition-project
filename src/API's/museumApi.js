import axios from "axios";

const api = axios.create({
    baseURL: "https://api.harvardartmuseums.org",
params: {
    apikey: `5057e844-28d1-4bc1-acfe-1b9f6d27807e`
}});

const api2 = axios.create({
    baseURL: 'https://api.vam.ac.uk/v2'
});


const fetchAllHarvardObjectList = (query, params = {}, page = 1) => {
    return api.get(`/object`, { params: { q: query, page: page }}).then((response) => response.data.records.filter(art => art.images?.length === 1))
    
    .catch((error) => {

        console.log("This is the error in Harvard object list api call ", error);
       
    })
}

const fetchHarvardObjectById = (object_id) => {
    return api.get('/object/${object_id}').then((response) => {

        return response.data;

    }).catch((error) => {

        console.log("This is the error in the Harvard object by id api call: ", error);

    })
}

const fetchAllVAObjectList = (query, params = {}, page = 1) => {
    return api2.get('/objects/search', { params: { q: query, page: page }}).then((response) => response.data.records.filter(art => art._images._iiif_image_base_url))

    .catch((error) => {

        console.log("This is the error in VA object list api call: ", error);

    })
}

const fetchVAObjectById = (systemNumber) => {
    return api2.get('/objects/${systemNumber}').then((response) => {

        return response.data;

    }).catch((error) => {
        
        console.log("This is the error in VA object by Id api call: ", error);

    })
}








export { fetchAllHarvardObjectList, fetchAllVAObjectList, fetchVAObjectById, fetchHarvardObjectById };