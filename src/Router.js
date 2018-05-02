import { StackNavigator, SwitchNavigator } from 'react-navigation';
import HomeScreen from './components/screens/HomeScreen';
import BuildingsScreen from './components/screens/BuildingsScreen';
import AuthScreen from './components/screens/AuthScreen';
import RoomsScreen from './components/screens/RoomsScreen';
import DatePickerScreen from './components/screens/DatePickerScreen';

const SignedIn = StackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    BuildingsScreen: { screen: BuildingsScreen },
    RoomsScreen: { screen: RoomsScreen },
    DatePickerScreen: { screen: DatePickerScreen },
  },
  {
    initialRouteName: 'HomeScreen',
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
