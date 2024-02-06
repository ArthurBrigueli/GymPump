import { StyleSheet, Text, View } from 'react-native';
import TimeScreen from './screens/Time';
import { StatusBar } from 'expo-status-bar';
import Note from './screens/Note';
import Home from './screens/Home';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';




const Tab = createBottomTabNavigator()
const screenOptions = {
  tabBarShowLabel: false,
  headerShow: false,
  tabBarStyle: {
    elevation: 1,
    height: 60,
    backgroundColor: "#18192d",
    borderTopWidth: 0
  }
}

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
          {/*<StatusBar
            backgroundColor="#0c0d17"
            barStyle="light-content"
            translucent={false}
          /> */}
          <Tab.Navigator screenOptions={screenOptions} initialRouteName='Home'>
            <Tab.Screen 
              name="TimeScreen" 
              component={TimeScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({focused})=>{
                  return(
                    <View style={{width: 50, height: 50, padding:10 ,borderRadius: 100,alignItems: 'center', justifyContent: 'center', backgroundColor:focused ? '#31346c':'#18192d', position: 'absolute',
                    bottom: focused ? 20 : 0}}>
                      <Ionicons name="timer" size={24} color="white" />
                    </View>
                  )
                }
              }}
            />

            <Tab.Screen 
              name="Home" 
              component={Home}
              options={{
                headerShown: false,
                tabBarIcon: ({focused})=>{
                  return(
                    <View style={{width: 50, height: 50,padding:10 ,borderRadius: 100,alignItems: 'center', justifyContent: 'center', backgroundColor:focused ? '#31346c':'#18192d', position: 'absolute',
                    bottom: focused ? 20 : 0}}>
                      <Entypo name="home" size={24} color={"white"} />
                    </View>
                  )
                }
              }}
            />
            


            <Tab.Screen 
              name="Note" 
              component={Note}
              options={{
                headerShown: false,
                tabBarIcon: ({focused})=>{
                  return(
                    <View style={{width: 50, height: 50 ,borderRadius: 100,alignItems: 'center', justifyContent: 'center', backgroundColor:focused ? '#31346c':'#18192d'}}>
                      <FontAwesome name="sticky-note" size={24} color="white" />
                    </View>
                  )
                }
              }}
            />
          </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

