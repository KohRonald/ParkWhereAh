import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@rneui/themed";
import SectionTitle from "../components/SectionTitle";


const AboutScreen = () => {
    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <SectionTitle sectionName={"About"}/>
            <Text style={styles.TextStyle}>Made by Ronald Koh for the CO3320 Project Module.</Text>
            <Text style={styles.TextStyle}>Carpark Data is limited to HDB carparks only. Several HDB carparks will have no data due to them being coupon based entry.</Text>
            <Text style={styles.TextStyle}>
                Favourite Feature:{'\n'}
                To favourite carpark, tap once on the star icon in the home screen, star will be blue.{'\n'}
                To unfavourite carpark, tap twice on the star icon in the home screen, star will become grey.{'\n'}
                From Favourite screen, tap on 'Refresh Carparks' to get refreshed lot availability.{'\n'}
                From Favourite screen, tap on 'Clear Carparks' to clear all favourite carparks.
            </Text>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    TextStyle: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 20
    }
})

export default AboutScreen;