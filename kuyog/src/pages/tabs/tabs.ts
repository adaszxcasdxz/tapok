import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { UserPage } from '../user/user';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MapPage;
  tab3Root = UserPage;

  constructor() {

  }
}
