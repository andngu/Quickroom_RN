import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import { observer, inject } from 'mobx-react';
import { Card, CardSection, Button } from '../common';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 2 / 1,
  },
  calendar: {
    height: 300,
  },
  date: {
    fontSize: 40,
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
            {DateStore.selectedDate == null ? (
              <Text style={styles.date}>Selected Date</Text>
            ) : (
              <Text style={styles.date}>
                {moment(DateStore.selectedDate).format('ddd MMMM Do')}
              </Text>
            )}
          </CardSection>
          <CardSection>
            <CalendarList
              style={styles.calendar}
              onDayPress={(date) => {
                DateStore.setDate(date.dateString);
                console.log(DateStore.selectedDate);
              }}
              minDate={Date()}
              pastScrollRange={0}
              futureScrollRange={4}
            />
          </CardSection>

          <CardSection>
            <Button
              onPress={() => {
                this.props.navigation.navigate('TimePickerScreen');
                // this.props.TimeStore.fetchAvailableTimes();
                console.log(DateStore.selectedDate);
              }}
            >
              Confirm
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

export default DatePickerScreen;
