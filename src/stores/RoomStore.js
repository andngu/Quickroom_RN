import { observable, action } from 'mobx';

class RoomStore {
  @observable
  bizzellRooms = [
    {
      title: 'BLL1',
    },
    {
      title: 'BLL2',
    },
    {
      title: 'BLL3',
    },
    {
      title: 'BLL4',
    },
  ];

  @observable
  devonRooms = [
    {
      title: 'DEH1',
    },
    {
      title: 'DEH2',
    },
    {
      title: 'DEH3',
    },
    {
      title: 'DEH4',
    },
  ];

  @observable
  innovationRooms = [
    {
      title: 'INH1',
    },
    {
      title: 'INH2',
    },
    {
      title: 'INH3',
    },
    {
      title: 'INH4',
    },
  ];

  @observable
  wagnerRooms = [
    {
      title: 'WAG1',
    },
    {
      title: 'WAG2',
    },
    {
      title: 'WAG3',
    },
    {
      title: 'WAG4',
    },
  ];
  @observable
  selectedRoom = null;

  @action
  selectRoom(room) {
    this.selectedRoom = room;
  }
}

export default new RoomStore();
