import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import { Card } from './common';

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#ddd',
  },
  touchableCard: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    height: 150,
    width: 375,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buildingName: {
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const BuildingList = ({ building, onPress }) => (
  <Card>
    <TouchableOpacity style={styles.touchableCard} onPress={onPress}>
      <ImageBackground source={{ uri: building.image }} style={styles.image}>
        <Text style={styles.buildingName}>{building.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  </Card>
);

export default BuildingList;
