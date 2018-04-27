import React, { Component } from 'react';
import { 
    Button,
    View,
    Text,
    ScrollView 
} from 'react-native';
import BuildingList from '../BuildingList';

class BuildingScreen extends Component {
    state = { buildings: [
        {
            "title": "Bizzel Library",
            "image": require('../assets/img/BizzelCell.png')
        },
        {
            "title": "Devon Energy Hall",
            "image": require('./assets/img/DevonCell.png')
        },
        {
            "title": "Innovation Hub",
            "image": require('./assets/img/InnovationCell.png')
        },
        {
            "title": "Wagner Hall",
            "image": require('./assets/img/WagnerCell.png')
        }
    ]};

    _renderBuildings() {
        return this.state.buildings.map(building =>
            <BuildingList key={building.title} building={building} />
        );
    }
    render() {
        return (
            <ScrollView>
                {this._renderBuildings()}
            </ScrollView>
        );
    }
}

export default BuildingScreen;