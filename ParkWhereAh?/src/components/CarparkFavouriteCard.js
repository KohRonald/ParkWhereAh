import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from "@rneui/themed";

const CarparkFavouriteCard = ({ carparkName, availableLots }) => {

    return (
        <View>
            <View style={styles.ContainerStyle}> 

                <View style={styles.FavoriteLocationContainerStyle}>
                    <Text style={styles.LocationStyle}>{carparkName}</Text>
                </View>
                <View style={styles.AvailableLotContainerStyle}>
                        <Text style={styles.LotsStyle}>{availableLots}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    ContainerStyle: {
        borderRadius: 12,
        backgroundColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        padding: 20
    },
    AvailableLotContainerStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '25%'
    },
    LotsStyle: {
        fontWeight: 'bold',
        marginLeft: 15
    },
    FavoriteLocationContainerStyle: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    LocationStyle: {
        maxWidth: 240
    }
})

export default CarparkFavouriteCard;