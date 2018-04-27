import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Welcome to the app!',
    };

    render() {
        return (
            <View>
                <Button title="Show me more of the app" onPress={this._showMoreApp} />
                <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
            </View>
        );
    }

    _showMoreApp = () => {
        this.props.navigation.navigate('Building');
    };

    _signOutAsync = async () => {
        this.props.navigation.navigate('Auth');
    };
}

export default HomeScreen;