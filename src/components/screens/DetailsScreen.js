import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Card, CardSection, Input, Button, Spinner } from '../common';

@inject(['DetailsStore'], ['ApiKeysStore'], ['BuildingStore'], ['RoomStore'])
@observer
class DetailsScreen extends Component {
  createEvent() {
    console.log('inside post api');
    const accessToken = this.props.ApiKeysStore.getToken();
    fetch('https://graph.microsoft.com/v1.0/me/events', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        subject: this.props.DetailsStore.eventName,
        body: {
          contentType: 'HTML',
          content: 'Please work',
        },
        start: {
          dateTime: '2018-05-26T06:11:50.398Z',
          timeZone: 'UTC',
        },
        end: {
          dateTime: '2018-05-26T07:11:50.398Z',
          timeZone: 'UTC',
        },
        location: {
          displayName: this.props.BuildingStore.selectedBuilding,
        },
        attendees: [
          {
            emailAddress: {
              address: 'testRMC@ou.edu',
              name: this.props.RoomStore.selectedRoom,
            },
            type: 'required',
          },
        ],
      }),
    })
      .then(response => response.json())
      .then((responseData) => {
        console.log('inside responsejson');
        console.log('response object:', responseData);
      })
      .done();
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Event:"
            placeholder="Meeting with Bob Stoops"
            onChangeText={text => this.props.DetailsStore.setEventName(text)}
            value={this.props.DetailsStore.eventName}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Attendees"
            placeholder="dbo@ou.edu, an@ou.edu"
            onChangeText={text => this.props.DetailsStore.setAttendees(text)}
            value={this.props.DetailsStore.attendees}
          />
        </CardSection>

        <CardSection>
          <Button onPress={() => this.createEvent()} />
        </CardSection>
      </Card>
    );
  }
}

export default DetailsScreen;
