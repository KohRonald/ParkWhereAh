import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native' 
import { FontAwesome } from '@expo/vector-icons';

const SearchBar = ({ carparkQuery, onPostalCodeChange, onQuerySubmit}) => {

    return (
        <View style={styles.backgroundStyle}>
            <FontAwesome name="search" style={styles.iconStyle} size={24} color="black" />
            <TextInput 
                placeholder='Search Postal Code'
                autoCorrect={false}
                autoCapitalize={false}
                style={styles.inputStyle} 
                value={carparkQuery} 
                onChangeText={onPostalCodeChange}
                onSubmitEditing={onQuerySubmit}
            />
        </View>
        
    )
}

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#dee2e6',
        borderRadius: 10,
        flexDirection: 'row',
        height: 50,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 15
    },
    inputStyle: {
        flex: 1,
        fontSize: 18
    },
    iconStyle: {
        alignSelf: 'center',
        fontSize: 35,
        marginHorizontal: 15
    }
})

export default SearchBar;