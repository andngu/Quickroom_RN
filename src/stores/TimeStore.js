import { observable, action, toJS } from 'mobx';
import ApiKeysStore from './ApiKeysStore';
import DateStore from './DateStore';

class TimeStore {
  @observable
  times = [
    {
      time: '7:00 AM',
    },
    {
      time: '7:30 AM',
    },
    {
      time: '8:00 AM',
    },
    {
      time: '8:30 AM',
    },
    {
      time: '9:00 AM',
    },
    {
      time: '9:30 AM',
    },
    {
      time: '10:00 AM',
    },
    {
      time: '10:30 AM',
    },
    {
      time: '11:00 AM',
    },
    {
      time: '11:30 AM',
    },
    {
      time: '12:00 PM',
    },
    {
      time: '12:30 PM',
    },
    {
      time: '1:00 PM',
    },
    {
      time: '1:30 PM',
    },
    {
      time: '2:00 PM',
    },
    {
      time: '2:30 PM',
    },
    {
      time: '3:00 PM',
    },
    {
      time: '3:30 PM',
    },
    {
      time: '4:00 PM',
    },
    {
      time: '4:30 PM',
    },
    {
      time: '5:00 PM',
    },
    {
      time: '5:30 PM',
    },
    {
      time: '6:00 PM',
    },
    {
      time: '6:30 PM',
    },
    {
      time: '7:00 PM',
    },
    {
      time: '7:30 PM',
    },
    {
      time: '8:00 PM',
    },
    {
      time: '8:30 PM',
    },
    {
      time: '9:00 PM',
    },
    {
      time: '9:30 PM',
    },
    {
      time: '10:00 PM',
    },
    {
      time: '10:30 PM',
    },
    {
      time: '11:00 PM',
    },
    {
      time: '11:30 PM',
    },
  ];

  @observable availableTimes = [];
  @observable selectedTime = null;

  @action
  selectTime(time) {
    this.selectedTime = time;
  }

  @action
  fetchAvailableTimes() {
    const accessToken = ApiKeysStore.getToken();
    return fetch('https://graph.microsoft.com/v1.0/me/findMeetingTimes', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        attendees: [
          {
            emailAddress: {
              address: 'testrmc@ou.edu',
              name: 'testRMC',
            },
            type: 'Required',
          },
        ],
        timeConstraint: {
          timeslots: [
            {
              start: {
                dateTime: DateStore.selectedDate.format(),
                timeZone: 'Central Standard Time',
              },
              end: {
                dateTime: DateStore.selectedDate.add(16, 'hours'),
                timeZone: 'Central Standard Time',
              },
            },
          ],
        },
        locationConstraint: {
          isRequired: 'true',
          suggestLocation: 'false',
          locations: [
            {
              displayName: 'testRMC',
              locationEmailAddress: 'testrmc@ou.edu',
            },
          ],
        },
        meetingDuration: 'PT1H',
      }),
    })
      .then(response => response.json())
      .then((responseData) => {
        console.log('inside responsejson');
        console.log('response object:', responseData);
        this.availableTimes = responseData;
        console.log(toJS(this.availableTimes));
      })
      .done();
  }
}

export default new TimeStore();
