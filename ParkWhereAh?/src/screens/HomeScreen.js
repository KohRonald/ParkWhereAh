import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { useIsFocused } from "@react-navigation/native";

//Import components
import SearchBar from "../components/SearchBar";
import CarparkCard from "../components/CarparkCard";

//API access endpoint
import { GetLatitudeLongtitude } from '../api/CarparkAPI';

//Import carpark processing function
import { searchNearestCarparks } from '../api/getNearestCarpark';

const HomeScreen = () => {
    
    const isFocused = useIsFocused()
    const [carparkQuery, setCarparkQuery] = useState('')
    const [initalLocation, setInitalLocation] = useState([])

    let [displayCarparkData, setDisplayCarparkData] = useState([])
    let [returnedCarparkscoordinates, setReturnedCarparkCoordinates] = useState([])
    let [searchedLongtitudeLatitude, setSearchedLongtitudeLatitude] = useState([])
    let [mapViewLongitude, setMapViewLongitude] = useState()
    let [mapViewLatitude, setMapViewLatitude] = useState()
    let [searchedAddress, setSearchedAddress] = useState()

    //======================Function to get Latitude and Longtitude======================

    /*
    Function calls OneMap API, takes postal code as input
    Returns data, and we store latitude, longtitude, and address in useState
    Latitude and Longtitude are in WGS84 format
    */

    const getLatLong = async (destination) => {

        console.log("ran get lat long")

        const res = await GetLatitudeLongtitude.get('', {
            params: {
                searchVal: String(destination),
                returnGeom: "Y",
                getAddrDetails: "Y",
                pageNum: 1
            }
        })

        /*
        If input postal code is not a legitmate postal code,
        Resets displayCarparkData and searchedLongtitudeLatitude useState to undefined
        */
        if (res.data.results.length !== 0 ){
            setSearchedAddress(res.data.results[0].ADDRESS)
            setMapViewLongitude(res.data.results[0].LONGITUDE)
            setMapViewLatitude(res.data.results[0].LATITUDE)
            setSearchedLongtitudeLatitude(res.data.results[0].LONGITUDE + " " + res.data.results[0].LATITUDE)
        } else {
            setDisplayCarparkData(undefined)
            setSearchedLongtitudeLatitude(undefined)
        }
    }

    //====================================================================================   

    //=================================UseEffect Hooks====================================

    /*
    First useEffect 
    - Runs on app first start up, acquire permissions of locations from user
    - Sets inital location into initalLocation useState hook

    Second useEffect
    - Runs on initalLocation state change
    - Grabs the latitude and longitude coords stored in initalLocation useState hook
    - Sets searched longtitude and latitude into setSearchedLongtitudeLatitude useState hook

    Third useEffect
    - Runs on SearchedLongtitudeLatitude state change
    - Grabs the latitude and longitude coords from searchedLongtitudeLatitudeuse and pass into searchNearestCarparks function
    - searchNearestCarparks function returns all the data of each of the five nearest carparks
    - Sets carparks to be displayed onto front-end into setDisplayCarparkData useState hook
    - Sets carpark coordinates to be displayed on map into setReturnedCarparkCoordinates useState hook
    */

    useEffect(() => {
        console.log("Initial render!")

        const getUserLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                return
            }
            let location = await Location.getCurrentPositionAsync({})
            setInitalLocation([location])
        }
        getUserLocation()
        console.log("UseEffect Hook ran getUserLocation function!")
    }, [])

    useEffect(() => {

        console.log("Render on initalLocation useState change!")
       
        if (initalLocation.length > 0) {

            setSearchedAddress('Current Location')
            setMapViewLongitude(JSON.stringify(initalLocation[0].coords.longitude))
            setMapViewLatitude(JSON.stringify(initalLocation[0].coords.latitude))
            setSearchedLongtitudeLatitude(initalLocation[0].coords.longitude + " " + initalLocation[0].coords.latitude)
            
            console.log("UseEffect Hook ran on initalLocation useState change!")
        } else {
            console.log("Nothing ran in 2nd UseEffect Hook")
        }

    },[initalLocation])

    useEffect(() => {

        console.log("User current location: " + JSON.stringify(searchedLongtitudeLatitude))

        const nearbyCarparks = async (searchedLongtitudeLatitude) => {
            return await searchNearestCarparks(searchedLongtitudeLatitude)
        }

        if (searchedLongtitudeLatitude !== undefined && searchedLongtitudeLatitude.length > 0) {

            nearbyCarparks(searchedLongtitudeLatitude)
                .then((data) => {
                    console.log("Data from 2nd useeffect with searchNearestCarparks function: ", data)
                    setDisplayCarparkData(data)

                    const nearbyCarparkCoordinates = data.map(item => ({
                        longitude: parseFloat(item.converted_combined_coords.split(" ")[0]),
                        latitude: parseFloat(item.converted_combined_coords.split(" ")[1]),
                        address: item.address
                    }))
                    setReturnedCarparkCoordinates(nearbyCarparkCoordinates)
                })
                .catch((err) => {
                    console.log("Error from 3rd useEffect in HomeScreen.js: " + err)
                })
                
            console.log("UseEffect Hook ran searchNearestCarparks function!")
        } else {
            console.log("UseEffect Hook ran and did not reach searchNearestCarparks function!")
        }
        console.log(" ")

    }, [searchedLongtitudeLatitude])

    //===================================================================================
    
    //===============================On search function==================================

    const getCarparkInformation = async (locationQuery) => {

        //Checks if postal code is a valid code
        if (locationQuery.length < 6 || locationQuery.length >= 7){
            setDisplayCarparkData(undefined)
            setSearchedLongtitudeLatitude(undefined)
        } else {
            await getLatLong(locationQuery)
        }
    }

    //====================================================================================

    /*
    .map creates a new array and populates with the result by calling the
    callback function, returning a new Carpark card component, which gets added to
    the new array
    */
    const CarparkCardComponent = displayCarparkData !== undefined
    ? displayCarparkData.map((carparkData) => 
      <CarparkCard 
          key={carparkData.car_park_no}
          carparkNumber={carparkData.car_park_no}
          carparkName={carparkData.address}
          central={carparkData.central}
          freeParking={carparkData.free_parking}
          totalLots={carparkData.total_lots !== undefined ? carparkData.total_lots : "No Data Available"}
          availableLots={carparkData.lots_available !== undefined ? carparkData.lots_available : "No Data Available"}
          carparkHeight={carparkData.gantry_height!== 0 ? carparkData.gantry_height : "Open Air Carpark"}
          carparkDistance={carparkData.distance}
          convertedCombinedCoords={carparkData.converted_combined_coords}
      />
    ): null

    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <SafeAreaView forceInset={{ top: 'always' }}>

                {mapViewLatitude && mapViewLongitude ? (
                    <MapView 
                        style={styles.MapStyle} 
                        region={{
                            latitude: parseFloat(mapViewLatitude),
                            longitude: parseFloat(mapViewLongitude),
                            latitudeDelta: 0.006,
                            longitudeDelta: 0.006
                        }}
                        showsUserLocation={true}
                    >

                    <Marker
                        pinColor="tan"
                        coordinate={{
                            latitude: parseFloat(mapViewLatitude),
                            longitude: parseFloat(mapViewLongitude)
                        }}
                        title={searchedAddress}
                    />

                    {returnedCarparkscoordinates.map(marker => (
                        <Marker
                            key={marker.address}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            title={marker.address}
                        />
                    ))}
                    </MapView>
                ):
                    <Text style={styles.MapStyle}>Loading...</Text>
                }
                <SearchBar 
                    carparkQuery={carparkQuery} 
                    onPostalCodeChange={(newSearch) => setCarparkQuery(newSearch)}
                    onQuerySubmit={() => getCarparkInformation(carparkQuery)}
                />
                <View style={styles.ContainerStyle}>
                    <Text style={styles.HeadingStyle}>Location Name</Text>
                    <Text style={styles.HeadingStyle}>Lots Available</Text>
                </View>

                {/* //Rerenders view when screen is focused */}
                <View>
                    {isFocused && (initalLocation.length == 0 ? 
                    <Text style={styles.ErrorStyle}>Please alow location permissions. If you have allowed permissions, please restart the app.</Text>
                    : CarparkCardComponent === null ? 
                    <Text style={styles.ErrorStyle}>No Carpark found. Please enter a valid 6 digit postal code.</Text> 
                    : CarparkCardComponent
                    )}
                </View>

            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    MapStyle: {
        backgroundColor: '#808080',
        marginTop: 10,
        marginBottom: 0,
        marginLeft: 10,
        marginRight: 10,
        padding: 170,
        textAlign: 'center'
    },
    ContainerStyle: {
        backgroundColor: '#ddd',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        padding: 20
    },
    HeadingStyle: {
        color: '#0d47a1',
        fontWeight: 'bold'
    },
    ErrorStyle: {
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center'
    }
})

export default HomeScreen;