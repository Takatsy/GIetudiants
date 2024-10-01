import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    if (scannedData !== data) {
      setScannedData(data);
      Alert.alert('Code scanné', data, [{ text: 'OK', onPress: () => setScannedData(null) }]);
    }
  };

  if (hasPermission === null) {
    return <Text>Demande de permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Accès à la caméra refusé</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={scannedData ? undefined : handleBarCodeScanned}
        style={styles.scanner}
      />
      {scannedData && (
        <View style={styles.dataContainer}>
          <Text style={styles.scannedText}>Code scanné : {scannedData}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanner: {
    flex: 1,
    width: '100%',
  },
  dataContainer: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  scannedText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
