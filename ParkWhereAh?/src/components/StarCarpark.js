import { useEffect, useState } from 'react';
import { StyleSheet, View } from "react-native";
import { Text, Button, Icon } from "@rneui/themed";
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
When button is pressed we grab the carpark number and store into cache for future api calls
Whenever user in favourite tab, api will call stored carpark numbers and retrieve carpark data to be displayed.
*/
const FavouriteItem = ({ CarparkName, CarparkNumber }) => {

    const [isPressed, setIsPressed] = useState(false)
    const [savedData, setSavedData] = useState([["favouriteCarparks",[]]])

    //To load previous stored carpark numbers and store into savedData useState
    useEffect(() => {
        const loadData = async () => {
            try {
                const updatedData = await AsyncStorage.multiGet(["favouriteCarparks"])
                const parsedData = updatedData.map((item) => [item[0], JSON.parse(item[1])])
                setSavedData(parsedData)
            } catch (err) {
                console.log("Error from useEffect loadData function in StarCarpark.js: " + err)
            }
        }
        loadData()
    }, [])

    /*
    To store tapped carpark's number and name as key-value pair into favouriteCarparks array
    To remove key-value pair of tapped carpark from favouriteCarparks array
    Then stores favouriteCarparks array into device cache for future reference
    Also stores key-value pairs into savedData useState
    */
    const triggerPress = async () => {
        setIsPressed(prevIsPressed => !prevIsPressed)

        try {
            const carparkData = await AsyncStorage.getItem('favouriteCarparks')
            let favouriteCarparks = []
            if (carparkData !== null) {
                favouriteCarparks = JSON.parse(carparkData)
            }

            if (isPressed) {
                favouriteCarparks = favouriteCarparks.filter((data) => data.CarparkNumber !== CarparkNumber)
            } else {
                if (CarparkNumber && CarparkName && !favouriteCarparks.some((data) => data.CarparkNumber === CarparkNumber)) {
                    favouriteCarparks.push({ CarparkNumber, CarparkName })
                }
            }
            
            await AsyncStorage.setItem('favouriteCarparks', JSON.stringify(favouriteCarparks))

            const updatedData = await AsyncStorage.multiGet(["favouriteCarparks"])
            const parsedData = updatedData.map((item) => [item[0], JSON.parse(item[1])])
            setSavedData(parsedData)

        } catch (err) {
            console.log("Error from triggerPress function in StarCarpark.js: " + err)
        }
    }
    
    return (
        <View style={styles.FavoriteLocationStyle}>
            <Button 
                icon = {
                    <Icon
                        name="star"
                        size={24}
                        color={(isPressed || (savedData && savedData.some((data) => data[1] && data[1].some((carpark) => carpark.CarparkNumber === CarparkNumber))))
                            ? '#0d47a1' : '#808080'}
                    />
                }
                type='clear'
                onPress={() => triggerPress()}
            />
            <Text style={styles.LocationStyle}>{CarparkName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    FavoriteLocationStyle: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    LocationStyle: {
        maxWidth: 240
    }
})

export default FavouriteItem;