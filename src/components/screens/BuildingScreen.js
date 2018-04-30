import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import BuildingList from '../BuildingList';
import buildingsList from '../BuildingsList.json';

class BuildingScreen extends Component {
  state = { buildings: buildingsList };

  renderBuildings() {
    return this.state.buildings.map(
      building => (
        <BuildingList
          key={building.title}
          building={building}
          onReservePress={() => this.props.navigation.navigate('Room')}
        />
      ),
      console.log(this.state.buildings),
    );
  }
  render() {
    return <ScrollView>{this.renderBuildings()}</ScrollView>;
  }
}

export default BuildingScreen;
