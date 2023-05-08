import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";

const CarparkLotsDetail = ({ TotalLots, CurrentLotsAvailable }) => {

    const calculateLotsPercentageAvailability = (TotalLots, CurrentLotsAvailable) => {
        return ((CurrentLotsAvailable / TotalLots) *100).toFixed(2)
    }

    return (
            <View>
                <Text style={styles.ParkingLotsTextStyle}>Parking Lots</Text>
                <View style={styles.ContainerStyle}>

                    <View style={styles.LotsPercentageStyle}>

                        {!isNaN(calculateLotsPercentageAvailability(TotalLots, CurrentLotsAvailable)) ? 
                        <Text>Lots Percentage Availability: {calculateLotsPercentageAvailability(TotalLots, CurrentLotsAvailable)}%</Text>
                        : <Text>No Data Available</Text>}

                    </View>

                    <View style={styles.LotsContainerStyle}>
                        <View style={styles.LotsStyle}>
                            <Text>Total Lots</Text>
                            <Text>{TotalLots}</Text>
                        </View>
                        <View style={styles.LotsStyle}>
                            <Text>Available Lots</Text>
                            <Text>{CurrentLotsAvailable}</Text>
                        </View>
                    </View>

                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    ParkingLotsTextStyle: {
        fontWeight: 'bold',
        marginTop: 3,
        marginLeft: 15
    },
    ContainerStyle: {
        backgroundColor: '#EEEEEE',
        borderRadius: 12,
        margin: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    LotsPercentageStyle: {
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        margin: 5,
        padding: 10
    },
    LotsContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    LotsStyle: {
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        margin: 5,
        padding: 10,
        width: '47%'
    }
})

export default CarparkLotsDetail;