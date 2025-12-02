import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SoilMap = ({ legendData }) => {
    return (
        <View style={styles.legendContainer}>
            {legendData.map((item, index) => (
                <View key={index} style={styles.legendItemPill}>
                    <View style={[styles.colorSquare, { backgroundColor: item.color }]} />
                    <Text style={styles.legendText}>{item.name}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    legendContainer: {
        position: 'absolute',
        top: 20,
        left: 15,
        zIndex: 10,
        padding: 0,
        borderRadius: 0,
    },
    legendItemPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        paddingVertical: 4,     
        paddingHorizontal: 8,  
        borderRadius: 6,       
        marginBottom: 6,        
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 1,
        elevation: 2,
    },
    colorSquare: {
        width: 14,
        height: 14,
        marginRight: 6,
    },
    legendText: {
        fontSize: 15,
        color: '#333',
    },
});

export default SoilMap;