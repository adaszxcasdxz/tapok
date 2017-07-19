import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { UserPage } from '../user/user';
import { HomePage } from '../home/home';
import { GroupPage } from '../group/group';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MapPage;
  tab3Root = GroupPage;
  tab4Root = UserPage;

  constructor() {

  }
}
