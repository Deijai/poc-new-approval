import { DataService } from './../shared/services/data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public verifyApi: boolean = false;
  constructor(private dataService: DataService) {
    this.verifyApi = this.dataService.newApprovalApi;
  }

}
