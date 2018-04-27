import React from 'react';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import HomeScreen from './components/screens/HomeScreen';
import BuildingScreen from './components/screens/BuildingScreen';
import AuthScreen from './components/screens/AuthScreen';

const SignedIn = StackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Building: {
            screen: BuildingScreen,
        },
    },
    {
        initialRouteName: "Home"
    }
);

const Auth = StackNavigator(
    {
        Auth: {
            screen: AuthScreen
        }
    }
);

export default SwitchNavigator(
    {
        SignedIn: {
            screen: SignedIn
        },
        Auth: {
            screen: Auth
        }
    },
    {
        initialRouteName: "Auth"
    }
);