import * as React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './screens/main';
import New from './screens/new';
import Agency from './screens/agency';
import Search from './screens/search';
import Buttom from './view/Buttom';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Agency: Agency,
  New: New,
  Search: Search,
});

const Footer = createStackNavigator({
  Home: HomeScreen,
  Agency: Agency,
});


export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: HomeStack,
      Footer: Footer,
    },
    {
      tabBarComponent: props => <Buttom {...props} />,
      drawerWidth: Dimensions.get('window').width - 180,
      edgeWidth: 50
    }
  )
);
