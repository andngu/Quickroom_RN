import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Card, Button } from '../common';

@inject(['TimeStore'])
@observer
class TimePickerScreen extends Component {
  renderItem = ({ item, index }) => (
    <Card>
      <Button
        onPress={() => {
          this.props.TimeStore.selectTime(item.time);
          this.props.navigation.navigate('DetailsScreen');
          console.log(this.props.TimeStore.selectedTime);
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
