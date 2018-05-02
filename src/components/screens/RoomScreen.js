import React, { Component } from 'react';
import { FlatList, TouchableOpacity, ImageBackground, Text, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Card, Button } from '../common';

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
  roomName: {
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

@inject(['RoomStore'])
@observer
class BuildingScreen extends Component {
  renderItem = ({ item, index }) => (
    <Card>
      <Text style={styles.roomName}>{item.title}</Text>
      <Button
        onPress={() => {
          this.props.RoomStore.selectRoom(item.title);
          console.log(this.props.RoomStore.selectedRoom);
        }}
      >
        Reserve
      </Button>
    </Card>
  );

  render() {
    const data = this.props.RoomStore.roomsToDisplay();
    return (
      <FlatList
        data={data}
        extraData={data}
        keyExtractor={(item, index) => `${index}`}
        renderItem={this.renderItem}
      />
    );
  }
}

export default BuildingScreen;
