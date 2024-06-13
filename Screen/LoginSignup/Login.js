import { Alert, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { HStack, NativeBaseProvider } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const updateInputval = (val, key) => {
    setValues({ ...values, [key]: val });
  };

  const loginSubmit = () => {
    if (!values.email || !values.password) {
      Alert.alert("Enter required fields.");
      return false;
    }
    auth().signInWithEmailAndPassword(values.email, values.password).then((res) => {
      setValues({ email: '', password: '' });
      navigation.navigate("Home");
    }).catch((error) => Alert.alert("Error", error.message));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.topText}>Welcome</Text>
        <View style={styles.detailCont}>
          <View style={styles.emailView}>
            <Text style={styles.textHead}>Email</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <MaterialCommunityIcons name="email" size={20} color="#A0BBA8" style={styles.icon} />
              <TextInput
                value={values.email}
                onChangeText={(val) => updateInputval(val, 'email')}
                style={styles.input}
                placeholder='Your Email'
                placeholderTextColor={'#A0BBA8'}
              />
            </View>
          </View>
          <View style={styles.emailView}>
            <Text style={styles.textHead}>Password</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Entypo name="lock" size={20} color="#A0BBA8" style={styles.icon} />
              <TextInput
                value={values.password}
                onChangeText={(val) => updateInputval(val, 'password')}
                style={styles.input}
                secureTextEntry={!showPassword}
                placeholder='Your Password'
                placeholderTextColor={'#A0BBA8'}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={{ position: 'absolute', right: 5, top: 10 }}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#A0BBA8" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={loginSubmit} style={{ width: '100%', backgroundColor: "#A0BBA8", marginTop: 50, borderRadius: 8 }}>
            <Text style={{ marginVertical: 8, alignSelf: "center", color: "#fff", fontSize: 18, fontWeight: '500' }}>SignIn</Text>
          </TouchableOpacity>
          <HStack alignSelf='center' mt='10'>
            <Text style={{ color: "#A0BBA8", fontSize: 18, fontWeight: '300' }}>Don't have an Account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={{ color: "#A0BBA8", fontSize: 18, fontWeight: '800' }}>SignUp</Text>
            </TouchableOpacity>
          </HStack>
        </View>
      </View>
    </NativeBaseProvider>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A0BBA8',
  },
  topText: {
    fontSize: 25,
    color: '#fff',
    marginTop: '30%',
    marginLeft: 20,
    fontWeight: '400'
  },
  detailCont: {
    marginTop: 35,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: Dimensions.get('window').height
  },
  emailView: {
    marginTop: 10
  },
  textHead: {
    fontSize: 16,
    fontWeight: "800",
    color: "#A0BBA8",
    marginTop: 10
  },
  input: {
    height: 40,
    borderBottomWidth: .3,
    paddingHorizontal: 25,
    borderColor: '#A0BBA8',
    width: '100%',
    color:'#808080'
  },
  icon: {
    alignSelf: 'center',
    position: 'absolute',
    top: 10
  }
});
