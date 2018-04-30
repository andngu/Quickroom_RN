import { StackNavigator, SwitchNavigator } from 'react-navigation';
import HomeScreen from './components/screens/HomeScreen';
import BuildingScreen from './components/screens/BuildingScreen';
import AuthScreen from './components/screens/AuthScreen';
import RoomScreen from './components/screens/RoomScreen';

const SignedIn = StackNavigator(
  {
    Home: { screen: HomeScreen },
    Building: { screen: BuildingScreen },
    Room: { screen: RoomScreen },
  },
  {
    initialRouteName: 'Home',
  },
);

const Auth = StackNavigator({
  Auth: { screen: AuthScreen },
});

export default SwitchNavigator(
  {
    SignedIn: { screen: SignedIn },
    Auth: { screen: Auth },
  },
  {
    initialRouteName: 'Auth',
  },
);
