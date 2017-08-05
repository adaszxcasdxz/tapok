import { Component } from '@angular/core';

import { EventPage } from '../event/event';
import { UserPage } from '../user/user';
import { KuyogPage } from '../kuyog/kuyog';
import { GroupPage } from '../group/group';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = KuyogPage;
  tab2Root = EventPage;
  tab3Root = GroupPage;
  tab4Root = UserPage;

  constructor() {

  }
}
