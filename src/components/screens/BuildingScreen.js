import React, { Component } from 'react';
import { 
    Button,
    View,
    Text,
    ScrollView 
} from 'react-native';
import BuildingList from '../BuildingList';
import BizzelCell from '../assets/img/BizzelCell.png';
import DevonCell from '../assets/img/DevonCell.png';
import InnovationCell from '../assets/img/InnovationCell.png';
import WagnerCell from '../assets/img/WagnerCell.png';

class BuildingScreen extends Component {
    state = { buildings: [
        {
            "title": "Bizzell Library",
            "image": "https://imgur.com/TsCyrYD.png"
        },
        {
            "title": "Devon Energy Hall",
            "image": "https://imgur.com/jMgTyIU.png"
        },
        {
            "title": "Innovation Hub",
            "image": "https://imgur.com/zkCt99H.png"
        },
        {
            "title": "Wagner Hall",
            "image": "https://imgur.com/ZAAbEUh.png"
        }
    ]};

    _renderBuildings() {
        return this.state.buildings.map(building =>
            <BuildingList key={building.title} building={building} />,
            console.log(this.state.buildings)
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