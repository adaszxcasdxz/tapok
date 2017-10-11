import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { EventPage } from '../event/event';
import { UserPage } from '../user/user';
import { KuyogPage } from '../kuyog/kuyog';
import { GroupPage } from '../group/group';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabPage {

  tab1Root = KuyogPage;
  tab2Root = EventPage;
  tab3Root = GroupPage;
  tab4Root = UserPage;

  constructor() {

  }
}
