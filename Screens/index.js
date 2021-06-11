import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button, View } from 'react-native';
import LoadingScreen from './LoadingScreen';
import Quotes_page from './Quotes_page';
import NewQuoteScreen from './NewQuote';
import FB_file_iamge from './FB_file_iamge';
import SecondPage from './SecondPage';
import home from './home';
import register from './register';
import login from './login';
import UDimage from './UDimage';
import HomeScreen from './HomeScreen';
import dashboard from './dashboard';
import SideMenuList from './SideMenuList'
import SideMenu from './SideMenu'


const AppStack = createStackNavigator({
    Quotes_page: {
        screen: Quotes_page,
        navigationOptions: ({ navigation }) => ({header: null}),
    },
    NewQuote: {
        screen: NewQuoteScreen,
        navigationOptions: ({ navigation }) => ({
            title: `New Quote`,
        }),
    },
    FB_file_iamge: { screen: FB_file_iamge, navigationOptions: ({ navigation }) => ({header: null}), },
    SecondPage: { screen: SecondPage , navigationOptions: ({ navigation }) => ({header: null}),},
    home: { screen: home , navigationOptions: ({ navigation }) => ({header: null}),},
    register: { screen: register , navigationOptions: ({ navigation }) => ({header: null}),},
    // login: { screen: login , navigationOptions: ({ navigation }) => ({header: null}),},
    UDimage: { screen: UDimage , navigationOptions: ({ navigation }) => ({header: null}),},
    HomeScreen: { screen: HomeScreen , navigationOptions: ({ navigation }) => ({header: null}),},
    dashboard: { screen: dashboard , navigationOptions: ({ navigation }) => ({header: null}),},
    LoadingScreen: { screen: LoadingScreen , navigationOptions: ({ navigation }) => ({header: null}),},
    SideMenu: { screen: SideMenu , navigationOptions: ({ navigation }) => ({header: null}),},
    SideMenuList: { screen: SideMenuList , navigationOptions: ({ navigation }) => ({header: null}),}
});

const RoutesStack = createSwitchNavigator(
    {
        login: login,
        App: AppStack,
    },
    {
        initialRouteName: 'login',
        headerMode: "none",
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }

);

const Router = createAppContainer(RoutesStack);

export default Router;
