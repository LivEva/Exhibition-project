import axios from "axios";

const api = axios.create({
    baseURL: "https://virtual-exhibition-project.onrender.com",
});

const fetchAllObjects = async (query, page = 1, sortBy, sortOrder, selectedCategory, minResults = 20) => {
    let results = [];
    let currentPage = page;
    while (results.length < minResults) {
        let paramsVa = { q: query, page: currentPage, size: 10, order_sort: sortOrder }
        let paramsHarvard = { q: query, page: currentPage, size: 10, sort: "accessionyear", sortorder: sortOrder }
        if (sortBy) {
            paramsVa.order_by = sortBy;
            sortBy === "date" ? paramsHarvard.sort = "century"
            : sortBy === "location" ? paramsHarvard.sort = "division"
            : sortBy === "place" ? paramsHarvard.sort = "period"
            : "any";
        }
        if (selectedCategory) {
            paramsVa.id_category = selectedCategory.vnaID;
            paramsHarvard.classification = selectedCategory.harvardId;
        }
        try {
            const [harvardResponse, vaResponse] = await Promise.all([
                api.get(`/harvard/objects`, { params: paramsHarvard }),
                api.get(`/va/objects`, { params: paramsVa })
            ]);

            const harvardData = harvardResponse.data?.records
                .filter(art => art.images?.length === 1 && art.title)
                .map(art => ({
                    id: art.id,
                    yearAdded: art.accessionyear,
                    source: "Harvard",
                    title: art.title,
                    image: art.images?.[0]?.baseimageurl || "no image",
                    type: art.division,
                    dimensions: art.dimensions,
                    century: art.century,
                    date: art.dated,
                    department: art.department,
                    origin: art.provenance,
                    location: art.creditline,
                }));
            const vaData = vaResponse.data.records
                .filter(art => art._images?._iiif_image_base_url && art._primaryTitle)
                .map(art => ({
                    id: art.systemNumber,
                    yearAdded: art.accessionNumber.slice(-4),
                    source: "VA",
                    title: art._primaryTitle,
                    image: art._images?._iiif_image_base_url + "/full/full/0/default.jpg",
                    type: art.objectType,
                    location: art._currentLocation.site = "Victoria and Albert Museum",
                    date: art._primaryDate,
                }));
            const newResults = [...harvardData, ...vaData];
     
            if (newResults.length === 0) break;
            results = [...results, ...newResults];
            currentPage++;
        } catch (error) {
            console.log(error, "THIS IS THE ERROR FOR THE COMBINED API DATA");
            break;
        }
    }
    return results.slice(0, minResults);
};

const fetchObjectById = (id, source) => {
    if (source === "Harvard") {
        return api.get(`/harvard/objects/${id}`).then((response) => 
            
         
            
            ({
            id: response.data.id,
            source: "Harvard",
            title: response.data.title || "[ No title ]",
            image: response.data.images?.[0]?.baseimageurl || "no image",
            type: response.data.division || "*not available*",
            dimensions: response.data.dimensions || "*not available*",
            century: response.data.century || "*not available*",
            date: response.data.dated || "*not available*",
            department: response.data.department || "*not available*",
            origin: response.data.provenance || "*not available*",
            location: "Harvard museum",
            credit: response.data.creditline || "*not available*",
            physicalDescription: response.data.medium || "*not available*",
        })).catch((error) => {
            console.log("THIS IS THE ERROR FOR FETCHING HARVARD OBJECT BY ID");
            return null;
        });
    } else if (source === "VA") {
     
        return api.get(`/va/objects/${id}`).then((response) => 
        
            (
            {
                
            id: response.data.record.systemNumber,
            source: "VA",
            title: response.data.record.titles[0].title || "[ No title ]",
            description: response.data.record.briefDescription || "*not available*",
            image: `https://framemark.vam.ac.uk/collections/${response.data.record.images[0]}/full/full/0/default.jpg`,
            type: response.data.record.objectType || "*not available*",
            location: "Victoria and Albert museum",
            date: response.data.record._primaryDate || "*not available*",
            dimensions: `${response.data.record.dimensions[0].dimension}: ${response.data.record.dimensions[0].value}${response.data.record.dimensions[0].unit}` || "*not available*",
            categories: response.data.record.categories || "*not available*",
            credit: response.data.record.creditLine || "*not available*",
            summary: response.data.record.summaryDescription || "*not available*",
            physicalDescription: response.data.record.physicalDescription || "*not available*",
        

        })).catch((error) => {
            console.log(error, "THIS IS THE ERROR FETCHING THE VA OBJECT BY ID");
            return null;
        });

    } else {
        return Promise.reject("INVALID");   
    }
    
};

export { fetchAllObjects, fetchObjectById };
