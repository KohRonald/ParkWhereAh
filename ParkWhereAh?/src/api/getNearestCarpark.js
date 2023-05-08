//API access endpoint
import { CarparkAvailability } from '../api/CarparkAPI';

const jsonFile = require('./updated-hdb-carpark-information.json')

let dataArray = []
let carparkAvailability = []
let nearestCarparkLotAvailability = []
let favouriteCarparkLotAvailability = []

/*
This file does the following:
    Reads updated-hdb-carpark-information.json and push into dataArray array 
    Calculate haversineDistance of all carparks with props(input destinationCoords) and converted_combined_coords retrieved from dataArray
    Add new property named distance into dataArray
    Sorts the carpark distance by nearest to furtherest and grab 5 of the nearest carpark
    Calls carpark availability API and push all carpark availability into carparkAvailability array
    grabCarparkAvailability function to store data of 5 of the nearest carpark into nearestCarparkLotAvailability array by using .find based on their carpark number
    Add new property named lots_available and total_lots from nearestCarparkLotAvailability array into fiveNearestCarparks by using .find to map the respective data 
    based on their carpark number
*/

const searchNearestCarparks = async (destinationCoords) => {

    try {

        dataArray = []

        for(var i = 0; i < jsonFile.length; i++){
            let distance = haversineDistance(destinationCoords, jsonFile[i].converted_combined_coords)
            jsonFile[i].distance = distance
            dataArray.push(jsonFile[i])
        }

        const fiveNearestCarparks = sortCarparksAndReturnTopFiveNearestCarparks()

        await getCarparkAvailability()

        //Grab searched carpark availability dataset of the five carpark data and store into nearestCarparkLotAvailability array
        for (let data of fiveNearestCarparks) {
            await grabCarparkAvailability(data.car_park_no)
        }

        //Filter nearestCarparkLotAvailability to remove those carparks which do not have data on availability
        const filteredCarparks = nearestCarparkLotAvailability.filter(obj => obj !== undefined)

        for (let i = 0; i < fiveNearestCarparks.length; i++) {

            const carparkNumber = fiveNearestCarparks[i].car_park_no

            /*
            At current iterated carpark, find searched carpark from filtered nearestCarparkLotAvailability 
            array to grab carpark dataset
            */
            const nearestCarpark = await filteredCarparks.find(carpark => carpark.carpark_number === carparkNumber)

            //Add total lots and lots available to carpark information data for those which has data
            if (nearestCarpark !== undefined) {
                const carparkInfo = nearestCarpark.carpark_info[0]
                fiveNearestCarparks[i].lots_available = carparkInfo.lots_available
                fiveNearestCarparks[i].total_lots = carparkInfo.total_lots
            }
        }          

        return fiveNearestCarparks

    }catch(err) {
        console.log("Error from searchNearestCarparks function: " + err)
    }
  
}

const getFavouriteCarparkData = async (carparkNum) => {

    try {

        //API call to get all carpark availability dataset
        await getCarparkAvailability()

        //Grab searched carpark availability dataset and store into favouriteCarparkLotAvailability array
        await grabFavouriteCarparkAvailability(carparkNum)
    
        //Filter favouriteCarparkLotAvailability to remove those carparks which do not have data on availability
        const filteredCarparks = favouriteCarparkLotAvailability.filter(obj => obj !== undefined)

        //Find searched carpark from filtered favouriteCarparkLotAvailability array to grab its dataset
        const nearestCarpark = await filteredCarparks.find(carpark => carpark.carpark_number === carparkNum)

        //Returns lots availability information for those which has data
        if (nearestCarpark !== undefined) {
            const carparkInfo = nearestCarpark.carpark_info[0]
            return carparkInfo.lots_available
        }

    }catch(err) {
        console.log("Error from getFavouriteCarparkData function: " + err)
    }
  
}

const getCarparkAvailability = async () => {

    try {
        const res = await CarparkAvailability.get('', { 
            params: {}
        })
        if(res.data.items.length !== 0){
            carparkAvailability.push(res.data.items[0].carpark_data)
        } else {
            console.log("Result from CarparkAvailability API is empty: ", res.data.items)
        }


    } catch(err) {
        console.log("Error from getCarparkAvailability: " + err)
    }
}

const grabCarparkAvailability = async (carparkNum) => {
    var data =  await carparkAvailability[0].find(data => data.carpark_number === carparkNum)
    nearestCarparkLotAvailability.push(data)
}

const grabFavouriteCarparkAvailability = async (carparkNum) => {
    var data =  await carparkAvailability[0].find(data => data.carpark_number === carparkNum)
    favouriteCarparkLotAvailability.push(data)
}

const sortCarparksAndReturnTopFiveNearestCarparks = () => {
    dataArray.sort((a, b) => a.distance - b.distance)
    const topFive = dataArray.slice(0, 5)
    return topFive
}

/*
Calculates distance between input address and other carparks based on
lat and lng coordinates. It returns the distance in meters(m), rounded to 2 d.p.

Written with reference to haversine formula: https://www.movable-type.co.uk/scripts/latlong.html
*/
const haversineDistance = (destinationCoord, carparkCoords) => {

    let r = 6371

    let lat1 = degToRadians(parseFloat(carparkCoords.split(' ')[1]))
    let lon1 = degToRadians(parseFloat(carparkCoords.split(' ')[0]))
    let lat2 = degToRadians(parseFloat(destinationCoord.split(' ')[1]))
    let lon2 = degToRadians(parseFloat(destinationCoord.split(' ')[0]))

    let dlon = lon2 - lon1
    let dlat = lat2 - lat1

    const a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = Math.round(r * c * 1000, 2)

    return distance
}

function degToRadians(deg) {
    return deg * (Math.PI/180)
}

export {
    searchNearestCarparks,
    getFavouriteCarparkData
}