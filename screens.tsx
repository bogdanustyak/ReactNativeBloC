import { Navigation } from 'react-native-navigation';
import LoginScreen from './src/presentation/scenes/login/LoginScreen';
import HomeScreen from './src/presentation/scenes/home/HomeScreen';
import SplashScreen from './src/presentation/scenes/splash/SplashScreen';
import {name as appName} from './app.json';

export function registerScreens() {
  //  Navigation.registerComponent(appName, () => SplashScreen);
    Navigation.registerComponent('navigation.SplashScreen', () => SplashScreen);
    Navigation.registerComponent('navigation.LoginScreen', () => LoginScreen);
    Navigation.registerComponent('navigation.HomeScreen', () => HomeScreen);
}