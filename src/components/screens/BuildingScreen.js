import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { observer, inject } from 'mobx-react';
import BuildingList from '../BuildingList';

@inject('BuildingStore')
@observer
class BuildingScreen extends Component {
  render() {
    const { BuildingStore } = this.props;
    return (
      <ScrollView>
        <BuildingList
          building={BuildingStore.getBizzell()}
          onPress={() => {
            this.props.navigation.navigate('Room');
            BuildingStore.setBizzell();
          }}
        />

        <BuildingList
          building={BuildingStore.getDevon()}
          onPress={() => {
            this.props.navigation.navigate('Room');
            BuildingStore.setDevon();
          }}
        />

        <BuildingList
          building={BuildingStore.getInnovation()}
          onPress={() => {
            this.props.navigation.navigate('Room');
            BuildingStore.setInnovation();
          }}
        />

        <BuildingList
          building={BuildingStore.getWagner()}
          onPress={() => {
            this.props.navigation.navigate('Room');
            BuildingStore.setWagner();
          }}
        />
      </ScrollView>
    );
  }
}

export default BuildingScreen;
