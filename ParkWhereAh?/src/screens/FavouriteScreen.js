import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import FavouriteCard from "../components/FavouriteCard";

const FavouriteScreen = () => {

    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <SafeAreaView forceInset={{ top: 'always' }}>

                <View style={styles.ContainerStyle}>
                    <Text style={styles.HeadingStyle}>Location Name</Text>
                    <Text style={styles.HeadingStyle}>Available Lots</Text>
                </View>

                <FavouriteCard style={styles.informationStyle}/> 

                <View tyle={styles.InformationContainerStyle}>
                    <Text style={styles.informationStyle}>Add frequent carparks to your favourites by tapping the star button to view them quicker.</Text>
                </View>
               
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    ContainerStyle: {
        borderRadius: 12,
        backgroundColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        marginBottom: 5,
        padding: 20
    },
    HeadingStyle: {
        color: '#0d47a1',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    },
    InformationContainerStyle: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-around'
    },
    informationStyle: {
        fontWeight: 'bold',
        marginTop: '10%',
        textAlign: 'center'
    },
    ButtonStyle: {
        backgroundColor: '#ddd',
        borderRadius: 5,
        paddingVertical: 13,
        width: 150
    }
})

export default FavouriteScreen;