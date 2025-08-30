import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
  I18nManager,
} from "react-native";
import { ErrorsType } from "types";
 import { CommonActions } from '@react-navigation/native';
import { storageKey } from "@myapp/utils/constants";
import { useTranslation } from "react-i18next";
import localStorage from "@myapp/utils/localStorage";
import i18n from "@myapp/i18n/index";
import RNRestart from 'react-native-restart';


const LoginScreen = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ErrorsType>({});

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const isLoggedIn = await localStorage().getItem(storageKey.isLoggedIn);
      if(isLoggedIn){
      navigation.dispatch(
          CommonActions.reset({
            index: 0, 
            routes: [
              { name: 'HomeScreen' }, 
            ],
          })
        ); 
      }
    })()
  })

  const validate = () => {
    let valid = true;
    let tempErrors: ErrorsType = {};

    if (!email) {
      tempErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Enter a valid email";
      valid = false;
    }
    
    if (!password) {
      tempErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (validate()) {
      const user = await localStorage().getItem(storageKey.user);
      if(!user || user.email !== email || user.password !== password) {
        Alert.alert("Error", "Invalid email or password");
        return;
      }
      Alert.alert("Success", "Login Successful!");
      await localStorage().addItem(storageKey.isLoggedIn, 'true');
      navigation.dispatch(
        CommonActions.reset({
          index: 0, 
          routes: [
            { name: 'HomeScreen' }, 
          ],
        })
      ); 
    }
  };

  const toggleLanguage = async () => {
    if(i18n.language === 'ar') {
      await localStorage().addItem(storageKey.language, 'en');
      i18n.changeLanguage('en');
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
      RNRestart.Restart();
      return;
    }
    await localStorage().addItem(storageKey.language, 'ar');
    i18n.changeLanguage('ar');
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
    RNRestart.Restart();
  };


  const handleSignup = () => {
    navigation.navigate('Signupscreen' as never); // Adjust based on your navigator setup
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('login')}</Text>

      <TextInput
        style={[styles.input, {textAlign: I18nManager.isRTL ? 'right' : 'left',}]}
        placeholder={t('email')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        style={[styles.input, {textAlign: I18nManager.isRTL ? 'right' : 'left',}]}
        placeholder={t('password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{t('login')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>{t('no_account_signup')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
        <Text style={styles.signupText}>{t('toggle_language')}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 8,
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupButton: {
    marginTop: 20,
    alignItems: "center",
  },
  signupText: {
    color: "#007BFF",
    fontSize: 16,
  },
  languageButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    left: 'auto',
    backgroundColor: "#f0f0f0",
    padding: 10
  },
});
