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
import splash from './splash'
import mongo_curd from './mongo_curd'
import product_list from './product_list'
import product_edit from './product_edit'
import product_add from './product_add'


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
    login: { screen: login , navigationOptions: ({ navigation }) => ({header: null}),},
    UDimage: { screen: UDimage , navigationOptions: ({ navigation }) => ({header: null}),},
    HomeScreen: { screen: HomeScreen , navigationOptions: ({ navigation }) => ({header: null}),},
    dashboard: { screen: dashboard , navigationOptions: ({ navigation }) => ({header: null}),},
    LoadingScreen: { screen: LoadingScreen , navigationOptions: ({ navigation }) => ({header: null}),},
    SideMenu: { screen: SideMenu , navigationOptions: ({ navigation }) => ({header: null}),},
    SideMenuList: { screen: SideMenuList , navigationOptions: ({ navigation }) => ({header: null}),},
    mongo_curd:{screen: mongo_curd , navigationOptions: ({ navigation }) => ({header: null}),},
    product_list:{screen: product_list , navigationOptions: ({ navigation }) => ({header: null}),},
    product_edit:{ screen: product_edit , navigationOptions: ({ navigation }) => ({header: null}),},
    product_add: { screen: product_add , navigationOptions: ({ navigation }) => ({header: null}),},
});

const RoutesStack = createSwitchNavigator(
    {
        splash: splash,
        App: AppStack,
    },
    {
        initialRouteName: 'splash',
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
