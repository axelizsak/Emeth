import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { beginKyc } from '../DeployImg';

const id = 1; // ID hardcodée pour le KYC

const copyImageToPermanentLocation = async (uri) => {
  const destinationPath = `../images/${id}.jpg`;

  try {
    await FileSystem.copyAsync({ from: uri, to: destinationPath });
    console.log('Image copied to permanent location:', destinationPath);
    return destinationPath;
  } catch (error) {
    console.error('Error copying image:', error);
    return null;
  }
};

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [isImagePicked, setIsImagePicked] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [imagePath, setImagePath] = useState(null); // Nouvelle variable imagePath pour stocker le chemin d'accès vers la photo

  useEffect(() => {
    if (image) {
      setIsImagePicked(true);
    } else {
      setIsImagePicked(false);
    }
  }, [image]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      const imagePath = await copyImageToPermanentLocation(result.uri);
      setImagePath(imagePath);
      setImage(result.uri);
    }
  };
  
  const pickAnotherImage = () => {
    setImagePath(null); // Réinitialiser la variable imagePath à null
    setImage(null);
    pickImage();
  };

  const beginKycProcedure = () => {
    console.log('Starting KYC procedure...');
    console.log('Image Path: ' + imagePath);
    Alert.alert(
      'Is that your final word?',
      'This action cannot be undone.',
      [
        {
          text: 'No',
          onPress: handleCancelKyc,
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => beginKyc(imagePath, id), // Passer le chemin d'accès vers la photo (imagePath) et l'ID hardcodée (1)
        },
      ]
    );
  };

  const handleBeginKyc = () => {
    setShowConfirmation(true);
  };

  const handleCancelKyc = () => {
    setShowConfirmation(false);
    setImage(null); // Réinitialiser l'image à null
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isImagePicked ? (
        <>
          <Button title="Pick another image from camera roll" onPress={pickAnotherImage} />
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          {showConfirmation ? (
            <>
              <Text style={{ marginBottom: 10 }}>Is that your final word?</Text>
              <View style={{ flexDirection: 'row' }}>
                <Button title="Yes" onPress={beginKycProcedure} />
                <Button title="No" onPress={handleCancelKyc} />
              </View>
            </>
          ) : (
            <Button title="Begin KYC procedure" onPress={handleBeginKyc} />
          )}
        </>
      ) : (
        <Button title="Pick an image from camera roll" onPress={pickImage} />
      )}
    </View>
  );
}
