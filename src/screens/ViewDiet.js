import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, View, Text, Pressable, StyleSheet} from 'react-native';
import LoadingButton from '../components/LoadingButton';
import TextLoadingButton from '../components/TextLoadingButton';
import { Colors, StyleConstants, Styles } from '../style';
import { useLogin } from '../hooks/api';
import { AuthContext } from '../context';

export default function ViewDiet({navigation}) {
    //const context = useContext(AuthContext);

    const [currentDiet, setDiets] = useState([
        { title: 'Vegetarian', key: '1' },
        { title: 'Vegan', key: '2' },
        { title: 'Lactose Intolerant', key: '3' },
        { title: 'Gluten Free', key: '4' },
        { title: 'Peanut Free', key: '5' },
    ]);
    
    function addRestriction() {
        navigation.navigate('SelectRestriction');
    }

    return (
         <View style={[Styles.container, /*{justifyContent: 'top', paddingTop:40}*/]}>
            <View style={{width: StyleConstants.FormWidth}}>
                <Text style={{fontSize: 32, color: Colors.Foreground, alignSelf: 'center', paddingBottom: 30}}>Dietary Restrictions</Text>
                <FlatList
                    data={currentDiet}
                    renderItem={({ item }) => (
                        <Text
                        style={[Styles.buttonText, {paddingLeft: 32, paddingBottom: 20}]}>
                        {item.title}
                        </Text>
                    )}
                />
                <TouchableOpacity
                    style={Styles.button}
                    onPress={addRestriction}
                    >
                    <Text>Add a Dietary Restriction</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}