import { observable, action } from 'mobx';
import moment from 'moment';

class DateStore {
  @observable selectedDate = moment();

  @action
  setDate(date) {
    this.selectedDate = date;
  }
}

export default new DateStore();
