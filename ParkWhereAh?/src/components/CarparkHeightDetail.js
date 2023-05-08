import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";

const CarparkHeightDetail = ({ CarparkHeight }) => {

    return (
            <View>
                <Text style={styles.HeightHeadingStyle}>Carpark Height</Text>
                <View style={styles.ContainerStyle}>

                    <View style={styles.HeightTextStyle}>
                        <Text>{CarparkHeight !== "Open Air Carpark" ? CarparkHeight + " meter(s)" : CarparkHeight}</Text>
                    </View>

                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    HeightHeadingStyle: {
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
    HeightTextStyle: {
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        margin: 5,
        padding: 10
    }
})

export default CarparkHeightDetail;