import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button, View } from 'react-native';

import LoadingScreen from './LoadingScreen';
import Home_page from './Home_page';
import NewQuoteScreen from './NewQuote';


import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import home from './home';
import register from './register';
import login from './login';
import UDimage from './UDimage';

import HomeScreen from './HomeScreen';

const Drawer = createDrawerNavigator();

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        </View>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}
const AppStack = createStackNavigator({
    Home_page: {
        screen: Home_page,
        navigationOptions: ({ navigation }) => ({
            title: `Home page`,
        }),
    },
    NewQuote: {
        screen: NewQuoteScreen,
        navigationOptions: ({ navigation }) => ({
            title: `New Quote`,
        }),
    },
    FirstPage: { screen: FirstPage },
    SecondPage: { screen: SecondPage },
    // home: { screen: home },
    register: { screen: register },
    login: { screen: login },
    UDimage: { screen: UDimage },
    HomeScreen: { screen: HomeScreen }
});

const RoutesStack = createSwitchNavigator(
    {
        Loading: LoadingScreen,
        App: AppStack
    },
    { initialRouteName: 'Loading' }
);

const Router = createAppContainer(RoutesStack);

export default Router;
