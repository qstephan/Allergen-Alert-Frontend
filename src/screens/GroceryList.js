import React, {useEffect, useState} from 'react'
import {SafeAreaView, ScrollView, View, Text, FlatList, Pressable} from 'react-native'
import { StyleConstants, Styles, Colors } from '../style';
import { useDeleteGrocery, useGetFoodByID, useGetGroceryList } from '../hooks/api';
import { ListItem, CheckBox } from 'react-native-elements'

export default function GroceryList({navigation}) {

    const getGroceryList = useGetGroceryList();
    const getFoodByID = useGetFoodByID(); 
    const deleteGrocery = useDeleteGrocery(); 

    const [foodName, setFoodName] = useState();

    useEffect(() => {
        navigation.addListener('focus', () =>  getGroceryList.background());
    }, [navigation]);

    function onDelete(id) {
        deleteGrocery.execute(id)
            .then(() => getGroceryList.background());
    }

    const groceryList = [
        {
            foodId: "Energy Bar",
            purchased: true
        },
        {
            foodId: "Ramen",
            purchased: true
        },
        {
            foodId: "Cheerios",
            purchased: true
        }
    ]

    return (
        <SafeAreaView style={[Styles.container, {flex: 1, alignItems: 'flex-start', justifyContent:'space-evenly'}]}>
                <View style={{paddingTop: 15}}>
                <FlatList
                    data={getGroceryList.response}
                    renderItem={({ item }) => (
                        <ListItem containerStyle={{backgroundColor: Colors.Background, padding: 2}}>
                            <CheckBox
                                containerStyle={{width: '72%', borderRadius: 15}}
                                title= {item.foodId}
                                checked={item.purchased}
                                onIconPress={() => console.log(item.foodId)}
                            />
                            <Pressable 
                                style= {{backgroundColor: Colors.ButtonBackground, padding: 15, borderRadius: 25}}
                                onPress={() => onDelete(item.foodId)}>
                                <Text style={{color: Colors.Accent}}>Delete</Text>
                            </Pressable>
                        </ListItem>
                    )}
                    keyExtractor={item => `${item.foodId}`}
                />
                </View>
        </SafeAreaView>
    )
}