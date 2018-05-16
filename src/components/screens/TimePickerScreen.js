import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { Card, Button } from '../common';

@inject(['TimeStore'], ['DateStore'])
@observer
class TimePickerScreen extends Component {
  static navigationOptions = {
    title: 'Available Times',
  };

  renderItem = ({ item, index }) => (
    <Card>
      <Button
        onPress={() => {
          this.props.TimeStore.selectTime(item.time);
          this.props.DateStore.selectedDate.add(item.id, 'hours');
          this.props.navigation.navigate('DetailsScreen');
          console.log(this.props.TimeStore.selectedTime);
          console.log(this.props.TimeStore.selectedId);
        }}
      >
        {item.time}
      </Button>
    </Card>
  );

  render() {
    const data = this.props.TimeStore.times;
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

export default TimePickerScreen;
