import { Component } from '@angular/core';

import { ChatPage } from '../chat/chat';
import { UserPage } from '../user/user';
import { KuyogPage } from '../kuyog/kuyog';
import { GroupPage } from '../group/group';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = KuyogPage;
  tab2Root = ChatPage;
  tab3Root = GroupPage;
  tab4Root = UserPage;

  constructor() {

  }
}
