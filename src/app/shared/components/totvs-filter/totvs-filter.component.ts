import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TotvsChangeBranchComponent } from '../totvs-change-branch/totvs-change-branch.component';

@Component({
  selector: 'app-totvs-filter',
  templateUrl: './totvs-filter.component.html',
  styleUrls: ['./totvs-filter.component.scss'],
})
export class TotvsFilterComponent implements OnInit {
  public branchs: string[] = [];

  constructor(private modalFilter: ModalController) {}

  ngOnInit() {}

  async openChangeBranch() {
    const openModal = await this.modalFilter.create({
      component: TotvsChangeBranchComponent,
      componentProps: {},
      showBackdrop: true,
    });

    openModal.present();
    const { data, role } = await openModal.onDidDismiss();
    this.branchs = data;
  }

  public selectItemsFilter() {
    return this.modalFilter.dismiss(this.branchs, 'confirm');
  }
}
