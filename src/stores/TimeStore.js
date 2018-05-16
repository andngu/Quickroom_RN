import { observable, action, toJS } from 'mobx';
import ApiKeysStore from './ApiKeysStore';
import DateStore from './DateStore';

class TimeStore {
  @observable
  times = [
    {
      time: '7:00 AM',
      id: 7,
    },
    {
      time: '7:30 AM',
      id: 7.5,
    },
    {
      time: '8:00 AM',
      id: 8,
    },
    {
      time: '8:30 AM',
      id: 8.5,
    },
    {
      time: '9:00 AM',
      id: 9,
    },
    {
      time: '9:30 AM',
      id: 9.5,
    },
    {
      time: '10:00 AM',
      is: 10,
    },
    {
      time: '10:30 AM',
      id: 10.5,
    },
    {
      time: '11:00 AM',
      id: 11,
    },
    {
      time: '11:30 AM',
      id: 11.5,
    },
    {
      time: '12:00 PM',
      id: 12,
    },
    {
      time: '12:30 PM',
      id: 12.5,
    },
    {
      time: '1:00 PM',
      id: 13,
    },
    {
      time: '1:30 PM',
      id: 13.5,
    },
    {
      time: '2:00 PM',
      id: 14,
    },
    {
      time: '2:30 PM',
      id: 14.5,
    },
    {
      time: '3:00 PM',
      id: 15,
    },
    {
      time: '3:30 PM',
      id: 15.5,
    },
    {
      time: '4:00 PM',
      id: 16,
    },
    {
      time: '4:30 PM',
      id: 16.5,
    },
    {
      time: '5:00 PM',
      id: 17,
    },
    {
      time: '5:30 PM',
      id: 17.5,
    },
    {
      time: '6:00 PM',
      id: 18,
    },
    {
      time: '6:30 PM',
      id: 18.5,
    },
    {
      time: '7:00 PM',
      id: 19,
    },
    {
      time: '7:30 PM',
      id: 19.5,
    },
    {
      time: '8:00 PM',
      id: 20,
    },
    {
      time: '8:30 PM',
      id: 20.5,
    },
    {
      time: '9:00 PM',
      id: 21,
    },
    {
      time: '9:30 PM',
      id: 21.5,
    },
    {
      time: '10:00 PM',
      id: 22,
    },
    {
      time: '10:30 PM',
      id: 22.5,
    },
    {
      time: '11:00 PM',
      id: 23,
    },
    {
      time: '11:30 PM',
      id: 23.5,
    },
  ];

  @observable availableTimes = [];
  @observable selectedTime = null;
  @observable selectedId = null;

  @action
  selectTime(time) {
    this.selectedTime = time;
  }

  @action
  selectId(id) {
    this.selectedId = id;
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
