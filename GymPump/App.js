import React, { useEffect, useRef, useState } from 'react';
import { View, StatusBar, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';


import TimeScreen from './screens/Time';
import Note from './screens/Note';
import Home from './screens/Home';
import Login from './screens/Login'; // Importe a tela de login
import Profile from './screens/Profile';
import Register from './screens/Register';


import {AuthProvider, useAuth} from './context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ForgotPassword from './screens/ForgotPassword';
import Newpassword from './screens/Newpassword';
import TutorialUser from './screens/TutorialUser';
import Feed from './screens/Feed';

import 'text-encoding';




const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const screenOptions = {
  headerShown: false,
};

const screenOptions1 = {
  tabBarShowLabel: false,
  headerShow: false,
  tabBarStyle: {
    elevation: 1,
    height: 60,
    backgroundColor: "#18192d",
    borderTopWidth: 0
  }
};


const MainTabs = () => {
  return(
    <Tab.Navigator screenOptions={screenOptions1}>

    <Tab.Screen
      name="Feed"
      component={Feed}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ width: 50, height: 50, padding: 10, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: focused ? '#31346c' : '#18192d', position: 'absolute',
            bottom: focused ? 20 : 0 }}>
            <Ionicons name="albums-outline" size={24} color="white" />
          </View>
        ),
        headerShown: false
      }}
    />


    <Tab.Screen
      name="TimeScreen"
      component={TimeScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ width: 50, height: 50, padding: 10, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: focused ? '#31346c' : '#18192d', position: 'absolute',
            bottom: focused ? 20 : 0 }}>
            <Ionicons name="timer" size={24} color="white" />
          </View>
        ),
        headerShown: false
      }}
    />

    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ width: 50, height: 50, padding: 10, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: focused ? '#31346c' : '#18192d', position: 'absolute',
            bottom: focused ? 20 : 0 }}>
            <Entypo name="home" size={24} color={"white"} />
          </View>
        ),
        headerShown: false
      }}
    />

    <Tab.Screen
      name="Note"
      component={Note}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ width: 50, height: 50, padding: 10, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: focused ? '#31346c' : '#18192d', position: 'absolute',
            bottom: focused ? 20 : 0 }}>
            <FontAwesome name="sticky-note" size={24} color="white" />
          </View>
        ),
        headerShown: false
      }}
    />

  <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ width: 50, height: 50, padding: 10, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: focused ? '#31346c' : '#18192d', position: 'absolute',
            bottom: focused ? 20 : 0 }}>
            <Icon name='person' color='white' size={24}/>
          </View>
        ),
        headerShown: false
      }}
    />
  </Tab.Navigator>
  )
};

const App = () => {

  return(
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <StatusBar
            backgroundColor="#0c0d17"
            barStyle="light-content"
            translucent={false}
          />
          <Stack.Navigator screenOptions={screenOptions} initialRouteName='Login'>
            <Stack.Screen name="MainTabs" component={MainTabs}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword}/>
            <Stack.Screen name='NewPassword' component={Newpassword}/>
            <Stack.Screen name='TutorialUser' component={TutorialUser}/>
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </AuthProvider>
  )
}

export default App;
