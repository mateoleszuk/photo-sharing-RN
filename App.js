import react, { useState } from "react";
import { Text, View, StyleSheet, Image, Button, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import * as sharing from 'expo-sharing'
import uploadToAnonymousFilesAsync from 'anonymous-files'

const App = () => {

  const [selectedImage, setSelectedImage] = useState(null)

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('permision to access camera is required');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()

    if (pickerResult.cancelled === true) {
      return;
    }
    if(Platform.OS === 'web'){
      const remoteUri = await uploadToAnonymousFilesAsync (pickerResult.uri)
    } else {
      setSelectedImage({ localuri: pickerResult.uri })
    }

  };

  const openShareDialog = async () => {
    if (!(await sharing.isAvailableAsync())) {
      alert ('sharing, is not abiable in your platform');
      return;
    }
    await sharing.shareAsync(selectedImage.localuri);
  }
  ////////////////////////////////////////////////
  return (
    <View style={styles.container}>
      <Text style={texts.title}>pasa pack</Text>
      <TouchableOpacity onPress={openImagePickerAsync}>
        <Image
          style={styles.pic} source={{
            uri:
              selectedImage !== null
                ? selectedImage.localuri : 'https://artbreeder.b-cdn.net/imgs/e2aad9136b47d5d4fb4c6b6e4bae.jpeg'
          }} />
      </TouchableOpacity>
      {selectedImage ?(
        <TouchableOpacity
        onPress={openShareDialog} style={styles.send}>
        <Text style={texts.text}>Send</Text>
      </TouchableOpacity>
      ) :
      (<View />)}
      
      <Button
      borderRadius= '4'
        color='green'
        onPress={() => alert('mandado')}
        title='press me'
      />
    </View>)
}
//////////////////////////////////////////////////////////////////
const texts = StyleSheet.create({
  title: { fontSize: 30, color: '#fff' },
  text: {
    fontSize: 18, color: '#fff'
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#292929",
    resizeMode: 'contain'
  },
  pic: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom:50
  },
  send: {
    height: 30,
    width: 82,
    alignItems: "center",
    backgroundColor: '#6495ED',
    borderRadius: 2,
    paddiingTop: 10,
    marginBottom:5
  }
})

export default App;