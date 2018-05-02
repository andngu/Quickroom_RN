import { observable, action, computed } from 'mobx';
import BuildingStore from './BuildingStore';

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
  @observable selectedRoom = null;

  @observable roomsToDisplay = null;

  @action
  selectRoom(room) {
    this.selectedRoom = room;
  }

  @computed
  roomsToDisplay() {
    switch (BuildingStore.selectedBuilding) {
      case 'Bizzel Library':
        return this.bizzellRooms.slice();
      case 'Devon Energy Hall':
        return this.devonRooms.slice();
      case 'Innovation Hub':
        return this.innovationRooms.slice();
      default:
        break;
    }
  }
}

export default new RoomStore();
