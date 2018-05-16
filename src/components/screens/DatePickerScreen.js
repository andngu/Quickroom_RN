import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import { observer, inject } from 'mobx-react';
import { Card, CardSection, Button } from '../common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

@inject(['DateStore'], ['TimeStore'])
@observer
class DatePickerScreen extends Component {
  static navigationOptions = {
    title: 'Choose a Date',
  };

  render() {
    const { DateStore } = this.props;
    return (
      <View style={styles.container}>
        <Card>
          <CardSection>
            <CalendarList
              horizontal
              pagingEnabled
              calendarWidth={320}
              onDayPress={(date) => {
                DateStore.setDate(moment.utc(date.dateString));
                console.log(date);
              }}
              minDate={Date()}
              pastScrollRange={0}
              futureScrollRange={4}
            />
          </CardSection>
        </Card>

        <Card>
          <CardSection>
            <Button
              onPress={() => {
                this.props.navigation.navigate('TimePickerScreen');
                this.props.TimeStore.fetchAvailableTimes();
                console.log(DateStore.selectedDate);
              }}
            >
              Go on
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

export default DatePickerScreen;
