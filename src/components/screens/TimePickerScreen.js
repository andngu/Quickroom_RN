import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
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
          this.props.TimeStore.selectId(item.id);
          this.props.navigation.navigate('DetailsScreen');
          console.log(moment(this.props.DateStore.selectedDate)
              .add(this.props.TimeStore.selectedId, 'hours')
              .utc()
              .format());
          console.log(moment(this.props.DateStore.selectedDate)
              .add(1, 'hours')
              .utc()
              .format());
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
