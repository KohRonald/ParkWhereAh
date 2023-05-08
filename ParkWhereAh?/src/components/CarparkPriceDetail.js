import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";

const CarparkPriceDetail = ({ Central, FreeParking }) => {

    /*
    Parking Charges:
    Non Central Rates: $0.60/30min
    Central Rates: 
    $1.20/30min from 7:00am to 5:00pm, Mon - Sun
    $0.60/30min for other hours
    
    Night Parking Charges:
    Non Central Rates: $0.60/30min, capped at $5/night

    Prices reference: https://www.hdb.gov.sg/car-parks/shortterm-parking/short-term-parking-charges
    */

    return (
            <View>
                <Text style={styles.PriceTextStyle}>Price</Text>
                <View style={styles.ContainerStyle}>

                    <View style={styles.PriceContainerStyle}>

                        {({Central}.Central) === "Yes" ?
                            <>
                            <View style={styles.PriceCappedStyle}>
                                <Text>Parking Charges capped at $20/day</Text>
                            </View>
                            <View style={styles.PriceStyle}>
                                <Text>Mon - Sun 07:00 - 17:00</Text>
                                <Text>30mins: $1.20</Text>
                            </View>
                            <View style={styles.PriceStyle}>
                                <Text>Mon - Sun 17:00 - 07:00</Text>
                                <Text>30mins: $0.60</Text>
                            </View>
                            <View style={styles.PriceStyle}>
                                <Text>Free Parking</Text>
                                <Text>{FreeParking}</Text>
                            </View>
                            </>
                            : (({Central}.Central) === "Yes" &&  {FreeParking} !== "No") ?
                            <>
                            <View style={styles.PriceCappedStyle}>
                                <Text>Parking Charges capped at $20/day</Text>
                            </View>
                            <View style={styles.PriceStyle}>
                                <Text>Mon - Sat 07:00 - 17:00</Text>
                                <Text>30mins: $1.20</Text>
                            </View>
                            <View style={styles.PriceStyle}>
                                <Text>Mon - Sat 17:00 - 07:00</Text>
                                <Text>30mins: $0.60</Text>
                            </View>
                            <View style={styles.PriceStyle}>
                                <Text>Sun & PH 22:30 - 07:00</Text>
                                <Text>30mins: $0.60</Text>
                            </View>
                            <View style={styles.PriceStyle}>
                                <Text>Free Parking</Text>
                                <Text>{FreeParking}</Text>
                            </View>
                            </>
                            :
                            {FreeParking} === "No" ?
                            <>
                            <View style={styles.PriceCappedStyle}>
                                <Text>Night Parking Charges capped at $5/night</Text>
                            </View>
                             <View style={styles.PriceStyle}>
                                <Text>Mon - Sun 07:00 - 17:00</Text>
                                <Text>30mins: $0.60</Text>
                            </View>
                            <View style={styles.PriceStyle}>
                                <Text>Mon - Sun 17:00 - 07:00</Text>
                                <Text>30mins: $0.60</Text>
                            </View>
                            <View style={styles.PriceStyle}>
                                <Text>Free Parking</Text>
                                <Text>{FreeParking}</Text>
                            </View>
                            </>
                            :
                            <>
                            <View style={styles.PriceCappedStyle}>
                                <Text>Night Parking Charges capped at $5/night</Text>
                            </View>
                            <View style={styles.PriceStyle}>
                                <Text>Mon - Sat 07:00 - 17:00</Text>
                                <Text>30mins: $0.60</Text>
                            </View>
                            <View style={styles.PriceStyle}>
                                <Text>Mon - Sat 17:00 - 07:00</Text>
                                <Text>30mins: $0.60</Text>
                            </View>
                            <View style={styles.PriceStyle}>
                                <Text>Sun & PH 22:30 - 07:00</Text>
                                <Text>30mins: $0.60</Text>
                            </View>
                            <View style={styles.PriceStyle}>
                                <Text>Free Parking</Text>
                                <Text>{FreeParking}</Text>
                            </View>
                            </>
                        } 
                    </View>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    PriceTextStyle: {
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 15
    },
    ContainerStyle: {
        backgroundColor: '#EEEEEE',
        borderRadius: 12,
        margin: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    PriceContainerStyle: {
        backgroundColor: '#EEEEEE',
        flexDirection: 'row',
        flexWrap: "wrap"
    },
    PriceCappedStyle: {
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        margin: 5,
        padding: 10,
        flexGrow: 1
    },
    PriceStyle: {
        alignContent: 'center',
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        margin: 5,
        padding: 10,
        width: '47%'
    }
})

export default CarparkPriceDetail;