import { observable, action, autorun } from 'mobx';

class BuildingStore {
  @observable
  buildings = [
    {
      id: 0,
      title: 'Bizzell Library',
      image: 'https://imgur.com/TsCyrYD.png',
    },
    {
      id: 1,
      title: 'Devon Energy Hall',
      image: 'https://imgur.com/jMgTyIU.png',
    },
    {
      id: 2,
      title: 'Innovation Hub',
      image: 'https://imgur.com/zkCt99H.png',
    },
    {
      id: 3,
      title: 'Wagner Hall',
      image: 'https://imgur.com/ZAAbEUh.png',
    },
  ];

  @observable buildingId = null;

  @action
  setBuildingId(buildingId) {
    this.buildingId = buildingId;
  }
  @action
  getBuildings() {
    return this.buildings.slice();
  }

  /* -----------BIZZELL------------ */
  @action
  getBizzell() {
    return this.getBuildings()[0];
  }
  @action
  setBizzell() {
    return this.setBuildingId(0);
  }
  /* ------------------------------ */

  /* ------------DEVON------------- */
  @action
  getDevon() {
    return this.getBuildings()[1];
  }
  @action
  setDevon() {
    return this.setBuildingId(1);
  }
  /* ------------------------------ */

  /* ----------INNOVATION---------- */
  @action
  getInnovation() {
    return this.getBuildings()[2];
  }
  @action
  setInnovation() {
    return this.setBuildingId(2);
  }
  /* ------------------------------ */

  /* ------------WAGNER------------ */
  @action
  getWagner() {
    return this.getBuildings()[3];
  }
  @action
  setWagner() {
    return this.setBuildingId(3);
  }
  /* ------------------------------ */
}

autorun(() => {
  console.log(BuildingStore.buildingId);
});

export default new BuildingStore();
