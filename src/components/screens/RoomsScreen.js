import React, { Component } from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Card, Button } from 'react-native-elements';

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

@inject(['BuildingStore'], ['RoomStore'])
@observer
class RoomsScreen extends Component {
  static navigationOptions = {
    title: 'Rooms',
  };

  roomsToDisplay() {
    const { BuildingStore } = this.props;
    const {
      bizzellRooms, devonRooms, innovationRooms, wagnerRooms,
    } = this.props.RoomStore;

    switch (BuildingStore.selectedBuilding) {
      case BuildingStore.getBizzell().title:
        return bizzellRooms.slice();
      case BuildingStore.getDevon().title:
        return devonRooms.slice();
      case BuildingStore.getInnovation().title:
        return innovationRooms.slice();
      case BuildingStore.getWagner().title:
        return wagnerRooms.slice();
      default:
        break;
    }
  }

  renderItem = ({ item, index }) => (
    <Card title={item.title}>
      <Text style={styles.roomName}>{item.title}</Text>
      <Button
        rounded
        title="RESERVE"
        backgroundColor="#007aff"
        onPress={() => {
          this.props.RoomStore.selectRoom(item.title);
          this.props.navigation.navigate('DatePickerScreen');
          console.log(this.props.RoomStore.selectedRoom);
        }}
      />
    </Card>
  );

  render() {
    const data = this.roomsToDisplay();
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

export default RoomsScreen;
