import React, { Component } from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import FB_file_iamge from './Screens/FB_file_iamge';
import SecondPage from './Screens/SecondPage';
import home from './Screens/home';
import register from './Screens/register';
import login from './Screens/login';
import UDimage from './Screens/UDimage';

import HomeScreen from './Screens/HomeScreen';

const App = createStackNavigator({
  FB_file_iamge: { screen: FB_file_iamge },
  SecondPage: { screen: SecondPage },
  // home: { screen: home },
  register: { screen: register },
  login: { screen: login },
  UDimage:{screen:UDimage},
  HomeScreen:{screen:HomeScreen}
},
  {
    initialRouteName: 'FB_file_iamge',
  }
);
export default createAppContainer(App);