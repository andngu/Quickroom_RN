import { StackNavigator, SwitchNavigator } from 'react-navigation';
import HomeScreen from './components/screens/HomeScreen';
import BuildingsScreen from './components/screens/BuildingsScreen';
import AuthScreen from './components/screens/AuthScreen';
import RoomsScreen from './components/screens/RoomsScreen';
import DatePickerScreen from './components/screens/DatePickerScreen';
import TimePickerScreen from './components/screens/TimePickerScreen';
import DetailsScreen from './components/screens/DetailsScreen';

const SignedIn = StackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    BuildingsScreen: { screen: BuildingsScreen },
    RoomsScreen: { screen: RoomsScreen },
    DatePickerScreen: { screen: DatePickerScreen },
    TimePickerScreen: { screen: TimePickerScreen },
    DetailsScreen: { screen: DetailsScreen },
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
