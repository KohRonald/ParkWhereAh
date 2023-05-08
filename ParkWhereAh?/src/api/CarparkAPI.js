import axios from 'axios';

//API endpoints
const CARPARK_AVAILABILITY = 'https://api.data.gov.sg/v1/transport/carpark-availability';
const ONEMAP_API = 'https://developers.onemap.sg/commonapi/search?'

const CarparkAvailability = axios.create({
    baseURL: CARPARK_AVAILABILITY,
    headers:{}
})

const GetLatitudeLongtitude = axios.create({
    baseURL: ONEMAP_API,
    headers: {}
})

export {
    CarparkAvailability,
    GetLatitudeLongtitude
}