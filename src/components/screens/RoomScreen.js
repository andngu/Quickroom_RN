import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import RoomList from '../RoomList';
import roomsList from '../RoomsList.json';

class RoomScreen extends Component {
  state = { rooms: roomsList };

  renderRooms() {
    return this.state.rooms.map(
      room => <RoomList key={room.title} room={room} />,
      console.log(this.state.rooms),
    );
  }
  render() {
    return <ScrollView>{this.renderRooms()}</ScrollView>;
  }
}

export default RoomScreen;
