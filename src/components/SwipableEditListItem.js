
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput, Animated } from 'react-native'; 
import { Colors, StyleConstants, Styles } from '../style';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SwipableEditListItem({children, onPress, deleteOnPress, editOnPress, style}) {
    var buttonSize = StyleConstants.FormItemHeight * 0.8

    function renderRightActions(progress, dragX) {
        const deleteProgress = progress.interpolate({
            inputRange: [0, 0.5],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });

        const editProgress = progress.interpolate({
            inputRange: [0.5, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });

        return (
            <View style={{flexDirection: 'row', left: 15}}>
                <AnimatedPressable
                    onPress={editOnPress}
                    style={{ 
                        height: buttonSize,
                        width: buttonSize,
                        backgroundColor: Colors.Blue[7],
                        borderRadius: buttonSize/ 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginRight: 4,
                        opacity: editProgress,
                        transform: [
                            { scale: editProgress },
                        ]
                    }}>
                    
                    <MaterialIcons name="edit" size={22} color="white" />

                </AnimatedPressable>

                <AnimatedPressable
                    onPress={deleteOnPress}
                    style={{ 
                        height: buttonSize,
                        width: buttonSize,
                        backgroundColor: Colors.Red[7],
                        borderRadius: buttonSize/ 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        opacity: deleteProgress,
                        transform: [
                            { scale: deleteProgress },
                        ]
                    }}>
                    
                    <MaterialIcons name="delete" size={22} color="white" />

                </AnimatedPressable>
            </View>
        )
    }

    return (
        <Swipeable friction={2} leftThreshold={30} renderRightActions={renderRightActions}>
            <Pressable onPress={onPress} style={[Styles.listItem, {marginBottom: 0}, style]}>
                {children}
            </Pressable>
        </Swipeable>
    );
}