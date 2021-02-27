import React, { Component } from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import FirstPage from './Screens/FirstPage';
import SecondPage from './Screens/SecondPage';
import home from './Screens/home';
import register from './Screens/register';
import login from './Screens/login';

const App = createStackNavigator({
  FirstPage: { screen: FirstPage },
  SecondPage: { screen: SecondPage },
  home: { screen: home },
  register: { screen: register },
  login: { screen: login },
},
  {
    initialRouteName: 'FirstPage',
  }
);
export default createAppContainer(App);