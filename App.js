import { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './src/components/ui/IconButton';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
// after other import statements
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';

import { withAuthenticator } from 'aws-amplify-react-native';

import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ActiveScreen from './src/screens/ActiveScreen';
import HistoricScreen from './src/screens/HistoricScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ConfigScreen from './src/screens/ConfigScreen';
import ConfigUsersScreen from './src/screens/ConfigUsersScreen';
import ConfigGroupsScreen from './src/screens/ConfigGroupsScreen';
import ConfigMeetingsScreen from './src/screens/ConfigMeetingsScreen';
import MeetingScreen from './src/screens/MeetingScreen';
import GroupScreen from './src/screens/GroupScreen';
import { Colors } from './src/constants/colors';
import AuthContextProvider from './src/store/auth-context';
import { AuthContext } from './src/store/auth-context';
import MeetingsContextProvider from './src/store/meeting-context';
import GroupsContextProvider from './src/store/groups-context';
import MeeterContextProvider from './src/store/meeter-context';

Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true,
    },
});

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
    const authCtx = useContext(AuthContext);
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
                                navigation.navigate('Meeting', {
                                    meetingId: '0',
                                });
                            }}
                        />
                    ),
                })}
            />
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Drawer.Screen
                name='Configurations'
                component={ConfigBottom}
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
                                navigation.navigate('Config', {
                                    meetingId: '0',
                                });
                            }}
                        />
                    ),
                })}
            />
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
            <Stack.Screen
                name='Meeting'
                component={MeetingScreen}
                options={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: Colors.primary800,
                    },
                    headerTintColor: 'white',
                })}
            />
            <Stack.Screen
                name='Group'
                component={GroupScreen}
                options={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: Colors.primary800,
                    },
                    headerTintColor: 'white',
                })}
            />
            <Stack.Screen
                name='Config'
                component={ConfigScreen}
                options={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: Colors.primary800,
                    },
                    headerTintColor: 'white',
                })}
            />
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
function ConfigBottom() {
    return (
        <BottomTabs.Navigator
            initialRouteName='ConfigUsers'
            screenOptions={{ headerShown: false }}
        >
            <BottomTabs.Screen
                name='ConfigGroups'
                component={ConfigGroupsScreen}
                options={{
                    title: 'Default Groups',
                    tabBarLabel: 'Groups',
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
                name='ConfigUsers'
                component={ConfigUsersScreen}
                options={{
                    title: 'Users',
                    tabBarLabel: 'Users',
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
                name='ConfigMeetings'
                component={ConfigMeetingsScreen}
                options={{
                    title: 'ConfigMeetings',
                    tabBarLabel: 'Meetings',
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
            <AuthenticatedStack />
        </NavigationContainer>
    );
}

function App() {
    return (
        <>
            <StatusBar style='light' />

            <MeeterContextProvider>
                <MeetingsContextProvider>
                    <GroupsContextProvider>
                        <Navigation />
                    </GroupsContextProvider>
                </MeetingsContextProvider>
            </MeeterContextProvider>
        </>
    );
}

export default withAuthenticator(App);
