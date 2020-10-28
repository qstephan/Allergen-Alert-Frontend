import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './src/context';

// import Food from './src/screens/Food'; 
import LandingPage from './src/screens/LandingPage';
import Settings from './src/screens/Settings'
import ViewDiet from './src/screens/ViewDiet'
import Login from './src/screens/auth/Login';
import { Colors, StyleConstants } from './src/style';
import CreateAccount from './src/screens/auth/CreateAccount';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            {/* <HomeStack.Screen name="FoodPage" component={Food} /> */}
            <HomeStack.Screen name="LandingPage" component={LandingPage} options={{ title: "Home" }}/>
            <HomeStack.Screen name="Settings" component={Settings} options={{ title: "Settings" }}/>
            <HomeStack.Screen name="ViewDiet" component={ViewDiet} options={{ title: "My Diet" }}/>
        </HomeStack.Navigator>
    );
}

const AuthStack = createStackNavigator();
function AuthStackScreen() {
    return (
        <AuthStack.Navigator screenOptions={{ headerStyle: navStyle.header, headerTintColor: Colors.Foreground }}>
            <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <AuthStack.Screen name="CreateAccount" component={CreateAccount}/>
        </AuthStack.Navigator>
    )
}

export default function App() {
    const [authToken, setAuthToken] = useState('abc');

    const authContext = {
        token: authToken,
        logIn(token) {
            console.log(token);
            setAuthToken(token);
        },
        logOut() {
            setAuthToken(null);
        },
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {
                    authToken
                        ? <HomeStackScreen/>
                        : <AuthStackScreen/>
                }
            </NavigationContainer>
        </AuthContext.Provider>
    );
}

const navStyle = StyleSheet.create({
    header: {
        backgroundColor: Colors.BackgroundBlur,
    }
});