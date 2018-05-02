import React, { Component } from 'react';
import { FlatList } from 'react-native';
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

@inject('BuildingStore')
@observer
class BuildingScreen extends Component {
 
  renderItem = ({ item, index }) => {
    return (
      <Card>
    <TouchableOpacity 
      style={styles.touchableCard} 
      onPress={() => {
        BuildingStore.selectBuilding(item.title);
        this.props.navigation.navigate('Room');
      }}>
      <ImageBackground source={{ uri: item.image }} style={styles.image}>
        <Text style={styles.buildingName}>{item.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
      </Card>
    );
  }

  render() {
    const data = BuildingStore.buildings.slice() // don't forget copy the list from store

    return (
      <FlatList
        data={data}
        extraData={data}
        keyExtractor={(item, index) => `${index}`}
        renderItem={this.renderItem}
      />
    )
  }
}
}

export default BuildingScreen;
