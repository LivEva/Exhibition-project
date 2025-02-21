import axios from "axios";

const api = axios.create({
    baseURL: "https://api.harvardartmuseums.org",
params: {
    apikey: `5057e844-28d1-4bc1-acfe-1b9f6d27807e`
}});

const api2 = axios.create({
    baseURL: 'https://api.vam.ac.uk/v2'
});

const fetchAllObjects = (query, page = 1, sortBy, sortOrder, selectedCategory) => {

    let paramsVa = { q: query, page: page, order_sort: sortOrder}

    let paramsHarvard = { q: query, page: page, sort: "accessionyear", sortorder: sortOrder}

    if(sortBy){
        paramsVa.order_by = sortBy;
        sortBy === "date" ? paramsHarvard.sort = "century" : sortBy === "location" ? paramsHarvard.sort = "division" : sortBy === "place" ? paramsHarvard.sort = "period" : "any";
    }

    if(selectedCategory){

        paramsVa.id_category = selectedCategory.vnaID;
        paramsHarvard.classification = selectedCategory.harvardId;
        
    }

    return Promise.all([

        api.get(`/object`, {params: paramsHarvard }),

        api2.get(`/objects/search`, {params: paramsVa})


    ]).then(([harvardResponse, vaResponse]) =>
        
        {

        const harvardData = harvardResponse.data?.records.filter(art => art.images?.length === 1).map((art) => {

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

        const vaData = vaResponse.data.records.filter(art => art._images?._iiif_image_base_url).map((art) => 

            //CONCERNED WITH THIS API CALL, IT DOESN'T INVOLVE THE WHOLE API DATA
            
            {

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
        return api2.get(`/object/${id}`).then((response) => 
        

            (
           
            {

            id: response.data.record.systemNumber,
            source: "VA",
            title: response.data.record.titles[0].title|| "[ No title ]",
            description: response.data.record.briefDescription,
            image: `https://framemark.vam.ac.uk/collections/${response.data.record.images[0]}/full/full/0/default.jpg`,
            type: response.data.objectType,
            location: response.data._currentLocation?.site,
            date: response.data._primaryDate,
            dimensions: response.data.dimensions,
            categories: response.data.categories


        })).catch((error) => {
            console.log(error, "THIS IS THE ERROR FETCHING THE VA OBJECT BY ID")
            return null;
        });
    }
    else{
        return Promise.reject("INVALID")
    }
};

export { fetchAllObjects, fetchObjectById };