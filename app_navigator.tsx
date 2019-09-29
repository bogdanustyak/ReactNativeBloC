import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './src/presentation/scenes/login/LoginScreen';
import HomeScreen from './src/presentation/scenes/home/HomeScreen';
import SignUpScreen from './src/presentation/scenes/signUp/SignUpScreen';

const AppNavigator = createSwitchNavigator(
    {
        Login: LoginScreen,
        SignUp: SignUpScreen,
        Home: HomeScreen
    },
    {
        initialRouteName: 'Login'
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
