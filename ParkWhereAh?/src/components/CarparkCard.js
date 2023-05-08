import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, LayoutAnimation } from 'react-native';
import { Text } from "@rneui/themed";
import { MaterialIcons } from '@expo/vector-icons';
import { toggleAnimation } from '../animations/toggleAnimation';
import StarCarpark from './StarCarpark';
import CarparkPriceDetail from './CarparkPriceDetail';
import CarparkLotsDetail from './CarparkLotsDetail';
import CarparkHeightDetail from './CarparkHeightDetail';
import CarparkDistanceDetail from './CarparkDistanceDetail';

const CarparkCard = ({ carparkNumber, carparkName, totalLots, central, freeParking, availableLots, carparkHeight, carparkDistance, convertedCombinedCoords }) => {

    const [showContent, setShowContent] = useState(false)
    const animationController = useRef(new Animated.Value(0)).current

    const toggleListItem = () => {
        const config = {
            duration: 300,
            toValue: showContent ? 0 : 1,
            useNativeDriver: true
        }
        Animated.timing(animationController, config).start()
        LayoutAnimation.configureNext(toggleAnimation)
        setShowContent(!showContent)
    }

    return (
        <View>
            <View style={styles.ContainerStyle}> 

                <StarCarpark CarparkName={carparkName} CarparkNumber={carparkNumber} ConvertedCombinedCoords={convertedCombinedCoords}/>

                <TouchableOpacity style={styles.DropdownStyle} onPress={toggleListItem}>
                    <View>
                        <Animated.View>
                            {!showContent
                                ? <MaterialIcons name="arrow-drop-down" size={24} color="black" style={styles.ArrowStyle}/> 
                                : <MaterialIcons name="arrow-drop-up" size={24} color="black" style={styles.ArrowStyle}/>
                            }
                        </Animated.View>
                    </View>
                        <Text style={styles.LotsStyle}>{availableLots}</Text>
                </TouchableOpacity>
            </View>

            {showContent && (
                <View style={styles.ExpandedViewStyle}>
                    <CarparkPriceDetail Central={central} FreeParking={freeParking}/>
                    <CarparkLotsDetail TotalLots={totalLots} CurrentLotsAvailable={availableLots}/>
                    <CarparkHeightDetail CarparkHeight={carparkHeight}/>
                    <CarparkDistanceDetail DistanceToCarpark={carparkDistance}/>
                </View>
            )}
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
        padding: 10
    },
    DropdownStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '25%'
    },
    ArrowStyle: {
        paddingTop: 15
    },
    LotsStyle: {
        fontWeight: 'bold',
        marginLeft: 15
    },
    ExpandedViewStyle: {
        backgroundColor: "#ddd",
        borderRadius: 12,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5
    }
})

export default CarparkCard;