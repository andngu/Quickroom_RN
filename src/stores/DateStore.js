import { observable, action } from 'mobx';

class DateStore {
  @observable selectedDate = null;

  @action
  setDate(date) {
    this.selectedDate = date;
  }
}

export default new DateStore();
