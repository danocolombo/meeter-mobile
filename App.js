import { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ActiveScreen from './screens/ActiveScreen';
import HistoricScreen from './screens/HistoricScreen';
import ProfileSceen from './screens/ProfileScreen';
import ConfigScreen from './screens/ConfigScreen';
import { Colors } from './constants/colors';
import AuthContextProvider from './store/auth-context';
import { AuthContext } from './store/auth-context';
import IconButton from './components/ui/IconButton';
import MeetingsContextProvider from './store/meeting-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary800 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Signup' component={SignupScreen} />
        </Stack.Navigator>
    );
}
function AuthenticatedStack() {
    return (
        <BottomTabs.Navigator
            initialRouteName='ActiveMeetings'
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: Colors.primary800,
                },
                headerTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: Colors.primary800,
                },
                tabBarActiveTintColor: 'white',
                headerRight: ({ tintColor }) => (
                    <IconButton
                        icon='add'
                        size={24}
                        color={tintColor}
                        onPress={() => {
                            navigation.navigate('ManageMeeting');
                        }}
                    />
                ),
            })}
        >
            <BottomTabs.Screen
                name='Profile'
                component={ProfileSceen}
                options={{
                    title: 'Profile',
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='person' size={size} color={color} />
                    ),
                }}
            />

            <BottomTabs.Screen
                name='HistoricMeetings'
                component={HistoricScreen}
                options={{
                    title: 'Historic Meetings',
                    tabBarLabel: 'History',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name='md-caret-back-circle-sharp'
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <BottomTabs.Screen
                name='ActiveMeetings'
                component={ActiveScreen}
                options={{
                    title: 'Meeter',
                    tabBarLabel: 'Active',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name='md-caret-forward-circle-sharp'
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <BottomTabs.Screen
                name='Configs'
                component={ConfigScreen}
                options={{
                    title: 'Configurations',
                    tabBarLabel: 'Configs',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name='settings-sharp'
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </BottomTabs.Navigator>
    );
}
// function AuthenticatedStack2() {
//     const authCtx = useContext(AuthContext);
//     return (
//         <Stack.Navigator
//             screenOptions={{
//                 headerStyle: { backgroundColor: Colors.primary800 },
//                 headerTintColor: 'white',
//                 contentStyle: { backgroundColor: Colors.primary100 },
//             }}
//         >
//             <Stack.Screen
//                 name='Meeter'
//                 component={WelcomeScreen}
//                 options={{
//                     headerRight: ({ tintColor }) => (
//                         <IconButton
//                             icon='exit'
//                             color={tintColor}
//                             size={24}
//                             onPress={authCtx.logout}
//                         />
//                     ),
//                 }}
//             />
//         </Stack.Navigator>
//     );
// }

function Navigation() {
    const authCtx = useContext(AuthContext);
    return (
        <NavigationContainer>
            {!authCtx.isAuthenticated && <AuthStack />}
            {authCtx.isAuthenticated && <AuthenticatedStack />}
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <>
            <StatusBar style='light' />
            <AuthContextProvider>
                <MeetingsContextProvider>
                    <Navigation />
                </MeetingsContextProvider>
            </AuthContextProvider>
        </>
    );
}
