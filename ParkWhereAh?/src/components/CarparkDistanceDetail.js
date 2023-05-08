import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";

const CarparkDistanceDetail = ({ DistanceToCarpark }) => {

    return (
        <View>
            <Text style={styles.DistanceHeadingStyle}>Distance to Destination</Text>
            <View style={styles.ContainerStyle}>

                <View style={styles.DistanceTextStyle}>
                    <Text>{DistanceToCarpark} meter(s)</Text>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    DistanceHeadingStyle: {
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
    DistanceTextStyle: {
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        margin: 5,
        padding: 10
    }
})

export default CarparkDistanceDetail;



