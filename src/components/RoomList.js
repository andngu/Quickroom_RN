import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card, Button } from './common';

const styles = StyleSheet.create({
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

const RoomList = ({ room }) => {
  const { title } = room;
  return (
    <Card>
      <Text style={styles.buildingName}>{title}</Text>
      <Button>Reserve</Button>
    </Card>
  );
};

export default RoomList;
