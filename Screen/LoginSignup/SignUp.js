import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { HStack, NativeBaseProvider } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

const SignUp = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({ name: '', email: '', password: '' });

  const updateInputval = (val, key) => {
    setValues({ ...values, [key]: val });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const singupSubmit = () => {
    if (!values.email || !values.password || !values.name) {
      Alert.alert("Enter all required fields.");
      return false;
    }

    auth().createUserWithEmailAndPassword(values.email, values.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: values.name,
        });
        console.log("User created successfully!");
        setValues({ name: '', email: '', password: '' });
        navigation.navigate("Home");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.topText}>Register Now!</Text>
        <View style={styles.detailCont}>
          <View style={styles.emailView}>
            <Text style={styles.textHead}>Name</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Ionicons name="person-circle" size={20} color="#A0BBA8" style={styles.icon} />
              <TextInput
                value={values.name}
                onChangeText={(val) => updateInputval(val, 'name')}
                style={styles.input}
                placeholder='Your Name'
                placeholderTextColor={'#A0BBA8'}
              />
            </View>
          </View>

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

          <TouchableOpacity onPress={singupSubmit} style={{ width: '100%', backgroundColor: "#A0BBA8", marginTop: 50, borderRadius: 8 }}>
            <Text style={{ marginVertical: 8, alignSelf: "center", color: "#fff", fontSize: 18, fontWeight: '500' }}>SignUp</Text>
          </TouchableOpacity>

          <HStack alignSelf='center' mt='10'>
            <Text style={{ color: "#A0BBA8", fontSize: 18, fontWeight: '300' }}>Already have an Account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ color: "#A0BBA8", fontSize: 18, fontWeight: '800' }}>Login</Text>
            </TouchableOpacity>
          </HStack>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default SignUp;

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
    fontWeight: '400',
  },
  detailCont: {
    marginTop: 35,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: Dimensions.get('window').height,
  },
  emailView: {
    marginTop: 10,
  },
  textHead: {
    fontSize: 16,
    fontWeight: "800",
    color: "#A0BBA8",
    marginTop: 10,
  },
  input: {
    height: 40,
    borderBottomWidth: 0.3,
    paddingHorizontal: 25,
    borderColor: '#A0BBA8',
    width: '100%',
    color:'#808080'
  },
  icon: {
    alignSelf: 'center',
    position: 'absolute',
    top: 10,
  },
});
