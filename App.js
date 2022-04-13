import { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ActiveScreen from './screens/ActiveScreen';
import HistoricScreen from './screens/HistoricScreen';
import ProfileScreen from './screens/ProfileScreen';
import ConfigScreen from './screens/ConfigScreen';
import MeetingScreen from './screens/MeetingScreen';
import { Colors } from './constants/colors';
import AuthContextProvider from './store/auth-context';
import { AuthContext } from './store/auth-context';
import IconButton from './components/ui/IconButton';
import MeetingsContextProvider from './store/meeting-context';
import HistoricContextProvider from './store/historic-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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

function AuthenticatedDrawer() {
    return (
        <Drawer.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: Colors.primary800,
                },
                headerTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: Colors.primary800,
                },
                tabBarActiveTintColor: 'white',
            })}
        >
            <Drawer.Screen
                name='Meetings'
                component={Landing}
                options={({ navigation }) => ({
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
                                navigation.navigate('Meeting');
                            }}
                        />
                    ),
                })}
            />
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name='Config' component={ConfigScreen} />
        </Drawer.Navigator>
    );
}
function AuthenticatedStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='AuthenticatedDrawer'
                component={AuthenticatedDrawer}
                options={{ headerShown: false }}
            />
            <Stack.Screen name='Meeting' component={MeetingScreen} />
        </Stack.Navigator>
    );
}

function Landing() {
    return (
        <BottomTabs.Navigator
            initialRouteName='ActiveMeetings'
            screenOptions={{ headerShown: false }}
        >
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
        </BottomTabs.Navigator>
    );
}

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
                    <HistoricContextProvider>
                        <Navigation />
                    </HistoricContextProvider>
                </MeetingsContextProvider>
            </AuthContextProvider>
        </>
    );
}
