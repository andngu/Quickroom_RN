import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Card } from './common';

const BuildingList = ({ building }) => {
    const { title, image } = building;
    return (
        <Card>
            <TouchableOpacity style={styles.touchableCard}>
                <ImageBackground
                    source={{ uri: image }}
                    style={styles.image}
                >
                    <Text style={styles.buildingName}>
                        {title}
                    </Text>
                </ImageBackground>

            </TouchableOpacity>
        </Card>
    );
};

const styles = StyleSheet.create({
    touchableCard: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        height: 150,
        width: 375,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buildingName: {
        fontSize: 35,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default BuildingList;