import * as React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Home } from './Home';
import { Search } from './Search';
import { Workout } from './Workout';
import { Profile } from './Profile';

const Tab = createBottomTabNavigator();



export function Authenticated({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#dedede'
        },
        headerTitleStyle: {
          fontSize: 28,
          fontFamily: 'AbrilFatface_400Regular'
        },
        title: 'Fit Friends',
        tabBarActiveTintColor: '#3d85cc',
        tabBarShowLabel: false
      }}
    >
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: ({color, size }) => {
          return <Ionicons name="home" size={35} color={color}/>
        }}}/>
      <Tab.Screen name="Search" component={Search} options={{
        tabBarIcon: ({color, size }) => {
          return <Ionicons name="search" size={35} color={color}/>
        }}}/>
      <Tab.Screen name="Workout" component={Workout} options={{
        headerShown: false,
        tabBarIcon: ({color, size }) => {
          return <FontAwesome5 name="dumbbell" size={32} color={color}/>
        }}}/>
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon: ({color, size }) => {
          return <EvilIcons name="user" size={50} color={color}/>
        }}}/>
    </Tab.Navigator>
  );
}