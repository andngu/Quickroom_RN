import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { observer, inject } from 'mobx-react';
import { Card, CardSection, Button } from '../common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

@inject(['DateStore'], ['TimeStore'])
@observer
class DatePickerScreen extends Component {
  render() {
    const { DateStore } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <CalendarStrip
            calendarAnimation={{ type: 'sequence', duration: 30 }}
            daySelectionAnimation={{
              type: 'border',
              duration: 200,
              borderWidth: 1,
              borderHighlightColor: 'white',
            }}
            style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
            calendarHeaderStyle={{ color: 'white' }}
            calendarColor="#841617"
            dateNumberStyle={{ color: 'white' }}
            dateNameStyle={{ color: 'white' }}
            highlightDateNumberStyle={{ color: 'gold' }}
            highlightDateNameStyle={{ color: 'gold' }}
            disabledDateNameStyle={{ color: 'grey' }}
            disabledDateNumberStyle={{ color: 'grey' }}
            iconLeft={require('./img/left-arrow-black.png')}
            iconRight={require('./img/right-arrow-black.png')}
            iconContainer={{ flex: 0.1 }}
            onDateSelected={(date) => {
              DateStore.setDate(date.startOf('day').add(7, 'hours'));
              console.log(DateStore.selectedDate);
            }}
          />
        </View>

        <View style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}>
          <Button
            onPress={() => {
              this.props.navigation.navigate('TimePickerScreen');
              this.props.TimeStore.fetchAvailableTimes();
              console.log(this.props.TimeStore.availableTimes);
            }}
          >
            Go on
          </Button>
        </View>
      </View>
    );
  }
}

export default DatePickerScreen;
