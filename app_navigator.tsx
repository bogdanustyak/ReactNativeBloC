import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './src/presentation/scenes/login/LoginScreen';
import HomeScreen from './src/presentation/scenes/home/HomeScreen';

const AppNavigator = createSwitchNavigator(
    {
        Login: LoginScreen,
        Home: HomeScreen
    },
    {
        initialRouteName: 'Login'
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
