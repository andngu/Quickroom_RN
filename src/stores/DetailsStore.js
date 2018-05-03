import { observable, action, autorun } from 'mobx';

class DetailsStore {
  @observable eventName = '';
  @observable attendees = null;

  @action
  setEventName(eventName) {
    this.eventName = eventName;
  }

  @action
  setAttendees(attendees) {
    this.attendees = attendees;
  }
}

autorun(() => {
  console.log(DetailsStore.eventName);
});

export default new DetailsStore();
