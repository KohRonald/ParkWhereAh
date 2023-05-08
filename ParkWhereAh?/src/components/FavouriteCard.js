import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import CarparkFavouriteCard from '../components/CarparkFavouriteCard'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFavouriteCarparkData } from '../api/getNearestCarpark';
import { useIsFocused } from "@react-navigation/native";


const FavouriteCard = () => {

    const isFocused = useIsFocused()
    const [displayCarparkData, setDisplayCarparkData] = useState([])
    const [buttonPress, setButtonPress] = useState(false)

    /*
    Grabs favourite carparks data from device cache and store into updatedCarparkData array
    Loops through carparks and grab carpark availability data with API call
    Splits the key-value pair into CarparkNumber and CarparkName
    Updates the updatedCarparkData array with CarparkNumber, CarparkName and CarparkAvailability
    Then stores updatedCarparkData array into displayCarparkData useState
    */
    const getData = async () => {
        try {
            const carparkData = await AsyncStorage.getItem('favouriteCarparks')
    
            if (carparkData !== null) {
                const parsedData = JSON.parse(carparkData)
                console.log("parseData: ", parsedData)

                const updatedCarparkData = []
                for (let carpark of parsedData) {
                    const carparkNum = carpark.CarparkNumber
                    const carparkName = carpark.CarparkName

                    updatedCarparkData.push({
                        CarparkNumber: carparkNum,
                        CarparkName: carparkName,
                        CarparkAvailability: await getFavouriteCarparkData(carparkNum),
                    })
                }
                setDisplayCarparkData(updatedCarparkData)

            } else {
                setDisplayCarparkData([])
            }
        } catch (err) {
          console.log("Error from getData function in Favourite.js: " + err)
        }
    }

    //Runs getData function on inital render
    useEffect(() => {
      getData()
    }, [])

    //Rerenders data when button is pressed or when screen is focused
    useEffect(() => {
        getData()
        console.log("Favourites Refreshed!")
    }, [buttonPress, isFocused])

    const refreshData = () => {
        setButtonPress(!buttonPress)
    }

    //Clears cache storage
    const clearStorage = () => {
        AsyncStorage.clear()
        setButtonPress(!buttonPress)
        console.log("Storage Cache Cleared!")
    }

    const FavouriteCardComponent = displayCarparkData && displayCarparkData.length > 0
    ? displayCarparkData.map((carparkData) => 
    <CarparkFavouriteCard 
        key={carparkData.CarparkNumber}
        carparkName={carparkData.CarparkName}
        availableLots={carparkData.CarparkAvailability !== undefined ? carparkData.CarparkAvailability : "No Data Available"}
    />
    ): null

    return (
        <View>
            {FavouriteCardComponent}

            <View style={styles.ButtonContainerStyle}>
                <TouchableOpacity style={styles.ButtonStyle} onPress={refreshData}>
                    <Text style={styles.HeadingStyle}>Refresh Carparks</Text>
                </TouchableOpacity>          
                          
                <TouchableOpacity style={styles.ButtonStyle} onPress={clearStorage}>
                    <Text style={styles.HeadingStyle}>Clear Carparks</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    ButtonStyle: {
        backgroundColor: '#ddd',
        borderRadius: 5,
        paddingVertical: 13,
        width: 150
    },
    HeadingStyle: {
        color: '#0d47a1',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    },
    ButtonContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '5%'
    },
    ButtonStyle: {
        backgroundColor: '#ddd',
        borderRadius: 5,
        paddingVertical: 13,
        width: 150
    }
})

export default FavouriteCard;