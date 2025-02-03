import axios from "axios";

const api = axios.create({baseURL: `https://api.harvardartmuseums.org/RESOURCE_TYPE?apikey=d6e343a5-b715-415e-a623-b2e7dbced8c2`});


const collectionList = () => {
    return api.get(`/api`).then((response) => {

        console.log(response.data)

        return response.data;
        
    })
}

export default collectionList;