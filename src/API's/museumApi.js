import axios from "axios";

const api = axios.create({
    baseURL: "https://api.harvardartmuseums.org",
params: {
    apikey: `5057e844-28d1-4bc1-acfe-1b9f6d27807e`
}});

const api2 = axios.create({
    baseURL: 'https://api.vam.ac.uk/v2'
});

const fetchAllObjects = (query, page = 1, sort_by, order) => {

    return Promise.all([
        api.get(`/object`, { params: { q: query, page: page, sort_by: sort_by, order: order }}),
        api2.get(`/objects/search`, { params: { q: query, page: page, sort_by: sort_by, order: order }})
    ]).then(([harvardResponse, vaResponse]) => {

        console.log(vaResponse)

        const harvardData = harvardResponse.data.records.filter(art => art.images?.length === 1).map((art) => {

            return {
                id: art.id,
                yearAdded: art.accessionyear,
                source: "Harvard",
                title: art.title || "[ No title ]",
                image: art.images?.[0]?.baseimageurl || "no image",
                type: art.division,
                dimensions: art.dimensions,
                century: art.century,
                date: art.dated,
                department: art.department,
                origin: art.provenance,
                location: art.creditline,
            }
        });

        const vaData = vaResponse.data.records.filter(art => art._images?._iiif_image_base_url).map((art) => {

            return {
                id: art.systemNumber,
                yearAdded: art.accessionNumber.slice(-4),
				source: "VA",
				title: art._primaryTitle || "[ No title ]",
				image: art._images?._iiif_image_base_url + "/full/full/0/default.jpg",
				type: art.objectType,
				location: art._currentLocation.site = "Victoria and Albert Museum",
				date: art._primaryDate,
            }
        });
  
        return [...harvardData, ...vaData];
    }).catch((error) => {

        console.log(error, "THIS IS THE ERROR FOR THE COMBINED API DATA")

    });
};

const fetchObjectById = (id, source) => {

    if(source === "Harvard"){
        return api.get(`/object/${id}`).then((response) => ({
            id: response.data.id,
            source: "Harvard",
            title: response.data.title || "[ No title ]",
            image: response.data.images?.[0]?.baseimageurl || "no image",
            type: response.data.division,
            dimensions: response.data.dimensions,
            century: response.data.century,
            date: response.data.dated,
            department: response.data.department,
            origin: response.data.provenance,
            location: response.data.creditline,

         
        })).catch((error) => {

            console.log("THIS IS THE ERROR FOR FETCHING HARVARD OBJECT BY ID")
            return null;

        });
    } else if(source === "VA"){
        return api2.get(`/objects/${id}`).then((response) => ({

            id: response.data.systemNumber,
            source: "VA",
            title: response.data._primaryTitle || "[ No title ]",
            image: response.data._images?._iiif_image_base_url + "full/full/0/default.jpg",
            type: response.data.objectType,
            location: response.data._currentLocation.site = "Victoria and Albert Museum",
            date: response.data._primaryDate,

        })).catch((error) => {
            console.log(error, "THIS IS THE ERROR FETCHING THE VA OBJECT BY ID")
            return null;
        });
    }
    else{
        return Promise.reject("INVALID")
    }
};












// const fetchAllHarvardObjectList = (query, params = {}, page = 1) => {
//     return api.get(`/object`, { params: { q: query, page: page }}).then((response) => {
        
//         return response.data.records.filter(art => art.images?.length === 1)})
    
//     .catch((error) => {

//         console.log("This is the error in Harvard object list api call ", error);
       
//     })
// }

// const fetchAllVAObjectList = (query, params = {}, page = 1) => {
//     return api2.get('/objects/search', { params: { q: query, page: page }}).then((response) => 
        
//         {
            
//             return response.data.records.filter(art => art._images._iiif_image_base_url)})



//     .catch((error) => {

//         console.log("This is the error in VA object list api call: ", error);

//     })
// }

// //HARVARD BY ID

// // const fetchHarvardObjectById = (object_id) => {
// //     return api.get(`/object/${object_id}`).then((response) => {

// //         return response.data;

// //     }).catch((error) => {

// //         console.log("This is the error in the Harvard object by id api call: ", error);

// //     })
// // }

// // // VAM BY ID

// // const fetchVAObjectById = (systemNumber) => {
// //     return api2.get(`/objects/${systemNumber}`).then((response) => {

// //         console.log(response, "VA RESPONSE")

// //         return response.data;

// //     }).catch((error) => {
        
// //         console.log("This is the error in VA object by Id api call: ", error);

// //     })
// // }








export { fetchAllObjects, fetchObjectById };