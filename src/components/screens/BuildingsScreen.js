import React, { Component } from 'react';
import { FlatList, TouchableOpacity, ImageBackground, Text, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Card } from '../common';

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

@inject(['BuildingStore'])
@observer
class BuildingsScreen extends Component {
  renderItem = ({ item, index }) => (
    <Card>
      <TouchableOpacity
        style={styles.touchableCard}
        onPress={() => {
          this.props.BuildingStore.selectBuilding(item.title);
          this.props.navigation.navigate('RoomsScreen');
          console.log(this.props.BuildingStore.selectedBuilding);
        }}
      >
        <ImageBackground source={{ uri: item.image }} style={styles.image}>
          <Text style={styles.buildingName}>{item.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </Card>
  );

  render() {
    const data = this.props.BuildingStore.buildings.slice();

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

export default BuildingsScreen;
