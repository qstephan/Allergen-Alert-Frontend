import React, { useRef, useContext, useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import { useAddModification } from '../hooks/api';
import { ListItem, Icon } from 'react-native-elements'
import FormTextInput from '../components/FormTextInput';



export default function TypeRestriction({navigation}) {

    const [ingredient, setIngredient] = useState();
    const [type, setType] = useState();
    const addModification = useAddModification(ingredient, type);
    const initialRender = useRef(true);

    useEffect(() => {
        if(initialRender.current) {
            initialRender.current = false;
        } else {
            addModification.execute()
            .then(() => navigation.pop())
            .catch(e => {});

            // mimicking behavior of initial render if there is an error on 
            // submission
            initialRender.current = true;
            setType(2);
        }

    }, [type]);

    function onAddException() {
        setType(0);
    }

    function onAddRestriction() {
        setType(1);
    }

    return (

        <View style={[Styles.container, {justifyContent: 'flex-start', paddingTop:40}]}>
            <View style={{width: StyleConstants.FormWidth}}>
                <FormTextInput placeholder="Ingredient" onChangeText={setIngredient}/>
                <View style={{flexDirection: "row", justifyContent: "space-between",paddingTop: 20}}>
                    <TextLoadingButton style={[Styles.button, {width: "47%"}]} text="Add Exception" isLoading={addModification.loading} onPress={onAddException} />
                    <TextLoadingButton style={[Styles.button, {width: "47%"}]} text="Add Restriction" isLoading={addModification.loading} onPress={onAddRestriction} />
                </View>
                <Text style={[Styles.errorText, {alignSelf: 'center'}]}>{addModification.error}</Text>
            </View>
        </View>
    );
}