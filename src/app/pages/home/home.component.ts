import { combineLatestAll, forkJoin } from 'rxjs';
import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import {
  ApprovalModel,
} from 'src/app/shared/interfaces/approval.interface';
import { ModalController } from '@ionic/angular';
import { TotvsFilterComponent } from 'src/app/shared/components/totvs-filter/totvs-filter.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public purchaseOrder: ApprovalModel[] = [];
  public purchaseRequest: ApprovalModel[] = [];
  public measurements: ApprovalModel[] = [];
  public selected: boolean = false
  public approval: boolean = false;

  constructor(
    private dataService: DataService,
    private modal: ModalController
  ) {}

  ngOnInit() {
    forkJoin([
      this.dataService.getAllMeasurements(),
      this.dataService.getAllPurchaseOrder(),
      this.dataService.getAllPurchaseRequest(),
    ]).subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.measurements = res[0];
          this.purchaseOrder = res[1];
          this.purchaseRequest = res[2];
        }
      },
      error: (err) => {},
    });
  }

  async openFilter() {
    const openModal = await this.modal.create({
      component: TotvsFilterComponent,
      componentProps: {},
      showBackdrop: true,
    });

    await openModal.present();

    const { data, role } = await openModal.onDidDismiss();
    this.dataService.getAllPurchaseOrderByFilter(data).subscribe({
      next: (result) => {
        this.purchaseOrder[0].documents = [] as any;
        result.forEach((res) => {
          this.purchaseOrder[0].documents.push(res as any);
        });
      },
    });
  }

  onButton(event: any): boolean {
    return this.selected = event;
  }

  approvalDocument() {
    this.approval = true;
  }

  cancelApprovalDocument() {
    this.approval = false;
  }


}
