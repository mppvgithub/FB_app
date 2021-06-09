import React from "react";
import { View, Text, Button, Dimensions } from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";
import SideMenuList from "./SideMenuList";
import login from "./login"
const WIDTH = Dimensions.get('window').width;
const LeftDrawer = createDrawerNavigator(
{
    login: { screen: login }
},
{
initialRouteName: "login",
drawerWidth:WIDTH*0.75,
drawerPosition:'left',
contentOptions: {
activeTintColor: "#335EFF"
},
contentComponent: props => <SideMenuList {...props} />,
drawerOpenRoute: 'LeftSideMenu',
drawerCloseRoute: 'LeftSideMenuClose',
drawerToggleRoute: 'LeftSideMenuToggle',
}
);
export default LeftDrawer;