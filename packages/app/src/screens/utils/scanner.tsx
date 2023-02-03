import React, { useState, useEffect, useCallback, FC } from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ScanProps } from '../../router/types';
import { useAddWorklet } from '../../features/worklets';

const UtilsScannerScreen: FC<ScanProps> = ({ navigation }) => {
  const addWorklet = useAddWorklet();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  const download = useCallback(
    async (url: string) => {
      try {
        const { data } = await axios.get(url);
        addWorklet(data);
        navigation.replace('WorkletDetails', {
          worklet: data,
        });
      } catch (err) {
        console.error(err);
      }
    },
    [addWorklet, navigation],
  );

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      const granted = status === 'granted';
      setHasPermission(granted);
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }: any) => {
    setScanned(true);
    download(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { UtilsScannerScreen };
