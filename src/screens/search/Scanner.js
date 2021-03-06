import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import TextLoadingButton from '../../components/TextLoadingButton';
import { StyleConstants, Styles, Colors } from '../../style';

export default function Scanner({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        navigation.addListener('focus', () =>  setScanned(false));
    }, [navigation]);

    const [code, setCode] = useState();

    useEffect(() => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log(`Barcode type: ${type}`);
        navigation.navigate('FoodPage', { upc: data });
    };

    if (hasPermission === null) {
        return (
            <View style={Colors.Background}/>   
        )
    }
    if (hasPermission === false) {
        return (
            <View style={[Styles.container, {justifyContent: 'center'}]}>
                <View style={{width: StyleConstants.FormWidth}}>
                    <Text style={Styles.labelText, {marginTop: StyleConstants.FormItemTextSize, textAlign: "center"}}>
                        AllergenAlert needs permission to access the camera before you can use scanner
                    </Text>
                    <TextLoadingButton style={{ marginTop: StyleConstants.FormItemTextSize }} text='Back to Search'/>
                </View>
            </View>  
        )
    }

    return (
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end',}}>
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
        />
        </View>
    );
}