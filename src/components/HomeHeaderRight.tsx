import { storageKey } from '@myapp/utils/constants';
import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import localStorage from '@myapp/utils/localStorage';

const HomeHeaderRight = () => {
    const navigation = useNavigation();
    const onPressProfile = () => {
        navigation.navigate('ProfileScreen' as never);
    };

    const onPressLogout = () => {
        localStorage().addItem(storageKey.isLoggedIn, 'false');
         navigation.dispatch(
            CommonActions.reset({
                index: 0, 
                routes: [
                { name: 'Login' }, 
                ],
            })
        ); 
    };
    return <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity activeOpacity={0.6} onPress={onPressProfile}><Text>Profile</Text></TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={onPressLogout}><Text>Logout</Text></TouchableOpacity>
    </View>
}

export default HomeHeaderRight;