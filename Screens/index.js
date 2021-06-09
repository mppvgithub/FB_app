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
import dashboard from './dashboard';
import SideMenuList from './SideMenuList'
import SideMenu from './SideMenu'


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
    home: { screen: home },
    register: { screen: register },
    // login: { screen: login },
    UDimage: { screen: UDimage },
    HomeScreen: { screen: HomeScreen },
    dashboard:{screen: dashboard},
    LoadingScreen:{ screen: LoadingScreen},
    SideMenu:{ screen: SideMenu},
    SideMenuList:{ screen: SideMenuList}
});

const RoutesStack = createSwitchNavigator(
    {
        login: login,
        App: AppStack
    },
    { initialRouteName: 'login' },
    {
        headerMode: 'none',
        navigationOptions: {
          headerVisible: false,
        }
       }

    // < NavigationContainer >
    // <Drawer.Navigator initialRouteName="Home">
    //     <Drawer.Screen name="Home" component={HomeScreen} />
    //     <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    // </Drawer.Navigator>
    // </NavigationContainer >
);

const Router = createAppContainer(RoutesStack);

export default Router;
