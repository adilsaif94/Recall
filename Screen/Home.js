import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Platform, TouchableOpacity, Text, Alert, FlatList, ActivityIndicator, PermissionsAndroid } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';


const Home = ({ navigation }) => {
  const [media, setMedia] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const logout = () => {
    auth().signOut().then(() => {
      navigation.navigate("Login");
    }).catch(error => {
      Alert.alert("Error", error.message);
    });
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "App needs camera permission",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission granted");
        return true;
      } else {
        console.log("Camera permission denied");
        return false;
      }
    } catch (err) {
      console.warn("Camera permission error:", err);
      return false;
    }
  };

  const requestStoragePermission = async () => {
    try {
      const writeGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "App needs storage permission",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );

      const readGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Read Storage Permission",
          message: "App needs read storage permission",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );

      if (writeGranted === PermissionsAndroid.RESULTS.GRANTED && readGranted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Storage permissions granted");
        return true;
      } else {
        console.log("Storage permissions denied");
        return false;
      }
    } catch (err) {
      console.error("Storage permission error:", err);
      return false;
    }
  };

  const handleCaptureMedia = async () => {
    const cameraPermission = await requestCameraPermission();
    // const storagePermission = await requestStoragePermission();

    // if (!cameraPermission || !storagePermission) {
    //   Alert.alert('Permission Error', 'Camera and Storage permissions are required.');
    //   return;
    // }

    const options = {
      mediaType: 'mixed', 
      quality: 1,
      videoQuality: 'high', 
      durationLimit: 60, 
      saveToPhotos: true, 
    };

    
    Alert.alert(
      'Select Media',
      'Choose from where you want to capture media:',
      [
        {
          text: 'Camera',
          onPress: () => launchCamera(options, handleMediaSelection),
        },
        {
          text: 'Gallery',
          onPress: () => launchImageLibrary(options, handleMediaSelection),
        },
      ],
      { cancelable: true }
    );
  };

  const handleMediaSelection = async (response) => {
    if (response.didCancel) {
      console.log('User cancelled media selection');
    } else if (response.errorCode) {
      console.log('Media Selection Error: ', response.errorMessage);
    } else {
      const capturedMedia = response.assets[0];
      setLoading(true);
      const uploadedMedia = await uploadMedia(capturedMedia);
      setLoading(false);
      if (uploadedMedia) {
        setMedia(capturedMedia);
        fetchUploadedFiles(); 
      }
    }
  };

  const uploadMedia = async (media) => {
    const data = new FormData();
    data.append('file', {
      name: media.fileName || 'media',
      type: media.type,
      uri: Platform.OS === 'ios' ? media.uri.replace('file://', '') : media.uri,
    });

    try {
      const response = await axios.post('http://454544.45.45:3000/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload Success', response.data);
      return response.data;
    } catch (error) {
      console.log('Upload Error', error);
      Alert.alert("Upload Error", error.message);
      return null;
    }
  };

  const fetchUploadedFiles = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://454544.45.45:3000/uploadedFiles');
      console.log('Fetch Uploaded Files Response:', response.data);

      
      const filesWithTypes = response.data.map(file => ({
        uri: file.uri,
        type: file.type || 'image/jpeg', 
        id: file.id, 
      }));

      setUploadedFiles(filesWithTypes);
    } catch (error) {
      console.log('Fetch Uploaded Files Error:', error);
      Alert.alert("Error", "Failed to fetch uploaded files");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://454544.45.45:3000/delete/${id}`);
      fetchUploadedFiles(); 
    } catch (error) {
      console.log('Delete Error:', error);
      Alert.alert("Error", "Failed to delete the file");
    } finally {
      setLoading(false);
    }
  };

  const renderMediaItem = ({ item }) => (
    <View style={styles.mediaItem}>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
        <AntDesign name='delete' size={13} style={styles.deleteButtonText} />
      </TouchableOpacity>
      {item.type && item.uri ? (
        item.type.startsWith('image') ? (
          <Image source={{ uri: item.uri }} style={styles.media} />
        ) : item.type.startsWith('video') ? (
          <Video source={{ uri: item.uri }} style={styles.media} controls={true} />
        ) : (
          <Text>Unsupported media type</Text>
        )
      ) : (
        <Text>Invalid media item</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleCaptureMedia} style={styles.buttonContainer}>
        <Feather name='upload-cloud' size={45} style={styles.uploadIcon} />
        <Text style={styles.captureText}>Capture Media</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <FlatList
        data={uploadedFiles}
        renderItem={renderMediaItem}
        keyExtractor={(item) => item.uri}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  header: {
    alignItems: 'flex-end',
  },
  logoutButton: {
    backgroundColor: '#9A1D07',
    marginTop: 10,
    borderRadius: 8,
  },
  logoutText: {
    padding: 8,
    fontSize: 15,
    color: '#fff'
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#9A1D07',
    alignItems:'center',
    paddingVertical:10,
  },
  mediaItem: {
    marginBottom: 20,
    position: 'relative',
  },
  flatList: {
    marginTop: 15,
   
  },
  media: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 5,
    zIndex: 1,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  uploadIcon:{
    color:'#9A1D07',
    paddingVertical:5
  },
  captureText:{
    color:'#808080',
    fontWeight:'800',
    paddingVertical:5
  }
});

export default Home;
