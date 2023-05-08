import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";

const SectionTitle = ({ sectionName }) => {
    return (
        <View style={styles.ContainerStyle}>
            <Text h3 style={styles.HeadingStyle}>{sectionName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ContainerStyle: {
        backgroundColor: '#ddd',
        borderRadius: 12,
        margin: 10,
        padding: 10
    },
    HeadingStyle: {
        color: '#0d47a1',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default SectionTitle;