import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { Colors, StyleConstants, Styles } from '../style';
import { MaterialIcons } from '@expo/vector-icons';

export default function AlertBox({text, icon, colors}) {
    return (
        <View style={[Styles.alertBoxContainer, { borderColor: colors[8], backgroundColor: colors[2] }]}>
            <MaterialIcons name="error" size={32} color={colors[8]}/>
            <Text style={[Styles.alertBoxText, { color: colors[8] }]}>{text}</Text>
        </View>
    )
}