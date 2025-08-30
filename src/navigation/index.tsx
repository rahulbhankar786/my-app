import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@myapp/features/home/HomeScreen';
import LoginScreen from '@myapp/features/auth/Login';
import Signup from '@myapp/features/auth/Signup';
import Profile from '@myapp/features/auth/Profile';
import Details from '@myapp/features/home/Details';
import HomeHeaderRight from '@myapp/components/HomeHeaderRight';

const RootStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: LoginScreen,
      options: {
        title: 'Login',
        headerShown: false,
      },
    },
    Signupscreen: {
        screen: Signup,
        options: {
          headerShown: false,
        },
    },
    HomeScreen: {
      screen: HomeScreen,
      options: {
        title: 'Home',
        headerShown: true,
        headerRight: HomeHeaderRight,
        headerBackVisible: false
      },
    },
    ProfileScreen: {
      screen: Profile,
      options: {
        title: 'Profile',
        headerShown: true,
      },
    },
    DetailsScreen: {
      screen: Details,
      options: {
        title: 'Details',
        headerShown: true,
      },
    }
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
